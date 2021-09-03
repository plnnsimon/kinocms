<template>
  <div class="editing-cinema-page">
    <div class="container">
      <div class="film-name">
        <label for="film-name">{{ $t("cinemas.cinemasName") }}</label>
        <input
        v-if="lang == 'ru'"
          v-model="cinema.ruCinemaName"
          type="text"
          id="cinema-name"
          :placeholder="$t('cinemas.cinemasName')"
        />
        <input
        v-else
          v-model="cinema.uaCinemaName"
          type="text"
          id="cinema-name"
          :placeholder="$t('cinemas.cinemasName')"
        />
      </div>
      <div class="description">
        <label for="film-description">{{ $t("description") }}</label>
        <textarea
        v-if="lang == 'ru'"
          v-model="cinema.ruDescription"
          type="text"
          id="cinema-description"
          :placeholder="$t('description')"
        ></textarea>
        <textarea
        v-else
          v-model="cinema.uaDescription"
          type="text"
          id="cinema-description"
          :placeholder="$t('description')"
        ></textarea>
      </div>
      <div class="description">
        <label for="film-description">{{ $t("cinemas.conditions") }}</label>
        <textarea
        v-if="lang == 'ru'"
          v-model="cinema.ruConditions"
          type="text"
          id="cinema-conditions"
          :placeholder="$t('cinemas.conditions')"
        ></textarea>
        <textarea
        v-else
          v-model="cinema.uaConditions"
          type="text"
          id="cinema-conditions"
          :placeholder="$t('cinemas.conditions')"
        ></textarea>
      </div>
      <div class="main-picture">
        <p>{{ $t("cinemas.logo") }}</p>
        <img class="cinema-logo" :src="cinema.logo.imageUrl" alt="logo" />
        <input
          type="file"
          style="display: none"
          ref="logoFileInput"
          @change="onLogoSelected"
        />
        <button @click="onPickLogoFile" class="btn btn-primary">
          {{ $t("add") }}
        </button>
        <button @click="removeLogoImage" class="btn btn-danger">
          {{ $t("delete") }}
        </button>
      </div>
      <div class="main-picture">
        <p>{{ $t("cinemas.mainBannerImage") }}</p>
        <img
          class="cinema-banner"
          :src="cinema.bannerPhoto.imageUrl"
          alt="banner picture"
        />
        <input
          type="file"
          style="display: none"
          ref="bannerFileInput"
          @change="onBannerSelected"
        />
        <div class="buttons">
          <button @click="onPickBannerFile" class="btn btn-primary">
          {{ $t("add") }}
        </button>
        <button @click="removeBannerImage" class="btn btn-danger">
          {{ $t("delete") }}
        </button>
        </div>
        
      </div>
      <div class="picture-gallery">
        <p>{{ $t("imageGallery") }}</p>
        <div class="images">
          <div
            class="gallery-image"
            v-for="(image, index) in cinema.cinemasGallery"
            :key="index"
          >
            <i
              class="fas fa-trash-alt"
              @click="removeGalleryImage(index)"
              v-if="cinema.cinemasGallery[index].imageUrl"
            ></i>
            <input
              :index="index"
              v-if="!cinema.cinemasGallery[index].imageUrl"
              type="file"
              @change="onGalleryImageSelected(index)"
              ref="galleryImageFile"
            />
            <img
              v-if="cinema.cinemasGallery[index].imageUrl"
              :src="cinema.cinemasGallery[index].imageUrl"
            />
          </div>
        </div>
        <button @click="addImage" class="btn btn-primary">
          {{ $t("add") }}
        </button>
      </div>
      <div class="table">
        <CinemaHall
          v-if="cinemaHallAdding"
          class="cinemaHall"
          @cancelCreatingHall="cancelCreatingHall"
          @savedHall="saveHall"
        />
        <EditCinemaHall
          @cancelCreatingHall="cancelCreatingHall"
          @savedHall="saveHall"
          @updateHall="updateHall"
          v-if="isHallEditing"
          class="cinemaHall"
          :editingHall="editingHall"
        />
        <table>
          <tr>
            <td>{{ $t("cinemas.table.name") }}</td>
            <td>{{ $t("cinemas.table.date") }}</td>
          </tr>
          <tr v-for="(hall, index) in cinema.cinemaHalls" :key="index">
            <td>{{ hall.hallName }}</td>
            <td>{{ hall.creationDate }}</td>
            <i @click="editHallInfo(hall)" class="fas fa-pen"></i>
            <i
              @click="deleteHallInfo(index)"
              class="fas fa-trash-alt"
              style="right: -60px"
            ></i>
          </tr>
        </table>
        <button @click="addCinemaInfo" class="btn btn-primary">
          <i class="fas fa-plus"></i>{{ $t("cinemas.addHall") }}
        </button>
      </div>
      <div class="seo">
        <p>SEO блок:</p>
        <form>
          <label for="url">URL: </label>
          <input
            v-model="cinema.seo.url"
            type="text"
            id="url"
            placeholder="URL"
          />
          <label for="title">{{ $t("title") }}: </label>
          <input
            v-model="cinema.seo.title"
            type="text"
            id="title"
            :placeholder="$t('title')"
          />
          <label for="keywords">{{ $t("keywords") }}: </label>
          <input
            v-model="cinema.seo.keywords"
            type="text"
            id="keywords"
            :placeholder="$t('keywords')"
          />
          <label for="description">{{ $t("description") }}: </label>
          <textarea
            v-model="cinema.seo.description"
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
        <button @click="cancelEditing" class="w-25 btn btn-primary">
          {{ $t("cancel") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CinemaHall from "./CinemaHall";
import EditCinemaHall from "./EditCinemaHall";

export default {
  name: "EditCinemaPage",
  components: {
    CinemaHall,
    EditCinemaHall,
  },
  props: ["cinema"],
  data() {
    return {
      cinemaHallAdding: false,
      editingHall: null,
      isHallEditing: false,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  methods: {
    cancelEditing() {
      this.$emit('cancelEditingCinema', false)
    },
    saveHall(cinemaHall) {
      this.cinema.cinemaHalls.push(cinemaHall);
      this.cinemaHallAdding = false;
    },
    updateHall(cinemaHall) {
      this.cinema.cinemaHalls.filter((el) => {
        el == cinemaHall;
      });
      this.isHallEditing = false;
    },
    cancelCreatingHall(data) {
      this.cinemaHallAdding = data;
      this.isHallEditing = data
    },
    onPickLogoFile() {
      this.$refs.logoFileInput.click();
    },
    onLogoSelected(event) {
      const files = event.target.files;
      this.cinema.logo.selectedFile = files[0].name;
      if (this.cinema.logo.selectedFile.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.cinema.logo.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.cinema.logo.image = files[0];
    },
    removeLogoImage() {
      this.cinema.logo.imageUrl = "";
    },
    onPickBannerFile() {
      this.$refs.bannerFileInput.click();
    },
    onBannerSelected(event) {
      const files = event.target.files;
      this.cinema.bannerPhoto.selectedFile = files[0].name;
      if (this.cinema.bannerPhoto.selectedFile.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.cinema.bannerPhoto.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.cinema.bannerPhoto.image = files[0];
    },
    addImage() {
      this.cinema.cinemasGallery.push({
        imageUrl: "",
      });
    },
    onGalleryImageSelected(index) {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.cinema.cinemasGallery[index].imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(this.$refs.galleryImageFile[0].files[0]);
    },
    removeGalleryImage(index) {
      this.cinema.cinemasGallery.splice(index, 1);
    },
    removeBannerImage() {
      this.cinema.bannerPhoto.imageUrl = "";
    },
    addCinemaInfo() {
      this.cinemaHallAdding = true;
    },
    editHallInfo(hall) {
      this.isHallEditing = true;
      this.editingHall = hall;
    },
    deleteHallInfo(index) {
      this.cinema.cinemaHalls.splice(index, 1);
    },
    updateCinema() {
      this.$store.dispatch("updateCinema", this.cinema);
      this.$store.dispatch('loadCinemas')
      this.$emit("updatedCinemaPage", false)
    },
  },
};
</script>

<style scoped>
.cinemaHall {
  background: white;
  z-index: 1;
  top: 0;
  position: absolute !important;
  width: 100%;
  height: 100%;
}
.editing-cinema-page {
  min-height: 709.021px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 9;
  background: white;
  top: 0;
  width: 100%;
  left: 0;
}
.container {
  display: flex;
  flex-direction: column;
}
label {
  margin-right: 15px;
}
.film-name {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.film-name input {
  width: 300px;
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
.main-picture {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.main-picture button {
  height: 40px;
}
.picture-gallery {
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.picture-gallery button {
  height: 40px;
  width: 100px;
}
.images {
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 30px;
}
.gallery-image {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 200px;
}
.gallery-image i {
  align-self: flex-end;
  margin: 5px;
  font-size: 25px;
  cursor: pointer;
}
.gallery-image i:hover {
  color: rgb(92, 92, 92);
}
.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  flex-direction: column;
}
.buttons button {
  margin-bottom: 20px;
}
.bottom-buttons {
  display: flex;
  justify-content: center;
}
.cinema-logo {
  width: 200px;
}
.table {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.table td {
  border-width: 2px;
}
table {
  width: 400px;
  position: relative;
}
table i {
  position: absolute;
  cursor: pointer;
}
table i:hover {
  color: rgb(117, 117, 117);
}
.cinema-banner {
  max-width: 500px;
}
</style>