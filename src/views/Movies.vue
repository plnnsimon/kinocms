<template>
  <div class="moviePage">
    <div class="loader">
      <Spinner v-if="loading" />
    </div>
    <h2 v-if="admin" class="main-title">{{ $t("movies.moviesList") }}</h2>
    <h2 class="main-title" v-else>{{ $t("watchToday") }}, {{ showDate() }}</h2>
    <div v-if="!loading" class="movies">
      <div v-for="(movie, index) of getMovies" :key="index">
        <router-link v-if="!admin" :to="{name: 'moviePage', params: {movieId: movie.filmId}}">

        <Movie @editFilm="editFilm" :movie="movie" />
        </router-link>

        <Movie v-if="admin" @editFilm="editFilm" :movie="movie" />
      </div>
    </div>

    <h2 class="main-title">{{ $t("movies.soonMoviesList") }}</h2>
    <div v-if="!loading" class="movies">
      <div v-for="movie of getSoonShawnMovies" :key="movie.filmId">
        <router-link v-if="!admin" :to="{name: 'moviePage', params: {movieId: movie.filmId}}">
        <Movie @editFilm="editFilm" :movie="movie" />
         </router-link>
         <Movie v-if="admin" @editFilm="editFilm" :movie="movie" />
      </div>
    </div>
    <div>
      <EditMoviePage
        @changeEditStatus="changeEditStatus"
        v-if="isEditFilm"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Movie from "../components/movies/Movie.vue";
import Spinner from "../components/Spinner.vue";
import EditMoviePage from "../components/movies/EditMoviePage.vue";

export default {
  name: "Movies",
  data() {
    return {
      movie: null,
      isEditFilm: false,
    };
  },
  components: {
    Movie,
    Spinner,
    EditMoviePage,
  },
  computed: {
    ...mapGetters(['movies', 'admin', 'loading']),
    lang() {
      return this.$i18n.locale
    },
    getSoonShawnMovies() {
      return this.movies.filter((el) => el.soonShawn);
    },
    getMovies() {
      return this.movies.filter((el) => !el.soonShawn);
    },
  },
  mounted() {
    this.$store.dispatch("loadMovies");
  },
  methods: {
    changeEditStatus(data) {
      this.isEditFilm = data;
      this.$store.dispatch("loadMovies");
    },
    editFilm(data) {
      this.movie = data.movie;
      this.isEditFilm = data.setTrue;
    },
    showDate() {
      if (this.lang == "ru") {
        return new Date().toLocaleString("ru-RU", {
          day: "numeric",
          month: "long",
        });
      } else {
        return new Date().toLocaleString("uk-UA", {
          day: "numeric",
          month: "long",
        });
      }
    },
  },
};
</script>

<style scoped>
.moviePage {
  position: relative;
}
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
  z-index: 999;
}
a {
  text-decoration: none;
}
</style>