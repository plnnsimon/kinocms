<template>
  <div class="cinema__page">
    <Spinner v-if="loading" />
    <img
      class="cinema__photo"
      v-if="cinema.bannerPhoto.imageUrl"
      :src="cinema.bannerPhoto.imageUrl"
      alt="picture"
    />
    <div class="cinema__info">
      <div class="info__top">
        <p>{{ getCinemaName(cinema) }}</p>
        <img class="logo" :src="cinema.logo.imageUrl" alt="picture" />
        <button class="h-25 btn btn-success">Расписание сеансов</button>
      </div>
      <p>{{ getDescription(cinema, lang) }}</p>
      <h2 class="title">{{ $t("cinemas.conditions") }}</h2>
      <p>{{ getConditions(cinema, lang) }}</p>
      <Carousel :array="cinema.cinemasGallery" />
      <div class="movie__advertisement">
        <ContextAdvertisement />
        <div class="cinema__halls">
          <Hall
            v-for="(hall, index) of cinema.cinemaHalls"
            :key="index"
            :index="index"
            :hall="hall"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Spinner from '../../components/Spinner.vue';
import Carousel from "../../components/users-main-page/Carousel.vue";
import ContextAdvertisement from "../../components/users-main-page/ContextAdvertisement";
import languageHelpers from "../../mixins/languageHelpers";
import Hall from "./Hall.vue";
export default {
  components: {
    ContextAdvertisement,
    Hall,
    Carousel,
    Spinner,
  },
  data() {
    return {
      currentSlideIndex: 0,
      interval: 3000,
    };
  },
  mixins: [languageHelpers],
  computed: {
    ...mapGetters(["cinemas", 'loading']),
    cinema() {
      let cinema = this.cinemas.find(
        (cinema) => cinema.cinemaId == this.$route.params.cinemaId
      );
      return cinema;
    },
  },
  beforeCreate() {
    this.$store.dispatch("loadCinemas");
  },
  mounted() {
    if (this.interval > 0) {
      let vm = this;
      setInterval(function () {
        vm.nextSlide();
        vm.getColor();
      }, vm.interval);
    }
  },
  methods: {
    nextSlide() {
      if (this.currentSlideIndex >= this.cinema.cinemasGallery.length - 1) {
        this.currentSlideIndex = 0;
      } else {
        this.currentSlideIndex++;
      }
    },
    getColor(index) {
      if (index == this.currentSlideIndex) {
        return "red";
      }
    },
  },
};
</script>

<style scoped>
.cinema__page {
  background: white;
  padding-bottom: 180px;
}
.cinema__photo {
  width: 100%;
  padding: 10px;
  margin: auto;
  max-width: 800px;
  display: flex;
}
.logo {
  max-width: 200px;
}
.cinema__info {
  padding-left: 250px;
  position: relative;
}
.movie__advertisement {
  position: absolute;
  left: 10px;
  top: 0;
  height: 100%;
  background: #49807d38;
}
.info__top {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}
.info__top p {
  font-size: 20px;
  font-weight: bold;
}
.btn {
  border: 2px solid black;
}
.footer {
  position: relative;
}
.cinema__halls {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.gallery__image {
  max-width: 400px;
}
.wrapper {
  max-width: 400px;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: 20px auto;
}
.carousel {
  display: flex;
  transition: all ease 0.5s;
}
.circle__container {
  display: flex;
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0px;
  left: 0;
  color: white;
  justify-content: center;
  align-items: center;
}
.circle {
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.title {
  text-align: center;
}
</style>