<template>
  <div class="pages">
    <MainTop />
    <UsersPages />
    
    <Footer />
    <router-view />
  </div>
</template>

<script>
import Footer from "../Footer";
import MainTop from "../../users-main-page/header/MainTop.vue";
import UsersPages from "../UsersPages.vue";
export default {
  components: {
    MainTop,
    UsersPages,
    Footer,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
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
        return 'red'
      }
    }
  },
};
</script>

<style scoped>
.pages {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    background: white;
}
</style>