<template>
    <div class="cinema__page">
      <img
        class="cinema__photo"
        :src="getPick(pages[5].picture)"
        alt="picture"
      />
      <div class="cinema__info">
        <div class="info__top">
          <p>{{ getName }}</p>
        </div>
        <p>{{ getDescription(pages[5]) }}</p>
        <Carousel :array="pages[5].imageGallery" />
        <div class="movie__advertisement">
          <ContextAdvertisement  />
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Carousel from '../../components/users-main-page/Carousel.vue';
import ContextAdvertisement from "../../components/users-main-page/ContextAdvertisement";
import languageHelpers from '../../mixins/languageHelpers';
export default {
  components: {
    ContextAdvertisement,
    Carousel,
  },
  data() {
    return {
    };
  },
  mixins: [languageHelpers],
  computed: {
    ...mapGetters(["pages"]),
    getName() {
      if (this.lang == 'ru') {
        return this.pages[5].ruPageName
      } else {
        return this.pages[5].uaPageName
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadPages");
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
.gallery__image {
  max-width: 400px;
}
</style>