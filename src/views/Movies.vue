<template>
  <div>
    <h2 class="main-title">Список фильмов текущих</h2>
    <div class="movies">
      <Movie :movie="movie" v-for="(movie, index) of movies" :key="index" />
    </div>
  </div>
</template>

<script>
import Movie from "../components/movies/Movie.vue";
export default {
  name: "Movies",
  components: {
    Movie,
  },
  data() {
    return {
      movies: [
        {
          title: "Алладин",
          img: "alladin.jpeg",
        },
        {
          title: "Послезавтра",
          img: "day_after_tomorrow.jpeg",
        },
        {
          title: "Мортал комбат",
          img: "mortal-kombat.jpeg",
        },
        {
          title: "Алладин",
          img: "alladin.jpeg",
        },
        {
          title: "Послезавтра",
          img: "day_after_tomorrow.jpeg",
        },
        {
          title: "Мортал комбат",
          img: "mortal-kombat.jpeg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.movies {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 40px;
}
.main-title {
  padding-top: 20px;
  text-align: center;
}
</style>