<template>
  <div class="main-content">
    <MainTop />
    <UsersPages />
    <Carousel :array="storeBanners" />
    <Movies />
    <div class="loader">
      <Spinner v-if="loading" />
    </div>
    <div class="title">
      <h2>{{ $t("newsAndAdvertisement") }}</h2>
    </div>
    <NewsAndPromotions />
    <hr>
    <ContextAdvertisement />
  </div>
</template>

<script>
import NewsAndPromotions from "../users-main-page/NewsAndPromotions";
import Spinner from "../Spinner.vue";
import Movies from "../../views/Movies.vue";
import UsersPages from "../users-main-page/UsersPages";
import Carousel from "../users-main-page/Carousel";
import ContextAdvertisement from './ContextAdvertisement.vue';
import MainTop from './header/MainTop.vue';
import { mapGetters } from 'vuex'
export default {
  name: "MainContent",
  components: {
    UsersPages,
    Carousel,
    Movies,
    Spinner,
    NewsAndPromotions,
    ContextAdvertisement,
    MainTop,
  },
  computed: {
    ...mapGetters(['loading', 'pages', 'storeBanners']),
    lang() {
      return this.$i18n.locale;
    },
  },
  async mounted() {
    await this.$store.dispatch("loadPages");
    this.$store.dispatch("loadBanners");
  },
};
</script>

<style scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
}
.navbar {
  max-width: 600px;
  float: right;
  margin-right: 20px;
  border-radius: 15px;
}
.main-content {
  width: 70%;
  margin: 50px auto 180px;
  height: 100%;
  background: rgb(255 255 255 / 98%);
  z-index: 10;
  overflow: hidden;
}
.title {
  text-align: center;
  border-top: 1px solid; 
  padding: 20px;
}

</style>