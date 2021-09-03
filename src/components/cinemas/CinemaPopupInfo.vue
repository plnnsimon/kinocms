<template>
  <div class="popup">
    <div class="popup-header">
      <i class="far fa-times-circle" @click="closeInfo"></i>
      <img :src="cinema.logo.imageUrl" alt="movie's picture" />
    </div>
    <div class="popup-main">
      <div class="info">
        <h1 v-if="lang == 'ru'">{{ cinema.ruCinemaName }}</h1>
        <h1 v-else>{{ cinema.uaCinemaName }}</h1>
        <p v-if="lang == 'ru'" class="film-description">{{ cinema.ruDescription }}</p>
        <p v-else class="film-description">{{ cinema.uaDescription }}</p>
        <hr />
        <p v-if="lang == 'ru'" class="film-description">{{ cinema.ruConditions }}</p>
        <p v-else class="film-description">{{ cinema.uaConditions }}</p>
      </div>
      <div class="imageWrapper">
        <div
          v-for="(image, index) in cinema.cinemasGallery"
          :key="index"
          class="imageGallery"
        >
          <img :src="image.imageUrl" />
        </div>
      </div>
      <div class="cinemaHalls">
        <p>{{ $t("cinemas.halls") }}</p>
        <div class="cinemaHalls-container">
          <div
            :cinemaHall="cinemaHall"
            v-for="(cinemaHall, index) of cinema.cinemaHalls"
            :key="index"
            class="hall"
          >
            <img :src="cinemaHall.scheme.imageUrl" alt="scheme" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupInfo",
  props: ["cinema", "isPopupVisible"],
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  mounted() {
    console.log(this.cinema);
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
  max-width: 400px;
  width: 100%;
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
.cinemaHalls {
  color: white;
  margin-bottom: 20px;
}
.cinemaHalls .hall {
  margin-right: 15px;
}
.cinemaHalls img {
  max-width: 150px;
}
.cinemaHalls-container {
  display: flex;
  flex-direction: row;
}
</style>