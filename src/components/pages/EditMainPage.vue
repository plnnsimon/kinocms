<template>
  <div class="news-page">
    <div class="switcher">
      <p>Статус:</p>
      <label class="switch">
        <input v-model="pageItem.checked" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <div class="container">
      <div class="news-top-section">
        <div class="phone-number">
          <label for="film-name">Телефон</label>
          <input
            v-model="pageItem.phone1"
            type="text"
            placeholder="777 85 98"
          />
          <input
            v-model="pageItem.phone2"
            type="text"
            placeholder="777 85 98"
          />
        </div>
      </div>

      <div class="description">
        <label for="film-description">SEO текст:</label>
        <textarea
        v-if="lang == 'ru'"
          v-model="pageItem.ruSeoText"
          type="text"
          id="film-description"
          placeholder="текст"
        ></textarea>
        <textarea
        v-else
          v-model="pageItem.uaSeoText"
          type="text"
          id="film-description"
          placeholder="текст"
        ></textarea>
      </div>
      <div class="seo">
        <p>SEO блок:</p>
        <form>
          <label for="url">URL: </label>
          <input
            v-model="pageItem.seo.url"
            type="text"
            id="url"
            placeholder="URL"
          />
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
      <div class="bottom-buttons">
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
import firebase from 'firebase'
export default {
  name: "MainPage",
  props: ['pageItem'],
  data() {
    return {
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  methods: {
    savePage() {
      this.$store.dispatch("addPage", this.pageItem);
    },
    cancelUpdate() {
      this.$emit("cancelUpdate", false);
    },
    async updateCinema() {
      try {
        await firebase.database().ref('pages').child(this.pageItem.id).update(this.pageItem)
        .then(() => {
          alert('updated')
        })
      } catch(err) {
        console.log(err);
      }
      this.$emit("updatedPage", false)
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
.active {
  background: rgb(255, 255, 255);
}

.container {
  display: flex;
  flex-direction: column;
}
label {
  margin-right: 15px;
}
.phone-number {
  margin-bottom: 20px;
}
.phone-number input {
  margin-right: 10px;
}
.description {
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.description textarea {
  width: 100%;
  min-height: 200px;
}
.checkbox {
  margin-right: 10px;
  width: 80px;
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