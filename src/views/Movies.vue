<template>
  <div>
    <div class="loader">
      <Spinner v-if="loading" />
    </div>
    <h2 class="main-title">Список фильмов текущих</h2>
    <div class="movies">
      <Movie :movie="movie" v-for="(movie, index) of movies" :key="index" />
    </div>
  </div>
</template>

<script>
import Movie from "../components/movies/Movie.vue";
import Spinner from "../components/Spinner.vue";
export default {
  name: "Movies",
  components: {
    Movie,
    Spinner
  },
  computed: {
    movies() {
      return this.$store.getters.movies;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  mounted() {
    this.$store.dispatch("loadMovies");
  },
};
</script>

<style scoped>
.movies {
  display: flex;
  flex-flow: row wrap;
  padding: 40px;
}
.main-title {
  padding-top: 20px;
  text-align: center;
}
.loader {
  position: relative;
  left: 50%;
  top: 230px;
}
</style>