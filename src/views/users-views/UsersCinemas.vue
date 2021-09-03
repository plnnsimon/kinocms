<template>
    <div class="about__cinema">
      <div class="cinemas">
        <Spinner v-if="loading" />
        <div class="cinema" v-for="(cinema, index) in cinemas" :key="index">
          <router-link
            :to="{
              name: 'cinema__info',
              params: { cinemaId: cinema.cinemaId },
            }"
          >
            <img :src="cinema.logo.imageUrl" alt="picture" />
            <p>Кинотеатр {{ index + 1 }}</p>
          </router-link>
        </div>
      </div>
      <div class="movie__advertisement">
        <ContextAdvertisement />
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Spinner from "../../components/Spinner.vue";
import ContextAdvertisement from "../../components/users-main-page/ContextAdvertisement.vue";
export default {
  components: { Spinner, ContextAdvertisement },
  computed: {
    ...mapGetters(["loading", "cinemas"]),
  },
  beforeCreate() {
    this.$store.dispatch("loadCinemas");
  },
};
</script>

<style scoped>
.about__cinema {
  background: white;
  padding-bottom: 180px;
}
.cinemas {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  padding: 10px;
  margin-right: 300px;
}
.cinema img {
  max-width: 300px;
  box-shadow: 3px 3px 10px black;
  cursor: pointer;
  position: relative;
}
.cinema p {
  font-size: 20px;
    text-align: center;
}
.cinema img:hover {
  opacity: 0.7;
}
a {
  text-decoration: none;
  color: inherit;
}
.movie__advertisement {
  position: absolute;
  right: 10px;
  top: 20%;
}
.footer {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>