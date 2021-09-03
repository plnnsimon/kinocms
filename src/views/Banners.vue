<template>
  <div class="banners">
    <h2>{{ $t("banners.mainBanners") }}</h2>
    <div class="banners-section">
      <div class="savingBanners" v-if="savingBanners">Saving banners ...</div>
      <div style="marginbottom: 20px; padding: 55px 10px 10px">
        <div>
          <div class="loading">
            <Spinner v-if="loading" />
          </div>
        <div v-if="!loading" class="banners-container">

          <MainBanners
            
            :storeBanners="storeBanners"
            :banner="banner"
            v-for="(banner, index) of storeBanners"
            :key="index"
          />
        </div>
          <div v-if="storeBanners.length == 0">
            <p>{{ $t("banners.noBannersYet") }}</p>
          </div>
        </div>
        <button @click="onAdd" class="btn btn-dark">
          {{ $t("banners.addBanner") }}
        </button>
      </div>
      <div class="speed">
        <p>{{ $t("banners.speed") }}</p>
        <select v-model="speed" name="" id="">
          <option value="5" selected>5s</option>
          <option value="10">10s</option>
          <option value="15">15s</option>
          <option value="20">20s</option>
        </select>
      </div>
      <button @click="onSave" class="btn btn-dark" style="position: relative">
        {{ $t("save") }}
      </button>
      <div class="switcher">
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <h2>{{ $t("banners.throughBanner") }}</h2>
    <div class="banners-section">
      <ThroughBanner />
    </div>
    <h2>{{ $t("banners.newsDiscountBanners") }}</h2>
    <div class="banners-section">
      <div class="savingBanners" v-if="savingBanners">Saving banners ...</div>
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
          <p>{{ $t("banners.noBannersYet") }}</p>
        </div>
      </div>
      <button @click="onAdd2" class="btn btn-dark" style="margin-left: 10px">
        {{ $t("banners.addBanner") }}
      </button>

      <div class="speed">
        <p>{{ $t("banners.speed") }}</p>
        <select name="" id="">
          <option value="5" selected>5s</option>
          <option value="10">10s</option>
          <option value="15">15s</option>
          <option value="20">20s</option>
        </select>
      </div>
      <button @click="onSave2" class="btn btn-dark">{{ $t("save") }}</button>
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
import firebase from 'firebase'

export default {
  name: "Banners",
  components: {
    MainBanners,
    ThroughBanner,
    NewsDiscountBanners,
    Spinner,
  },
  data() {
    return {
      speed: ''
    }
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
    savingBanners() {
      return this.$store.getters.savingBanners;
    },
  },
  async mounted() {
    this.$store.dispatch("loadBanners");
    this.$store.dispatch("loadNDBanners");
    await firebase.database().ref('speed').once('value').then((data) => {
      this.speed = data.val()
    })
  },
  methods: {
    onAdd() {
      const banner = {
        ruSelectedFile: null,
        uaSelectedFile: null,
        ruImageUrl: "",
        uaImageUrl: "",
        url: "",
        text: ""
      };
      this.$store.dispatch("addBanner", banner);
    },
    onSave() {
      const banners = this.$store.getters.storeBanners;
      this.$store.dispatch("onBannersSave", banners);
      firebase.database().ref('speed').set(this.speed)
                .then(() => {
                    console.log("saved");
                })
                .catch((err) => console.log(err))
    },

    onAdd2() {
      const banner = {
        ruSelectedFile: null,
        uaSelectedFile: null,
        ruImageUrl: "",
        uaImageUrl: "",
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
.savingBanners {
  position: absolute;
    z-index: 100;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding-top: 30%;
    background: #ffffffa1;
    border-radius: 10px;
    font-size: 56px;
    font-weight: bold;
}
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
  max-width: 300px;
  width: 100%;
  max-height: 390px;
  height: 100%;
  align-items: center;
  position: relative;
  background: linear-gradient(30deg, #ffffff, #b5b5b552);
  box-shadow: 4px 5px 6px 3px;
}
.image {
  display: flex;
  align-items: center;
  padding: 10px;
  position: relative;
  width: 200px;
  margin: 0 auto;
}
.image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.image i {
  position: absolute;
  right: 12px;
  top: 10px;
  font-size: 26px;
  cursor: pointer;
  color: white;
}
.image i:hover {
  color: rgb(245, 0, 0);
}
.selectImage {
  margin: 0 auto;
}
.inputs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.inputs label {
  padding-right: 10px;
}
.remove-banner {
  position: absolute;
  right: 2px;
  top: 2px;
  font-size: 24px;
  cursor: pointer;
  z-index: 1;
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
  background: white;
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