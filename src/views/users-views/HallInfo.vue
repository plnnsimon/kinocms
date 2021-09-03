<template>
  <div class="cinema__page">
    <Spinner class="spinner" v-if="loading" />
    <img class="cinema__photo" :src="hall.bannerPhoto.imageUrl" alt="picture" />
    <div class="cinema__info">
      <div class="info__top">
        <h2>Зал {{ hall.hallName }}</h2>
      </div>
      <p v-if="lang == 'ru'">{{ hall.ruHallDescription }}</p>
      <p v-else>{{ hall.uaHallDescription }}</p>
      <img class="cinema__photo" :src="hall.scheme.imageUrl" alt="picture" />
      <Carousel :array="hall.cinemaHallGallery" />
      <div class="movie__advertisement">
        <ContextAdvertisement />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Spinner from '../../components/Spinner.vue';
import Carousel from "../../components/users-main-page/Carousel.vue";
import ContextAdvertisement from "../../components/users-main-page/ContextAdvertisement";
export default {
  components: {
    ContextAdvertisement,
    Carousel,
    Spinner,
  },
  data() {
    return {
      currentSlideIndex: 0,
      interval: 4000,
    };
  },
  computed: {
    ...mapGetters(["cinemas", 'loading']),
    lang() {
      return this.$i18n.locale;
    },
    hall() {
      const cinema = this.cinemas.find(
      (cinema) => cinema.cinemaId == this.$route.params.cinemaId
    );
    let hall
    if (cinema) {
      let idx = this.$route.params.hallId.split("");
      idx = idx[idx.length - 1] - 1;
      hall = cinema.cinemaHalls[idx];
    }
      return hall
    }
  },
  created() {
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
      if (this.currentSlideIndex >= this.hall.cinemaHallGallery.length - 1) {
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
  left: 0;
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
.cinema__halls span {
  border: 1px solid;
  padding-left: 10px;
  margin-bottom: 10px;
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
.spinner {
  top: 10%;
  left: 50%;
}
</style>