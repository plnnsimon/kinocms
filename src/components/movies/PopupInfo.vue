<template>
  <div class="popup">
    <div class="popup-header">
      <i class="far fa-times-circle" @click="closeInfo"></i>
      <img
        v-if="!movie.picture.ruImageUrl || !movie.picture.uaImageUrl"
        src="../../assets/films/noImage.jpeg"
        alt="movie"
      />
      <img
        v-if="lang == 'ru' && movie.picture.ruImageUrl"
        :src="movie.picture.ruImageUrl"
        alt="movie"
      />
      <img
        v-if="lang == 'ua' && movie.picture.uaImageUrl"
        :src="movie.picture.uaImageUrl"
        alt="movie"
      />
    </div>
    <div class="popup-main">
      <div class="info">
        <h1  v-if="lang == 'ru'">{{ movie.ruFilmName }}</h1>
        <h1 v-else>{{ movie.uaFilmName }}</h1>
        <p  v-if="lang == 'ru'" class="film-description">{{ movie.ruDescription }}</p>
        <p v-else class="film-description">{{ movie.uaDescription }}</p>
        <div class="film-types">
          <span v-if="movie.filmType.twoD">2D</span>
          <span v-if="movie.filmType.threeD">3D</span>
          <span v-if="movie.filmType.imax">IMAX</span>
        </div>
      </div>
      <div class="imageWrapper">
        <div
        v-for="(image, index) in movie.imageGallery"
        :key="index"
        class="imageGallery"
      >
        <img :src="image.imageUrl" />
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupInfo",
  props: ["movie", "isPopupVisible"],
  computed: {
    lang() {
      return this.$i18n.locale
    },
},
  methods: {
    closeInfo() {
      this.$emit("changePopupStatus", false);
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  z-index: 9999;
  background: rgb(0 0 0 / 87%);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.popup-header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 100px auto 20px;
  color: white;
}
.popup-header img {
  width: 300px;
}
.popup-header i {
  position: absolute;
  top: 40px;
  right: 100px;
  font-size: 30px;
  cursor: pointer;
}
.popup-header i:hover {
  color: rgb(97, 97, 97);
}
.popup-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.info {
  width: 700px;
  color: white;
  margin-bottom: 50px;
}
.film-types span {
  border: 1px solid white;
  padding: 5px;
  margin-right: 10px;
}
.imageWrapper {
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
}
.imageGallery {
  width: 200px;
  margin: 0 15px;
}
.imageGallery img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>