<template>
  <div v-if="pages.length > 0" class="advertisement">
      <p>{{ getTitle }}</p>
      <img :src="pages[4].picture.imageUrl" alt="">
      <p>{{ getDescription(pages[4]).substring(0,15) + "..."}}</p>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import languageHelpers from '../../mixins/languageHelpers'
export default {
mixins: [languageHelpers],
beforeCreate() {
  this.$store.dispatch('loadPages')
},
computed: {
  ...mapGetters(["pages"]),
  getTitle() {
    if (this.lang == 'ru') {
      return this.pages[4].ruTitle
    } else {
      return this.pages[4].uaTitle
    }
  }
}
}
</script>

<style scoped>
.advertisement {
  display: flex;
    flex-direction: column;
    align-items: center;
}
.advertisement img {
  width: 200px;
}
</style>