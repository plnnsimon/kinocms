<template>
  <div class="movie-picture-page">
    <i class="close-edit fas fa-window-close" @click="closeInfo"></i>
    <div class="container">
      <div class="film-name">
        <label for="film-name">{{ $t("filmName") }}</label>
        <input
        v-if="lang == 'ua'"
          v-model="movie.uaFilmName"
          type="text"
          id="film-name"
          :placeholder="$t('filmName')"
        />
        <input
        v-else
          v-model="movie.ruFilmName"
          type="text"
          id="film-name"
          :placeholder="$t('filmName')"
        />
      </div>
      <div class="description">
        <label for="film-description">{{ $t("description") }}</label>
        <textarea
        v-if="lang == 'ua'"
          v-model="movie.uaDescription"
          type="text"
          id="film-description"
          :placeholder="$t('description')"
        ></textarea>
        <textarea
        v-else
          v-model="movie.ruDescription"
          type="text"
          id="film-description"
          :placeholder="$t('description')"
        ></textarea>
      </div>
      <div class="main-picture">
        <p>{{ $t("mainImage") }}</p>
        <img
          v-if="lang == 'ru' && movie.picture.ruImageUrl"
          :src="movie.picture.ruImageUrl"
          alt="picture"
        />
        <img
          v-if="lang == 'ua' && movie.picture.uaImageUrl"
          :src="movie.picture.uaImageUrl"
          alt="picture"
        />
        <input
        v-if="lang == 'ru'"
          type="file"
          style="display: none"
          ref="fileInput"
          @change="(event) => onFileSelected(event, movie.picture, lang)"
        />
        <input
        v-if="lang == 'ua'"
          type="file"
          style="display: none"
          ref="fileInput"
          @change="(event) => onFileSelected(event, movie.picture, lang)"
        />
        <button @click="onPickFile" class="btn btn-primary">{{ $t("add") }}</button>
        <button @click="removeImage(movie.picture, lang)" class="btn btn-danger">{{ $t("delete") }}</button>
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
        v-if="lang == 'ru'"
          v-model="movie.ruTrailerLink"
          type="text"
          id="trailer"
          :placeholder="$t('mainImage') + ' в youtube'"
        />
        <input
        v-else
          v-model="movie.uaTrailerLink"
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
          <div v-if="movie.soonShawn">
            <input v-model="movie.releaseDate" type="date">
          </div>
        </div>
      </div>
      <SeoBlock :item="movie" />
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
import SeoBlock from '../SeoBlock.vue'
import OnFileSelected from "../../mixins/onFileSelected";
import { mapGetters } from 'vuex';
export default {
  name: "EditMoviePage",
  props: ["movie"],
  data() {
    return {
      filmTypes: {
        "2D": false,
        "3D": false,
        "IMAX": false,
      },
      time: '',
      selectedCinema: '',
      selectedHall: '',
      isEditTime: false,
      item: null
    }
  },
  mixins: [OnFileSelected],
  components: {
    SeoBlock
  },
  computed: {
    ...mapGetters(['cinemas']),
    lang() {
      return this.$i18n.locale
    },
    getCinemaHalls() {
      var cinema
      if (this.selectedCinema != '') {
        cinema = this.cinemas.find(el => el.cinemaId == this.selectedCinema)
        return cinema = cinema.cinemaHalls
      }
      return cinema
    }
  },
  mounted() {
    this.$store.dispatch('loadCinemas')
  },
  methods: {
    editTime(item) {
      this.isEditTime = true
      this.item = item
    },
     addTimeTable() {
      let filmType = () => {
        for (var key in this.filmTypes) {
          if (this.filmTypes[key] == true) {
            return key;
          }
        }
        return;
      };
      this.movie.timetable.push({
        cinema: this.selectedCinema,
        hall: this.selectedHall,
        time: this.time,
        filmType: filmType(),
      });
    },
    addImage() {
      this.movie.imageGallery.push({
        imageUrl: "",
      });
    },
    onPickFile() {
      this.$refs.fileInput.click();
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
    updatePage() {
      this.$store.dispatch("updateMovie", this.movie);
      this.$emit("changeEditStatus", false);
    },
    closeInfo() {
      this.$emit("changeEditStatus", false);
    },
    clearPage() {
      console.log(this.movie);
      this.movie = {
        ruFilmName: "",
        uaFilmName: "",
        ruDescription: "",
        uaDescription: "",
        trailerLink: "",
        filmType: {
          twoD: false,
          threeD: false,
          imax: false,
        },
        picture: {
          uaSelectedFile: null,
          ruSelectedFile: null,
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
      };
    },
  },
};
</script>

<style scoped>
.movie-picture-page {
  position: absolute;
  z-index: 11;
  background: rgb(77, 77, 77, 87%);
  top: -10px;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.container {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 40px 20px;
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
.close-edit {
    position: absolute;
    font-size: 26px;
    cursor: pointer;
    right: 10px;
    top: 10px;
}
.close-edit:hover {
  color: rgb(155, 155, 155);
}
</style>