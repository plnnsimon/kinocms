<template>
  <div>
    <div class="container">
      <div v-for="(item, index) in newsFilter" :key="index" class="container__item">
          <div class="container_header">
              <div class="container__title">

        <h3>{{ getNewsTitle(item) }}</h3>
              </div>
            
          </div>
        <div class="container_images" v-for="(image, index) in item.imageGallery" :key="index">
          <img class="image" :src="image.imageUrl" alt="" />
        </div>
        <div class="container__description">
            <p>{{ getDescription(item).substring(0,50) + "..." }}</p>
        </div>
        <div class="container__date">
        <p>{{ item.newsDate }}</p>

            </div>
      </div>
    </div>
    <hr>
    <div class="container">
      <div v-for="(item, index) in promotionsFilter" :key="index" class="container__item">
          <div class="container_header">
              <div class="container__title">
        <h3>{{ getPromotionTitle(item) }}</h3>
              </div>
            
          </div>
        <div class="container_images" v-for="(image, index) in item.imageGallery" :key="index">
          <img class="image" :src="image.imageUrl" alt="" />
        </div>
        <div class="container__description">
            <p>{{ getDescription(item).substring(0,50) + "..." }}</p>
        </div>
        <div class="container__date">
        <p>{{ item.promotionsDate }}</p>

            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import languageHelpers from '../../mixins/languageHelpers';
export default {
  mixins: [languageHelpers],
  computed: {
    ...mapGetters(["news", "promotions"]),
    
    newsFilter() {
      return this.news.filter(el => el.checked)
    },
    promotionsFilter() {
      return this.promotions.filter(el => el.checked)
    }
  },
  mounted() {
    this.$store.dispatch("loadNews");
    this.$store.dispatch("loadPromotions");
  }
};
</script>

<style scoped>
.image {
  max-width: 270px;
    width: 100%;
}
.container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    width: 100%;
    padding: 0 20px 20px;
}
.container__item {
    display: flex;
    flex-direction: column;
    border: 1px solid;
    box-shadow: 2px 5px 7px 2px;
    justify-content: space-between;
}
.container__header {
    background: #ebebeb;
    border-radius: 10px 10px 0 0;
    padding: 10px;
}
.container__title {
  width: 300px;
    background: black;
    color: white;
    text-align: center;
    padding: 5px;
}
.container_images {
  display: flex;
    justify-content: center;
    padding: 20px 0;
}
.container__description {
  display: flex;
    padding: 0px 15px;
    width: 300px;
}
.container__description p {
  max-width: 270px;
  padding: 0;
  margin: 0;
}
.container__date p {
  margin: 0;
    padding: 5px;
    float: right;
}
</style>