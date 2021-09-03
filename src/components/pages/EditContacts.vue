<template>
  <div class="news-page">
    <div class="switcher">
      <p>Статус:</p>
      <label class="switch">
        <input v-model="pageItem.checked" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <div v-for="(cinema, index) of pageItem.cinemas" :key="index" class="cinemas">
      <div class="cinema">
        <div class="top">
          <label for="name">Название кинотеатра</label>
           <input
          v-if="lang == 'ru'"
            v-model="cinema.ruName"
            id="name"
            type="text"
            placeholder="Название кинотеатра"
          />
          <input
          v-else
            v-model="cinema.uaName"
            id="name"
            type="text"
            placeholder="Название кинотеатра"
          />
        </div>
        <div class="address">
          <label for="address">Адресс</label>
           <textarea
          v-if="lang == 'ru'"
            v-model="cinema.ruAddress"
            id="address"
            type="text"
            placeholder="Магазин 'Декор' 4,5 (38) · Магазин вулиця Калініна, 63"
          ></textarea>
          <textarea
          v-else
            v-model="cinema.uaAddress"
            id="address"
            type="text"
            placeholder="Магазин 'Декор' 4,5 (38) · Магазин вулиця Калініна, 63"
          ></textarea>
        </div>
        <div class="top">
          <label for="coords">Координаты для катры</label>
          <input
            v-model="cinema.coords"
            id="coords"
            type="text"
            placeholder="Координаты для катры"
          />
        </div>
        <div class="main-picture">
          <p>{{ $t("cinemas.logo") }}</p>
          <img class="cinema-logo" :src="cinema.logo.imageUrl" alt="logo" />
          <input
            type="file"
            style="display: none"
            ref="logoFileInputs"
            @change="onLogoSelected"
          />
          <button @click="onPickLogoFile(index)" class="btn btn-primary">
            {{ $t("add") }}
          </button>
          <button @click="removeLogoImage(cinema)" class="btn btn-danger">
            {{ $t("delete") }}
          </button>
        </div>
      </div>
    </div>

    <button @click="addCinema" class="w-25 m-md-3 btn btn-primary">
      Добавить еще кинотеатр
    </button>
    <div>
      <div class="seo">
        <p>SEO блок:</p>
        <form>
          <label for="url">URL: </label>
          <input v-model="pageItem.seo.url" type="text" id="url" placeholder="URL" />
          <label for="title">{{ $t("title") }}: </label>
          <input
            v-model="pageItem.seo.title"
            type="text"
            id="title"
            :placeholder="$t('title')"
          />
          <label for="keywords">{{ $t("keywords") }}</label>
          <input
            v-model="pageItem.seo.keywords"
            type="text"
            id="keywords"
            :placeholder="$t('keywords')"
          />
          <label for="description">{{ $t("description") }}: </label>
          <textarea
            v-model="pageItem.seo.description"
            type="text"
            id="description"
            :placeholder="$t('description')"
          ></textarea>
        </form>
      </div>
      <div class="buttons">
        <button @click="updateCinema" class="w-25 mr-3 btn btn-primary">
          {{ $t("update") }}
        </button>
        <button @click="cancelUpdate" class="w-25 btn btn-primary">
          {{ $t("cancel") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "EditContacts",
  props: ['pageItem'],
  computed: {
    lang() {
      return this.$i18n.locale
    },
  },
  methods: {
    onPickLogoFile(index) {
      this.index = index;
      this.$refs.logoFileInputs[index].click();
    },
    onLogoSelected(event) {
      const files = event.target.files;
      this.pageItem.cinemas[this.index].logo.selectedFile = files[0].name;
      if (this.pageItem.cinemas[this.index].logo.selectedFile.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.pageItem.cinemas[this.index].logo.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.pageItem.cinemas[this.index].logo.image = files[0];
    },
    removeLogoImage(cinema) {
      cinema.logo.imageUrl = "";
    },
    async savePage() {
      this.$store.dispatch("addPage", this.pageItem);
    },
    addCinema() {
      this.pageItem.cinemas.push({
        logo: {
          selectedFile: null,
          imageUrl: "",
          image: null,
        },
        name: "",
        address: "",
        coords: "",
      });
    },
    cancelUpdate() {
      this.$emit("cancelUpdate", false);
    },
    async updateCinema() {
      try {
        await firebase
          .database()
          .ref("pages")
          .child(this.pageItem.id)
          .update(this.pageItem)
          .then(() => {
            alert("updated");
          });
      } catch (err) {
        console.log(err);
      }
      this.$emit("updatedPage", false);
    },
  },
};
</script>

<style scoped>
.news-page {
  min-height: 709.021px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.cinema {
  box-shadow: 12px 4px 13px 4px rgb(0 0 0 / 50%);
  padding: 10px;
  margin-bottom: 20px;
}
.cinema-logo {
  max-width: 250px;
}
.cinema input {
  width: 300px;
}
.top {
  margin-bottom: 15px;
}
.address {
  display: flex;
  margin-bottom: 15px;
}
.address textarea {
  width: 80%;
  min-height: 90px;
}
.coords {
  margin-bottom: 15px;
}
.main-picture {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
  padding: 10px;
}
label {
  margin-right: 15px;
}
.main-picture button {
  height: 40px;
}
.seo {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.seo form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
}
.seo p {
  margin-right: 20px;
}
.buttons {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.buttons :nth-child(1) {
  margin-right: 20px;
}
.news-top-section {
  display: flex;
  justify-content: space-between;
}
.date-input {
  justify-content: space-between;
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.date-input p {
  margin-right: 10px;
}
.switcher {
  align-self: flex-end;
  display: flex;
  width: 150px;
  justify-content: space-between;
}
.btn-dark {
  margin: 10px auto;
}

.switcher {
  align-self: flex-end;
  display: flex;
  width: 150px;
  justify-content: space-between;
}
.btn-dark {
  margin: 10px auto;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(158, 158, 158);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: rgb(255, 255, 255);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgb(62, 255, 56);
}

input:focus + .slider {
  box-shadow: 0 0 1px #000000;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.speed {
  position: absolute;
  bottom: 15px;
  left: 20px;
  display: flex;
  max-width: 220px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.speed p {
  margin: 0;
}
</style>