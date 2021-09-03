<template>
  <div class="movie">
    <PopupInfo
      @changePopupStatus="isPopupVisible = $event"
      :movie="movie"
      v-if="isPopupVisible && admin"
    />
    <div
      class="picture"
      @click="getInfo"
      @mouseenter="
        removeFilmIcon = true;
        editFilmIcon = true;
      "
      @mouseleave="
        removeFilmIcon = false;
        editFilmIcon = false;
      "
    >
      <i
        v-if="removeFilmIcon && admin"
        @click.stop="onRemoveFilm(movie)"
        class="fas fa-trash"
        :class="{ removeFilm: removeFilmIcon }"
      ></i>
      <i
        v-if="editFilmIcon && admin"
        @click.stop="editFilm(movie)"
        class="fas fa-edit"
        :class="{ editFilm: editFilmIcon }"
      ></i>
      <img
        v-if="!movie.picture.ruImageUrl || !movie.picture.uaImageUrl"
        src="../../assets/films/noImage.jpeg"
        alt="movie"
      />
      <img
        v-if="lang == 'ru' && movie.picture.ruImageUrl"
        :src="movie.picture.ruImageUrl"
        alt="movie"
      />
      <img
        v-if="lang == 'ua' && movie.picture.uaImageUrl"
        :src="movie.picture.uaImageUrl"
        alt="movie"
      />
    </div>
    <div v-if="lang == 'ua'" class="title">
      {{ movie.uaFilmName }}
    </div>
    <div v-else class="title">
      {{ movie.ruFilmName }}
    </div>
    <div v-if="movie.releaseDate" class="title">
      {{ releaseDay(movie.releaseDate) }}
    </div>
  </div>
</template>

<script>
import PopupInfo from "./PopupInfo";
export default {
  name: "Movie",
  props: ["movie"],
  components: {
    PopupInfo,
  },
  data() {
    return {
      isPopupVisible: false,
      removeFilmIcon: false,
      editFilmIcon: false,
      isEditFilm: false,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    admin() {
      return this.$store.getters.admin;
    },
},
mounted( ){
},
  methods: {
    releaseDay(data) {
      if (this.lang == "ru") {
        return new Date(data).toLocaleString("ru-RU", {
          day: "numeric",
          month: "long",
        });
      } else {
        return new Date(data).toLocaleString("uk-UA", {
          day: "numeric",
          month: "long",
        });
      }
    },
    getInfo() {
      if (!this.filmCard) {
        this.isPopupVisible = true;
      }
    },
    onRemoveFilm(movie) {
      if (confirm("Are you sure ?")) {
        try {
          this.$store.dispatch("removeMovie", movie.filmId);
          this.$store.dispatch("loadMovies");
        } catch (err) {
          console.log(err);
        }
      } else {
        this.isPopupVisible = true;
      }
    },
    editFilm(movie) {
      this.$emit("editFilm", { movie: movie, setTrue: true });
    },
  },
};
</script>

<style scoped>
.movie {
  max-width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  color: black;
}
.picture {
  cursor: pointer;
  position: relative;
}
.picture img {
  width: 100%;
  max-height: 350px;
  max-width: 250px;
  transition: all ease 0.5s;
  opacity: 1;
  box-shadow: 6px 5px 5px 2px rgba(0, 0, 0, 0.527);
}
.picture img:hover {
  transition: all ease 0.5s;
  opacity: 0.6;
}
.title {
  margin: 10px auto;
}
.removeFilm {
  font-size: 26px;
  position: absolute;
  z-index: 999;
  top: 10px;
  right: 10px;
  color: white;
  cursor: pointer;
}
.editFilm {
  font-size: 26px;
  position: absolute;
  z-index: 9;
  top: 10px;
  right: 40px;
  color: white;
  cursor: pointer;
}
.removeFilm:hover {
  color: rgb(121, 121, 121);
}
.editFilm:hover {
  color: rgb(121, 121, 121);
}
</style>