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
        <div>
          <p>Расписание сеансов кинотеатра:</p>
          <select name="" id="" v-model="selectedCinema">
            <option value="">{{ $t("cinema") }}</option>
            <option
              v-for="cinema in cinemas"
              :key="cinema.cinemaId"
              :value="cinema.cinemaId"
            >
              {{ getCinemaName(cinema) }}
            </option>
          </select>
          <span>
            <label for="all">IMAX</label>
            <input
              name="type"
              id="all"
              type="radio"
              value="IMAX"
              v-model="selectedType"
            />
          </span>
          <span>
            <label for="3d">3D</label>
            <input
              name="type"
              id="3d"
              type="radio"
              value="3D"
              v-model="selectedType"
            />
          </span>
          <span>
            <label for="2d">2D</label>
            <input
              name="type"
              id="2d"
              type="radio"
              value="2D"
              v-model="selectedType"
            />
          </span>
        </div>
        <div class="timetable">
          <label
            :for="index"
            class="timetable__item"
            v-for="(time, index) in getWeek('short')"
            :key="index"
            :class="{ active: selectedDate == time.day }"
          >
            <p>{{ time.day }}</p>
            <p>{{ time.weekday[0].toUpperCase() + time.weekday[1] }}</p>
            <p>{{ time.month }}</p>
            <input
              name="timetable"
              style="display: none"
              type="radio"
              :id="index"
              v-model="selectedDate"
              :value="time.day"
            />
          </label>
        </div>
      </div>
      <div class="days">
        {{ selCinema }}
        <span
        class="days__container"
          v-for="(item, index) in getMovieTimetable(
            movie,
            selectedCinema,
            selectedDate,
            selectedType
          )"
          :key="index"
        >
          <span>
            <p>{{ item.time }}</p>
            <p>{{ item.type }}</p>
          </span>
          <span>
            <p>Зал {{ item.hall }}</p>
            <p>{{ item.price }} грн.</p>
          </span>
        </span>
        <Spinner v-if="loading" />
        <p
          v-if="
            getMovieTimetable(movie, selectedCinema, selectedDate, selectedType)
              .length <= 0
          "
        >
          На эту дату фильмов нету...
        </p>
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
      <ContextAdvertisement />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Carousel from "../users-main-page/Carousel.vue";
import ContextAdvertisement from "../users-main-page/ContextAdvertisement.vue";
import languageHelpers from "../../mixins/languageHelpers";
import Spinner from "../Spinner.vue";
export default {
  components: { ContextAdvertisement, Carousel, Spinner },
  name: "MoviePageInfo",
  data() {
    return {
      timetable: [],
      selectedCinema: "",
      selectedDate: "",
      selectedType: "",
    };
  },
  mixins: [languageHelpers],
  async mounted() {
    await this.getTimetable();
  },
  computed: {
    ...mapGetters(["movies", "pages", "cinemas", "loading"]),
    movie() {
      const movie = this.movies.find(
        (movie) => movie.filmId == this.$route.params.movieId
      );
      return movie;
    },
    selCinema() {
      let selCinema = this.cinemas.find(
        (el) => el.cinemaId == this.selectedCinema
      );
      if (selCinema) {
        return this.getCinemaName(selCinema);
      } else {
        return "";
      }
    },
  },
  created() {
    this.$store.dispatch("loadMovies");
    this.$store.dispatch("loadCinemas");
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
  },
};
</script>

<style scoped>
.active {
  background: #ff57229c;
}
.timetable {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.timetable__item {
  border-radius: 10px;
  border: 1px solid;
  margin-right: 20px;
  display: flex;
  flex-flow: row wrap;
  width: 50px;
  justify-content: space-around;
  cursor: pointer;
}
.timetable__item p {
  margin: 0;
  font-weight: 700;
  border-bottom: 1px solid;
}
.timetable__item p:nth-child(3) {
  font-weight: 400;
  border: none;
}
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
  flex-direction: column;
  width: 100%;
}
.time__top div:nth-child(1) {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.days {
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 20px 0;
}
.days__container {
  display: flex;
  flex-direction: column;
  max-width: 125px;
  border: 1px solid;
}
.days__container span p {
  margin: 0 !important;
  padding: 5px;
}
.days__container span {
  display: flex;
  justify-content: space-around;
}
.days__container span:nth-child(1) {
  border-bottom: 1px solid;
}
.days__container span:nth-child(1) p {
  font-weight: 700;
}
.days__container span:nth-child(1) p:nth-child(1) {
  border-right: 1px solid;
}
.days__container span:nth-child(2) p:nth-child(1) {
  border-right: 1px solid;
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