<template>
  <div class="mobile">
      <div>
          <div class="main__photo">
              <img src="../../assets/mobile-background.jpeg" alt="">
          </div>
          <h2>Мобильные приложения</h2>
          <div class="main__text">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor cumque expedita officia nam perferendis eligendi esse, laborum tempora praesentium voluptatem fuga atque autem rem vitae amet et nesciunt modi maiores optio consequuntur molestiae impedit magnam repudiandae! Tempora sed, totam qui non, amet molestias, soluta fugiat maiores placeat laborum nisi est!</p>
          </div>
          <div class="mobile__version">
              <img src="../../assets/mobile-version.jpeg" alt="">
              <img src="../../assets/mobile-version.jpeg" alt="">
              <img src="../../assets/mobile-version.jpeg" alt="">
          </div>
              <img style="max-height: 100px; margin-right: 30px" src="../../assets/googleplay.jpeg" alt="">
              <img style="max-height: 100px" src="../../assets/app-store.jpeg" alt="">

      </div>
      <div class="movie__advertisement">
      <ContextAdvertisement />
    </div>
  </div>
</template>

<script>
import ContextAdvertisement from '../../components/users-main-page/ContextAdvertisement.vue'
export default {
    components: {
        ContextAdvertisement
    }
}
</script>

<style scoped>
.mobile {
    padding: 100px 0 180px 0;
}
.main__photo img {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    display: flex;
}
h2 {
    text-align: center;
    margin: 20px;
}
.main__text {
    padding: 0 30px;
}
.mobile__version {
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;
    width: 90%;
}
.mobile__version img {
    max-width: 300px;
}
</style>