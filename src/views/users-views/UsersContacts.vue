<template>
  <div class="cinema__page">
      <h1>{{ $t('sidebar.contacts') }}</h1>
      <div class="cinemas">

    <div class="cinema" v-for="(cinema, index) in pages[6].cinemas" :key="index">
      <div class="cinema__left">
        <p>Кинотеатр {{ index + 1 }}</p>
        <img :src="cinema.logo.imageUrl" alt="logo" />
      </div>
      <div class="cinema__right">
        <p>Кинотеатр "{{ getName(cinema) }}"</p>
        <p>{{ getAddress(cinema) }}</p>
        <GmapMap
          :center="{ lat: +coords(index)[0], lng: +coords(index)[1] }"
          :zoom="20"
          style="width: 400px; height: 200px"
        />
      </div>
      </div>
    </div>
    <div class="movie__advertisement">
      <ContextAdvertisement />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ContextAdvertisement from "../../components/users-main-page/ContextAdvertisement";
import languageHelpers from "../../mixins/languageHelpers";
export default {
  components: {
    ContextAdvertisement,
  },
  data() {
    return {};
  },
  mixins: [languageHelpers],
  computed: {
    ...mapGetters(["pages"]),
  },
  beforeCreate() {
    this.$store.dispatch("loadPages");
  },
  mounted() {
    console.log(+this.coords(0)[0]);
  },
  methods: {
    coords(index) {
      let coordsArr = this.pages[6].cinemas[index].coords.split(", ");
      return coordsArr;
    },
    getAddress(cinema) {
      if (this.$i18n.locale == "ru") {
        return cinema.ruAddress;
      } else {
        return cinema.uaAddress;
      }
    },
    getName(cinema) {
      if (this.$i18n.locale == "ru") {
        return cinema.ruName;
      } else {
        return cinema.uaName;
      }
    },
  },
};
</script>

<style scoped>
h1 {
    text-align: center;
}
.cinemas {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
}
.cinema__left img {
    max-width: 200px;
}
.cinema__page {
  background: white;
  padding: 100px 0 180px 220px;
}
.cinema {
  display: flex;
  border: 1px solid;
  justify-content: space-between;
  padding: 10px;
    max-width: 650px;
    background: #00bcd4;
}
.movie__advertisement {
  position: absolute;
  left: 10px;
  top: 100px;
  height: 100%;
  background: #49807d38;
}
</style>