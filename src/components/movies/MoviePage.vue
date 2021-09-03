<template>
  <div class="movie-picture-page">
    <div class="container">
      <div class="film-name">
        <label for="film-name">{{ $t("filmName") }}</label>
        <input
          v-if="lang == 'ua'"
          v-model="movie_page.uaFilmName"
          type="text"
          id="film-name"
          :placeholder="$t('filmName')"
        />
        <input
          v-else
          v-model="movie_page.ruFilmName"
          type="text"
          id="film-name"
          :placeholder="$t('filmName')"
        />
      </div>
      <div class="description">
        <label for="film-description">{{ $t("description") }}</label>
        <textarea
          v-if="lang == 'ua'"
          v-model="movie_page.uaDescription"
          type="text"
          id="film-description"
          :placeholder="$t('description')"
        ></textarea>
        <textarea
          v-else
          v-model="movie_page.ruDescription"
          type="text"
          id="film-description"
          :placeholder="$t('description')"
        ></textarea>
      </div>
      <div class="main-picture">
        <p>{{ $t("mainImage") }}</p>
        <img
          v-if="lang == 'ru' && movie_page.picture.ruImageUrl"
          :src="movie_page.picture.ruImageUrl"
          alt="picture"
        />
        <img
          v-if="lang == 'ua' && movie_page.picture.uaImageUrl"
          :src="movie_page.picture.uaImageUrl"
          alt="picture"
        />
        <input
          v-if="lang == 'ru'"
          type="file"
          style="display: none"
          ref="fileInput"
          @change="(event) => onFileSelected(event, movie_page.picture, lang)"
        />
        <input
          v-if="lang == 'ua'"
          type="file"
          style="display: none"
          ref="fileInput"
          @change="(event) => onFileSelected(event, movie_page.picture, lang)"
        />
        <button @click="onPickFile" class="btn btn-primary">
          {{ $t("add") }}
        </button>
        <button
          @click="removeImage(movie_page.picture, lang)"
          class="btn btn-danger"
        >
          {{ $t("delete") }}
        </button>
      </div>
      <div class="picture-gallery">
        <p>{{ $t("imageGallery") }}</p>
        <div class="images">
          <div
            class="gallery-image"
            v-for="(image, index) in movie_page.imageGallery"
            :key="index"
          >
            <i
              class="fas fa-trash-alt"
              @click="removeGalleryImage(index)"
              v-if="movie_page.imageGallery[index].imageUrl"
            ></i>
            <input
              :index="index"
              style="display: none"
              type="file"
              ref="galleryImageFile"
              @change="onGalleryImageSelected(index)"
            />
            <button
              v-if="!movie_page.imageGallery[index].imageUrl"
              @click="onPickImageGalleryFile(index)"
              class="w-100 btn btn-secondary"
            >
              {{ $t("chooseBtn") }}
            </button>
            <img
              v-if="movie_page.imageGallery[index].imageUrl"
              :src="movie_page.imageGallery[index].imageUrl"
            />
          </div>
        </div>

        <button @click="addImage" class="btn btn-primary">
          {{ $t("add") }}
        </button>
      </div>
      <div class="trailer">
        <label for="trailer">{{ $t("trailerLink") }}</label>
        <input
          v-if="lang == 'ru'"
          v-model="movie_page.ruTrailerLink"
          type="text"
          id="trailer"
          :placeholder="$t('mainImage') + ' в youtube'"
        />
        <input
          v-else
          v-model="movie_page.uaTrailerLink"
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
            v-model="movie_page.filmType.twoD"
            type="checkbox"
            name="2D"
            id="2d"
          />
        </div>
        <div class="checkbox">
          <label for="3d">3D</label>
          <input
            v-model="movie_page.filmType.threeD"
            type="checkbox"
            name="3D"
            id="3d"
          />
        </div>
        <div class="checkbox">
          <label for="imax">IMAX</label>
          <input
            v-model="movie_page.filmType.imax"
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
            v-model="movie_page.soonShawn"
            type="checkbox"
            name="soon"
            id="soon"
          />
          <div v-if="movie_page.soonShawn">
            <input v-model="movie_page.releaseDate" type="date" />
          </div>
        </div>
      </div>
      <div class="film__timetable">
        <!-- <input type="date" v-model="date" /> -->
        <input type="time" v-model="time" />
        <select name="" id="" v-model="selectedCinema">
          <option v-for="cinema in cinemas" :key="cinema.cinemaId" :value="cinema.cinemaId" >{{ cinema.ruCinemaName }}</option>
        </select>
        {{ selectedCinema }}
        <select name="" id="" v-model="selectedHall">
          <option v-for="(hall, index) in getCinemaHalls" :key="index" :value="hall.hallName">{{ hall.hallName }}</option>
        </select>
        {{ selectedHall }}
        <div
          v-for="(variation, key) in filmTypes"
          :key="key"
          class="radio__btns"
        >
          <label>
            {{ key }}
            <input
              :value="variation"
              type="checkbox"
              v-model="filmTypes[key]"
              name="filmType"
            />
          </label>
        </div>
        <div>
          {{ filmTypes }}
          {{ movie_page.timetable }}
        </div>
        <button class="btn btn-primary" @click="addTimeTable">
          Add timetable
        </button>
      </div>
      <SeoBlock :item="movie_page" />
      <div class="buttons">
        <button @click="savePage" class="btn btn-primary">
          {{ $t("save") }}
        </button>
        <button @click="clearPage" class="btn btn-danger">
          {{ $t("backToBaseVersion") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SeoBlock from "../SeoBlock.vue";
import OnFileSelected from "../../mixins/onFileSelected";
export default {
  name: "MoviePage",
  mixins: [OnFileSelected],
  components: {
    SeoBlock,
  },
  data() {
    return {
      movie_page: {
        imageGallery: [],
        ruFilmName: "",
        uaFilmName: "",
        uaDescription: "",
        ruDescription: "",
        trailerLink: "",
        timetable: [],
        filmType: {
          twoD: false,
          threeD: false,
          imax: false,
        },
        soonShawn: false,
        releaseDate: "",
        picture: {
          ruSelectedFile: null,
          uaSelectedFile: null,
          ruImageUrl: "",
          uaImageUrl: "",
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
  computed: {
    lang() {
      return this.$i18n.locale
    },
  },
  methods: {
    addImage() {
      this.movie_page.imageGallery.push({
        imageUrl: "",
      });
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onPickImageGalleryFile(index) {
      this.$refs.galleryImageFile[index].click();
    },
    onGalleryImageSelected(index) {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.movie_page.imageGallery[index].imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(this.$refs.galleryImageFile[index].files[0]);
    },
    removeGalleryImage(index) {
      this.movie_page.imageGallery.splice(index, 1);
    },
    savePage() {
      let movie = { ...this.movie_page };
      this.$store.dispatch("addMovie", movie);
    },
    clearPage() {
      console.log(this.movie_page);
      this.movie_page = {
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
      localStorage.setItem("movie_page", JSON.stringify(this.movie_page));
    },
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
.main-picture img {
  max-width: 310px;
  width: 100%;
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
.buttons {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.buttons :nth-child(1) {
  margin-right: 20px;
}
</style>