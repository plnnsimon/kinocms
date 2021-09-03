<template>
    <div class="wrapper">
      <div
        class="carousel"
        :style="{ 'margin-left': '-' + 100 * currentSlideIndex + '%' }"
      >
        <CarouselItem
          v-for="(item, index) in array"
          :key="index"
          :item="item"
        />
      </div>
      <div class="circle__container">
        <span
          class="circle"
          v-for="(image, index) in array"
          :key="index"
          :style="{ background: getColor(index) }"
        >
        </span>
      </div>
    </div>
</template>

<script>
import CarouselItem from "./CarouselItem.vue";
import firebase from "firebase";

export default {
  name: "Carousel",
  props: ["array"],
  components: {
    CarouselItem,
  },
  data() {
    return {
      interval: 0,
      currentSlideIndex: 0,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
  async mounted() {
    await firebase
      .database()
      .ref("speed")
      .once("value")
      .then((data) => {
        this.interval = data.val();
      });
    if (this.interval > 0) {
      let vm = this;
      setInterval(function () {
        vm.nextSlide();
      }, vm.interval + "000");
    }
  },
  methods: {
    nextSlide() {
      if (this.currentSlideIndex >= this.array.length - 1) {
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
.wrapper {
  max-width: 400px;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
}
.carousel {
  display: flex;
  color: rgb(0, 0, 0);
  text-align: center;
  font-size: 24px;
  position: relative;
}
.postersInfo {
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 36px;
}
.circle__container {
  display: flex;
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 10px;
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
</style>