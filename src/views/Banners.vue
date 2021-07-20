<template>
  <div class="banners">
    <h2 style="margin: 0 auto;">На главной верх</h2>
    <div class="first-banners-section">
      <div style="marginbottom: 20px; padding: 10px">
        <div class="banners-container">
          <Banner
            :banners="banners"
            :banner="banner"
            v-for="(banner, index) of banners"
            :key="index"
          />
        </div>
        <button @click="onAdd()" class="btn btn-dark">Add Banner</button>
      </div>
      <button @click="onSave" class="btn btn-dark">Save</button>
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
import Banner from "../components/banners/Banner";

export default {
  name: "Banners",
  components: {
    Banner,
  },
  data() {
    return {
      banners: [],
    };
  },
  mounted() {
    const data = localStorage.getItem("banners");
    if (data) {
      this.banners = JSON.parse(data);
    }
  },
  methods: {
    removeImage() {
      this.banners.image = null;
    },
    onAdd() {
      this.banners.push({
        selectedFile: null,
        imageUrl: "",
        image: null,
        url: "",
        text: "",
      });
    },
    onSave() {
      localStorage.setItem("banners", JSON.stringify(this.banners));
      console.log("saved");
    },
  },
};
</script>

<style>
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
.first-banners-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  position: relative;
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
</style>