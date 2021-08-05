<template>
  <div class="banners">
    <h2>На главной верх</h2>
    <div class="banners-section">
      <div style="marginbottom: 20px; padding: 55px 10px 10px">
        <div class="banners-container">
          <div class="loading">
            <Spinner v-if="loading" />
          </div>

          <MainBanners
            :storeBanners="storeBanners"
            :banner="banner"
            v-for="(banner, index) of storeBanners"
            :key="index"
          />

          <div v-if="storeBanners.length == 0">
            <p>No banners yet, try to add one</p>
          </div>
        </div>
        <button @click="onAdd" class="btn btn-dark">Add Banner</button>
      </div>
      <div class="speed">
        <p>Скорость вращения</p>
        <select name="" id="">
          <option value="5s" selected>5s</option>
          <option value="10s">10s</option>
          <option value="15s">15s</option>
          <option value="20s">20s</option>
        </select>
      </div>
      <button @click="onSave" class="btn btn-dark">Save</button>
      <div class="switcher">
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <h2>Сквозной баннер на заднем фоне</h2>
    <div class="banners-section">
      <ThroughBanner />
    </div>
    <h2>На главной Новости Акции</h2>
    <div class="banners-section">
      <div
        class="banners-container"
        style="marginbottom: 20px; padding: 50px 10px 10px"
      >
        <div class="loading">
          <Spinner v-if="loading" />
        </div>
        <NewsDiscountBanners
          :storeNDBanners="storeNDBanners"
          :banner="banner"
          v-for="(banner, index) of storeNDBanners"
          :key="index"
        />
        <div v-if="storeNDBanners.length == 0">
          <p>No banners yet, try to add one</p>
        </div>
      </div>
      <button @click="onAdd2" class="btn btn-dark" style="margin-left: 10px">
        Add Banner
      </button>

      <div class="speed">
        <p>Скорость вращения</p>
        <select name="" id="">
          <option value="5s" selected>5s</option>
          <option value="10s">10s</option>
          <option value="15s">15s</option>
          <option value="20s">20s</option>
        </select>
      </div>
      <button @click="onSave2" class="btn btn-dark">Save</button>
      <div class="switcher">
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import MainBanners from "../components/banners/MainBanners";
import ThroughBanner from "../components/banners/ThroughBanner";
import NewsDiscountBanners from "../components/banners/NewsDiscountBanners";
import Spinner from "../components/Spinner.vue";
import "firebase/storage";

export default {
  name: "Banners",
  components: {
    MainBanners,
    ThroughBanner,
    NewsDiscountBanners,
    Spinner,
  },
  computed: {
    storeBanners() {
      return this.$store.getters.storeBanners;
    },
    storeNDBanners() {
      return this.$store.getters.storeNDBanners;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  mounted() {
    this.$store.dispatch("loadBanners");
    this.$store.dispatch("loadNDBanners");
  },
  methods: {
    onAdd() {
      const banner = {
        selectedFile: null,
        imageUrl: "",
        image: null,
        url: "",
        text: "",
      };
      this.$store.dispatch("addBanner", banner);
    },
    onSave() {
      const banners = this.$store.getters.storeBanners;
      this.$store.dispatch("onBannersSave", banners);
      console.log("saved");
    },

    onAdd2() {
      const banner = {
        selectedFile: null,
        imageUrl: "",
        image: null,
        url: "",
      };
      this.$store.dispatch("addNDBanner", banner);
    },
    onSave2() {
      const banners = this.$store.getters.storeNDBanners;
      this.$store.dispatch("onNDBannersSave", banners);
      console.log("saved");
    },
  },
  watch: {},
};
</script>

<style>
h2 {
  margin: 10px auto;
}
.banners {
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.banner {
  display: flex;
  margin: 0 15px 15px 0;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  max-width: 300px;
  width: 100%;
  max-height: 320px;
  height: 100%;
  align-items: center;
  position: relative;
}
.image {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: relative;
}
.image i {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 26px;
  cursor: pointer;
  color: black;
}
.image i:hover {
  color: rgb(124, 124, 124);
}
.selectImage {
  margin: 0 auto;
}
.inputs {
  padding: 10px;
}
.inputs label {
  padding-right: 10px;
}
.remove-banner {
  position: absolute;
  right: -10px;
  top: -10px;
  font-size: 24px;
  cursor: pointer;
}
.remove-banner:hover {
  color: rgb(77, 77, 77);
}
.banners-container {
  display: flex;
  flex-flow: wrap row;
}
.banners-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  position: relative;
  box-shadow: 12px 4px 13px 4px rgb(0 0 0 / 50%);
}
.switcher {
  position: absolute;
  right: 10px;
  top: 10px;
  margin-left: 20px;
}
.btn-dark {
  margin: 10px auto;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(158, 158, 158);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: rgb(255, 255, 255);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgb(62, 255, 56);
}

input:focus + .slider {
  box-shadow: 0 0 1px #000000;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.speed {
  position: absolute;
  bottom: 15px;
  left: 20px;
  display: flex;
  max-width: 220px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.speed p {
  margin: 0;
}

.loading {
  position: absolute;
  top: 20%;
  left: 50%;
}
.banners h2 {
  padding-top: 50px;
}
.banners h2:nth-child(1) {
padding-top: 0;
}
</style>