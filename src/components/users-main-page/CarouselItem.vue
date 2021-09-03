<template>
  <div>
      <!-- <img :style="{'width': getImageStyle + 'px'}" :src="getPick(item, lang)" alt=""> -->
      <img :src="getPick(item)" alt="">
  </div>
</template>

<script>
import LanguageHelpers from '../../mixins/languageHelpers'
export default {
name: "CarouselItem",
data() {
  return {
  }
},
props: ['item'],
mixins: [LanguageHelpers],
computed: {
    // getImageStyle() {
    //   if (this.item.imageUrl) {
    //     return 400
    //   } else {
    //     return 400
    //   }
    // }
},

}
</script>
<style scoped>
img {
  width: 400px;
  height: 100%;
  object-fit: cover;
}

</style>