<template>
  <div class="movie-picture-page">
    <i class="close-edit far fa-times-circle" @click="closeInfo"></i>
    <div class="container">
      <div class="film-name">
        <label for="film-name">{{ $t("filmName") }}</label>
        <input
          v-model="movie.filmName"
          type="text"
          id="film-name"
          :placeholder="$t('filmName')"
        />
      </div>
      <div class="description">
        <label for="film-description">{{ $t("description") }}</label>
        <textarea
          v-model="movie.description"
          type="text"
          id="film-description"
          :placeholder="$t('description')"
        ></textarea>
      </div>
      <div class="main-picture">
        <p>{{ $t("mainImage") }}</p>
        <img :src="movie.imageUrl" alt="picture" />
        <input
          type="file"
          style="display: none"
          ref="fileInput"
          @change="onFileSelected"
        />
        <button @click="onPickFile" class="btn btn-primary">{{ $t("add") }}</button>
        <button @click="removeImage" class="btn btn-danger">{{ $t("delete") }}</button>
      </div>
      <div class="picture-gallery">
        <p>{{ $t("imageGallery") }}</p>
        <div class="images">
          <div
            class="gallery-image"
            v-for="(image, index) in movie.imageGallery"
            :key="index"
          >
            <i
              class="fas fa-trash-alt"
              @click="removeGalleryImage(index)"
              v-if="movie.imageGallery[index].imageUrl"
            ></i>
            <input
              :index="index"
              v-if="!movie.imageGallery[index].imageUrl"
              type="file"
              @change="onGalleryImageSelected(index)"
              ref="galleryImageFile"
            />
            <img
              v-if="movie.imageGallery[index].imageUrl"
              :src="movie.imageGallery[index].imageUrl"
            />
          </div>
        </div>

        <button @click="addImage" class="btn btn-primary">{{ $t("add") }}</button>
      </div>
      <div class="trailer">
        <label for="trailer">{{ $t("trailerLink") }}</label>
        <input
          v-model="movie.trailerLink"
          type="text"
          id="trailer"
         :placeholder="$t('mainImage') + ' в youtube'"
        />
      </div>
      <div class="film-types">
        <p>{{ $t("filmTypes") }}</p>
        <div class="checkbox">
          <label for="2d">2D</label>
          <input
            v-model="movie.filmType.twoD"
            type="checkbox"
            name="2D"
            id="2d"
          />
        </div>
        <div class="checkbox">
          <label for="3d">3D</label>
          <input
            v-model="movie.filmType.threeD"
            type="checkbox"
            name="3D"
            id="3d"
          />
        </div>
        <div class="checkbox">
          <label for="imax">IMAX</label>
          <input
            v-model="movie.filmType.imax"
            type="checkbox"
            name="IMAX"
            id="imax"
          />
        </div>
      </div>
      <div class="film-types">
        <p>{{ $t("soonShawn") }}</p>
        <div class="checkbox">
          <input
            v-model="movie.soonShawn"
            type="checkbox"
            name="soon"
            id="soon"
          />
        </div>
      </div>
      <div class="seo">
        <p>SEO блок:</p>
        <form>
          <label for="url">URL: </label>
          <input
            v-model="movie.seo.url"
            type="text"
            id="url"
            placeholder="URL"
          />
          <label for="title">{{ $t("title") }}: </label>
          <input
            v-model="movie.seo.title"
            type="text"
            id="title"
            :placeholder="$t('title')"
          />
          <label for="keywords">{{ $t("keywords") }}: </label>
          <input
            v-model="movie.seo.keywords"
            type="text"
            id="keywords"
            :placeholder="$t('keywords')"
          />
          <label for="description">{{ $t("description") }}: </label>
          <textarea
            v-model="movie.seo.description"
            type="text"
            id="description"
            :placeholder="$t('description')"
          ></textarea>
        </form>
      </div>
      <div class="buttons">
        <button @click="updatePage" class="btn btn-primary">{{ $t("update") }}</button>
        <button @click="clearPage" class="btn btn-danger">
          {{ $t("backToBaseVersion") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditMoviePage",
  props: ["movie"],
  mounted() {
    console.log(this.movie);
  },
  methods: {
    addImage() {
      this.movie.imageGallery.push({
        imageUrl: "",
      });
    },
    languageActive() {},
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      const files = event.target.files;
      this.movie.picture.selectedFile = files[0].name;
      if (this.movie.picture.selectedFile.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.movie.picture.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.movie.picture.image = files[0];
    },
    onGalleryImageSelected(index) {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.movie.imageGallery[index].imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(this.$refs.galleryImageFile[0].files[0]);
    },
    removeGalleryImage(index) {
      this.movie.imageGallery.splice(index, 1);
    },
    removeImage() {
      this.movie.picture.imageUrl = "";
    },
    updatePage() {
      this.$store.dispatch("updateMovie", this.movie);
      this.$store.dispatch('loadMovies')
    },
    closeInfo() {
      this.$emit("changeEditStatus", false);
    },
    clearPage() {
      console.log(this.movie);
      this.movie = {
        filmName: "",
        description: "",
        trailerLink: "",
        filmType: {
          twoD: false,
          threeD: false,
          imax: false,
        },
        picture: {
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
      };
    },
  },
};
</script>

<style scoped>
.movie-picture-page {
  position: fixed;
  z-index: 9999;
  background: rgb(77, 77, 77, 87%);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  overflow: auto;
  padding: 60px;
}
.language {
  display: flex;
  justify-content: flex-end;
  margin-right: 36px;
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
  background: white;
  padding: 20px;
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
.trailer {
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0 0 0 / 50%);
}
.trailer input {
  width: 80%;
}
.film-types {
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0 0 0 / 50%);
}
.film-types p {
  margin-right: 30px;
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
.close-edit {
  position: absolute;
    right: 40px;
    font-size: 30px;
    cursor: pointer;
}
.close-edit:hover {
  color: rgb(155, 155, 155);
}
</style>