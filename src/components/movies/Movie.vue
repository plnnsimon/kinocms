<template>
  <div class="movie">
    <PopupInfo
      @changePopupStatus="isPopupVisible = $event"
      :movie="movie"
      v-if="isPopupVisible"
    />

    <div
      class="picture"
      @click="getInfo"
      @mouseenter="removeFilmIcon = true"
      @mouseleave="removeFilmIcon = false"
    >
      <i
        v-if="removeFilmIcon"
        @click="onRemoveFilm"
        class="fas fa-trash"
        :class="{ removeFilm: removeFilmIcon }"
      ></i>
      <img :src="movie.imageUrl" alt="movie" />
    </div>
    <div class="title">
      {{ movie.filmName }}
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
      filmCard: false,
    };
  },
  methods: {
    getInfo() {
      if (!this.filmCard) {
        this.isPopupVisible = true;
      }
    },
    onRemoveFilm() {
      if (confirm("Are you sure ?")) {
        this.filmCard = true
        try {
          this.$store.dispatch("removeMovie", this.movie.filmId);
          this.$store.dispatch('loadMovies')
        } catch (err) {
          console.log(err);
        }
      } else {
        this.isPopupVisible = true
      }
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
.removeFilm:hover {
  color: rgb(121, 121, 121);
}
</style>