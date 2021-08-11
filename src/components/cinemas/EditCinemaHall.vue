<template>
  <div class="movie-picture-page">
    <div class="container">
      <div class="film-name">
        <label for="film-name">{{ $t("cinemaHall.hallNumber") }}</label>
        <input
          v-model="editingHall.hallName"
          type="text"
          id="cinema-name"
          placeholder="8 зал"
        />
      </div>
      <div class="description">
        <label for="film-description">{{ $t("cinemaHall.hallDescription") }}</label>
        <textarea
          v-model="editingHall.hallDescription"
          type="text"
          id="cinema-description"
          :placeholder='$t("cinemaHall.hallDescription")'
        ></textarea>
      </div>
      
      <div class="main-picture">
        <p>{{ $t("cinemaHall.hallSchema") }}</p>
        <img class="cinema-logo" :src="editingHall.scheme.imageUrl" alt="scheme" />
        <input
          type="file"
          style="display: none"
          ref="schemeFileInput"
          @change="onSchemeSelected"
        />
        <button @click="onPickSchemeFile" class="btn btn-primary">
          {{ $t("add") }}
        </button>
        <button @click="removeSchemeImage" class="btn btn-danger">{{ $t("delete") }}</button>
      </div>
      <div class="main-picture">
        <p>{{ $t("cinemaHall.topBanner") }}</p>
        <img
          class="cinema-banner"
          :src="editingHall.bannerPhoto.imageUrl"
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
            v-for="(image, index) in editingHall.cinemaHallGallery"
            :key="index"
          >
            <i
              class="fas fa-trash-alt"
              @click="removeGalleryImage(index)"
              v-if="editingHall.cinemaHallGallery[index].imageUrl"
            ></i>
            <input
              :index="index"
              v-if="!editingHall.cinemaHallGallery[index].imageUrl"
              type="file"
              @change="onGalleryImageSelected(index)"
              ref="galleryImageFile"
            />
            <img
              v-if="editingHall.cinemaHallGallery[index].imageUrl"
              :src="editingHall.cinemaHallGallery[index].imageUrl"
            />
          </div>
        </div>
        <button @click="addImage" class="btn btn-primary">{{ $t("add") }}</button>
      </div>
      
      <div class="seo">
        <p>SEO блок:</p>
        <form>
          <label for="url">URL: </label>
          <input
            v-model="editingHall.seo.url"
            type="text"
            id="url"
            placeholder="URL"
          />
          <label for="title">{{ $t("add") }}: </label>
          <input
            v-model="editingHall.seo.title"
            type="text"
            id="title"
            :placeholder="$t('title')"
          />
          <label for="keywords">{{ $t("keywords") }}: </label>
          <input
            v-model="editingHall.seo.keywords"
            type="text"
            id="keywords"
            :placeholder="$t('keywords')"
          />
          <label for="description">{{ $t("description") }}: </label>
          <textarea
            v-model="editingHall.seo.description"
            type="text"
            id="description"
            :placeholder="$t('description')"
          ></textarea>
        </form>
      </div>
      <div class="buttons">
        <button @click="updatePage" class="btn btn-primary">{{ $t("update") }}</button>
        <button @click="cancelCreatingHall" class="btn btn-primary">{{ $t("cancel") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CinemaCard",
  props: ['editingHall'],
  data() {
    return {
      cinemaHall: {
        creationDate: new Date().toLocaleDateString(),
        cinemaHallGallery: [],
        hallName: "",
        hallDescription: "",
        scheme: {
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
      },
    };
  },
  mounted() {},
  methods: {
    languageActive() {},
    onPickSchemeFile() {
      this.$refs.schemeFileInput.click();
    },
    onSchemeSelected(event) {
      const files = event.target.files;
      this.cinemaHall.scheme.selectedFile = files[0].name;
      if (this.cinemaHall.scheme.selectedFile.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.cinemaHall.scheme.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.cinemaHall.scheme.image = files[0];
    },
    removeSchemeImage() {
      this.cinemaHall.scheme.imageUrl = "";
    },
    onPickBannerFile() {
      this.$refs.bannerFileInput.click();
    },
    onBannerSelected(event) {
      const files = event.target.files;
      this.cinemaHall.bannerPhoto.selectedFile = files[0].name;
      if (this.cinemaHall.bannerPhoto.selectedFile.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.cinemaHall.bannerPhoto.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.cinemaHall.bannerPhoto.image = files[0];
    },
    addImage() {
      this.cinemaHall.cinemaHallGallery.push({
        imageUrl: "",
      });
    },
    onGalleryImageSelected(index) {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.cinemaHall.cinemaHallGallery[index].imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(this.$refs.galleryImageFile[0].files[0]);
    },
    removeGalleryImage(index) {
      this.cinemaHall.cinemaHallGallery.splice(index, 1);
    },
    removeBannerImage() {
      this.cinemaHall.bannerPhoto.imageUrl = "";
    },
    updatePage() {
      this.$emit('updateHall', this.editingHall)
    },
    cancelCreatingHall() {
      this.$emit('cancelCreatingHall', false)
    }
  },
};
</script>

<style scoped>
.movie-picture-page {
  min-height: 709.021px;
  padding: 20px;
  display: flex;
  flex-direction: column;
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
</style>