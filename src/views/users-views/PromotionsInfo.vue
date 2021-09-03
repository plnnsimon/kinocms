<template>
  <div class="page">
      <div class="promotions">
              <h1>
                {{getPromotionTitle(item, lang)}}
              </h1>
          <div class="promotion__item">
              <img :src="item.imageGallery[0].imageUrl" alt="">
              <p class="description">{{ getDescription(item, lang) }}</p>
          </div>
      </div>
      <div class="advertisement">

    <ContextAdvertisement />
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ContextAdvertisement from '../../components/users-main-page/ContextAdvertisement.vue';
import languageHelpers from '../../mixins/languageHelpers';

export default {
  components: {
    ContextAdvertisement,
  },
  data() {
    return {
    }
  },
  mixins: [languageHelpers],
  computed: {
    ...mapGetters(['promotions']),
    item() {
      const item = this.promotions.find(
      (item) => item.promotionId == this.$route.params.promId);
      return item
    }
  },
  created() {
    this.$store.dispatch("loadPromotions");
  },
};
</script>

<style scoped>
.page {
  background: #181f42;
  padding: 100px 10px 180px;
  margin-right: 250px;
  height: 100%;
  top: 204px;
  color: rgb(255, 255, 255);
}
.promotions {
  display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
}
.promotion__item {
  display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}
.promotion__item img{
      max-width: 400px;
    width: 100%;
    height: 250px;
    object-fit: cover;
}
.promotion__item .description {
  color: #969696;
  width: 450px;
    margin-right: 20px;
}
h1 {
  margin-bottom: 20px;
}
.advertisement {
  position: absolute;
    right: 10px;
    top: 60px;
    color: black;
    background: #d7e3e2;
    height: 100%;
}
</style>