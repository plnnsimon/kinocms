<template>
  <div class="page">
      <Spinner v-if="loading"/>
    <h1>{{ $t("sidebar.news") }}</h1>
    <div class="promotions">
      <div v-for="item in array" :key="item.newsId" class="promotion__item">
        <img :src="item.imageGallery[0].imageUrl" alt="" />
        <router-link
          :to="{
            name: '',
          }"
        >
          {{ getNewsTitle(item) }}
        </router-link>
        <p class="date">{{ item.newsDate }}</p>
        <p class="description">
          {{ getDescription(item).substring(0, 50) + "..." }}
        </p>
      </div>
    </div>
    <div class="advertisement">
      <ContextAdvertisement />
    </div>
    <Paginate
    v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Пред'"
      :next-text="'След'"
      :container-class="'myPagination'"
      :page-class="'item'"
      :prev-class="'prev'"
      :next-class="'next'"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Spinner from '../../components/Spinner.vue';
import ContextAdvertisement from "../../components/users-main-page/ContextAdvertisement.vue";
import languageHelpers from "../../mixins/languageHelpers";
import pagination from "../../mixins/pagination";

export default {
  components: {
    ContextAdvertisement,
    Spinner,
  },
  mixins: [languageHelpers, pagination],
  computed: {
    ...mapGetters(["news", 'loading']),
    array() {
      return this.setupPagination(this.news)
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadNews");
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
  flex-flow: row wrap;
  padding: 10px;
}
.promotion__item {
  display: flex;
  flex-direction: column;
  margin-right: 30px;
}
.promotion__item img {
  max-width: 300px;
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}
.promotion__item a {
  font-weight: 500;
}
.promotion__item .date {
  background: black;
  width: 100px;
  text-align: center;
  border-radius: 15px;
  font-weight: 500;
  margin: 5px;
}
.promotion__item .description {
  color: #969696;
  width: 300px;
}
h1 {
  text-align: center;
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
