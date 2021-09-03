<template>
  <div class="movie__page">
    <div class="video">
      <iframe
        width="70%"
        height="500"
        :src="getTrailerLink(movie)"
        frameborder="0"
        allow="accelerometer; autoplay;"
        allowfullscreen
        ng-show="showvideo"
      ></iframe>
    </div>
    <div class="movie__time">
      <div class="time__top">
        <p>Расписание сеансов кинотеатра:</p>
        <select name="" id="">
          <option v-for="cinema in cinemas" :key="cinema.cinemaId" value="">{{ getCinemaName(cinema) }}</option>
        </select>
        <span>
          <label for="all">Все</label>
          <input id="all" type="checkbox" />
        </span>
        <span>
          <label for="3d">3D</label>
          <input id="3d" type="checkbox" />
        </span>
        <span>
          <label for="2d">2D</label>
          <input id="2d" type="checkbox" />
        </span>
      </div>
      <div class="days">
        <span v-for="(item, index) in movie.timetable" :key="index">
          <p>{{ item.time }}</p>
          <p>{{ item.filmType }}</p>
          <p>Зал {{ item.hall }}</p>
          <!-- <p>{{ getMonth(item.date) }}</p> -->
        </span>
      </div>
    </div>
    <div class="movie__info">
      <div class="movie__image">
        <img :src="getPick(movie.picture)" alt="" />
      </div>
      <div class="movie__description">
        <button class="btn btn-success">{{ $t("buy") }}</button>
        <div class="description__text">
          <h2>{{ getFilmName(movie) }}</h2>
          <p>{{ getDescription(movie) }}</p>
        </div>
      </div>
    </div>
    <div class="carousel__container">
      <img src="../../assets/films/film-info.jpeg" alt="" />
      <Carousel :array="movie.imageGallery" />
    </div>
    <div class="movie__advertisement">
      <ContextAdvertisement :pages="pages" :lang="lang" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Carousel from "../users-main-page/Carousel.vue";
import ContextAdvertisement from "../users-main-page/ContextAdvertisement.vue";
import languageHelpers from "../../mixins/languageHelpers";
export default {
  components: { ContextAdvertisement, Carousel },
  name: "MoviePageInfo",
  data() {
    return {};
  },
  mixins: [languageHelpers],
  computed: {
    ...mapGetters(["movies", "pages", 'cinemas']),
    movie() {
      const movie = this.movies.find(
        (movie) => movie.filmId == this.$route.params.movieId
      );
      return movie;
    },
  },
  created() {
    this.$store.dispatch("loadMovies");
    this.$store.dispatch("loadCinemas");
    const movie = this.movies.find(
      (movie) => movie.filmId == this.$route.params.movieId
    );
    console.log(movie);
    if (movie) {
      this.movie = movie;
    }
  },
  methods: {
    getMonth(data) {
      if (this.lang == "ru") {
        return new Date(data).toLocaleString("ru-RU", {
          month: "long",
        });
      } else {
        return new Date(data).toLocaleString("uk-UA", {
          month: "long",
        });
      }
    },
  }
};
</script>

<style scoped>
.movie__page {
  background: white;
  padding: 100px 10px 180px;
  height: 100%;
  top: 204px;
  color: black;
}
.video {
  padding: 10px;
  display: flex;
    justify-content: center;
}
.movie__time {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.time__top {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.days {
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding-top: 20px;
}
.days span {
  display: flex;
    max-width: 100px;
    flex-flow: row wrap;
    border: 1px solid;
}
.days span p {
  margin-right: 5px;
}
.movie__info {
  display: flex;
  justify-content: space-around;
}
.movie__image {
  padding: 20px;
}
.movie__image img {
  max-width: 300px;
  object-fit: cover;
}
.movie__description {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.description__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.carousel__container {
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
  justify-content: space-between;
  align-items: center;
}
</style>