<template>
  <div class="movie-picture-page">
    <div class="container">
      <div class="film-name">
        <label for="film-name">{{ $t("cinemas.cinemasName") }}</label>
        <input
          v-model="cinemaCard.cinemaName"
          type="text"
          id="cinema-name"
          :placeholder="$t('cinemas.cinemasName')"
        />
      </div>
      <div class="description">
        <label for="film-description">{{ $t("description") }}</label>
        <textarea
          v-model="cinemaCard.cinemaDescription"
          type="text"
          id="cinema-description"
          :placeholder="$t('description')"
        ></textarea>
      </div>
      <div class="description">
        <label for="film-description">{{ $t("cinemas.conditions") }}</label>
        <textarea
          v-model="cinemaCard.cinemaConditions"
          type="text"
          id="cinema-conditions"
          :placeholder="$t('cinemas.conditions')"
        ></textarea>
      </div>
      <div class="main-picture">
        <p>{{ $t("cinemas.logo") }}</p>
        <img class="cinema-logo" :src="cinemaCard.logo.imageUrl" alt="logo" />
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
          :src="cinemaCard.bannerPhoto.imageUrl"
          alt="banner picture"
        />
        <input
          type="file"
          style="display: none"
          ref="bannerFileInput"
          @change="onBannerSelected"
        />
        <button @click="onPickBannerFile" class="btn btn-primary">
          {{ $t("add") }}
        </button>
        <button @click="removeBannerImage" class="btn btn-danger">
          {{ $t("delete") }}
        </button>
      </div>
      <div class="picture-gallery">
        <p>{{ $t("imageGallery") }}</p>
        <div class="images">
          <div
            class="gallery-image"
            v-for="(image, index) in cinemaCard.cinemasGallery"
            :key="index"
          >
            <i
              class="fas fa-trash-alt"
              @click="removeGalleryImage(index)"
              v-if="cinemaCard.cinemasGallery[index].imageUrl"
            ></i>
            <input
              :index="index"
              v-if="!cinemaCard.cinemasGallery[index].imageUrl"
              type="file"
              @change="onGalleryImageSelected(index)"
              ref="galleryImageFile"
            />
            <img
              v-if="cinemaCard.cinemasGallery[index].imageUrl"
              :src="cinemaCard.cinemasGallery[index].imageUrl"
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
          v-if="isHallEditing"
          class="cinemaHall"
          :editingHall="editingHall"
          @cancelCreatingHall="cancelCreatingHall"
          @savedHall="saveHall"
          @updateHall="updateHall"
        />
        <table>
          <tr>
            <td>{{ $t("cinemas.table.name") }}</td>
            <td>{{ $t("cinemas.table.date") }}</td>
          </tr>
          <tr v-for="(hall, index) in cinemaCard.cinemaHalls" :key="index">
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
            v-model="cinemaCard.seo.url"
            type="text"
            id="url"
            placeholder="URL"
          />
          <label for="title">{{ $t("title") }}: </label>
          <input
            v-model="cinemaCard.seo.title"
            type="text"
            id="title"
            :placeholder="$t('title')"
          />
          <label for="keywords">{{ $t("keywords") }}: </label>
          <input
            v-model="cinemaCard.seo.keywords"
            type="text"
            id="keywords"
            :placeholder="$t('keywords')"
          />
          <label for="description">{{ $t("description") }}: </label>
          <textarea
            v-model="cinemaCard.seo.description"
            type="text"
            id="description"
            :placeholder="$t('description')"
          ></textarea>
        </form>
      </div>
      <div class="buttons">
        <button @click="savePage" class="btn btn-primary">
          {{ $t("save") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CinemaHall from "./CinemaHall";
import EditCinemaHall from "./EditCinemaHall";

export default {
  name: "CinemaCard",
  components: {
    CinemaHall,
    EditCinemaHall
  },
  data() {
    return {
      cinemaCard: {
        cinemasGallery: [],
        cinemaName: "",
        description: "",
        conditions: "",
        logo: {
          selectedFile: null,
          imageUrl: "",
          image: null,
        },
        bannerPhoto: {
          selectedFile: null,
          imageUrl: "",
          image: null,
        },
        seo: {
          url: "",
          title: "",
          keywords: "",
          description: "",
        },
        cinemaHalls: [],
      },
      cinemaHallAdding: false,
      editingHall: null,
      isHallEditing: false,
    };
  },
  mounted() {},
  methods: {
    saveHall(cinemaHall) {
      this.cinemaCard.cinemaHalls.push(cinemaHall);
      this.cinemaHallAdding = false;
    },
    updateHall(cinemaHall) {
      this.cinemaCard.cinemaHalls.filter(el => {
        el == cinemaHall
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
      this.cinemaCard.logo.selectedFile = files[0].name;
      if (this.cinemaCard.logo.selectedFile.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.cinemaCard.logo.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.cinemaCard.logo.image = files[0];
    },
    removeLogoImage() {
      this.cinemaCard.logo.imageUrl = "";
    },
    onPickBannerFile() {
      this.$refs.bannerFileInput.click();
    },
    onBannerSelected(event) {
      const files = event.target.files;
      this.cinemaCard.bannerPhoto.selectedFile = files[0].name;
      if (this.cinemaCard.bannerPhoto.selectedFile.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.cinemaCard.bannerPhoto.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.cinemaCard.bannerPhoto.image = files[0];
    },
    addImage() {
      this.cinemaCard.cinemasGallery.push({
        imageUrl: "",
      });
    },
    onGalleryImageSelected(index) {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.cinemaCard.cinemasGallery[index].imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(this.$refs.galleryImageFile[0].files[0]);
    },
    removeGalleryImage(index) {
      this.cinemaCard.cinemasGallery.splice(index, 1);
    },
    removeBannerImage() {
      this.cinemaCard.bannerPhoto.imageUrl = "";
    },
    addCinemaInfo(index) {
      this.hallId = index
      this.cinemaHallAdding = true;
    },
    
    editHallInfo(hall) {
      this.isHallEditing = true;
      this.editingHall = hall;
    },
    deleteHallInfo(index) {
      this.cinemaCard.cinemaHalls.splice(index, 1);
    },
    savePage() {
      this.$store.dispatch("addCinema", this.cinemaCard);
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
.movie-picture-page {
  min-height: 709.021px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.language {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}
.language button {
  cursor: pointer;
  background: darkgray;
  padding: 20px 10px 0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border: none;
}
.language button:hover {
  background: rgb(136, 136, 136);
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
  justify-content: center;
  margin: 20px;
}
.buttons :nth-child(1) {
  margin-right: 20px;
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
</style>