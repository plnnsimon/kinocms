<template>
  <div class="banner">
    <div class="banner-item">
      <i class="far fa-times-circle remove-banner" @click="removeBanner"></i>
      <div class="image" v-if="banner.imageUrl">
        <i class="far fa-times-circle" @click="removeImage"></i>
        <img :src="banner.imageUrl" height="150" />
      </div>
      <div class="selectImage">
        <button class="btn btn-secondary mt-2" @click="onPickFile">
          Choose image
        </button>
        <input
          type="file"
          @change="onFileSelected"
          style="display: none"
          ref="fileInput"
        />
      </div>
      <div class="inputs">
        <label for="url">URL:</label>
        <input
          type="text"
          name="url"
          placeholder="URL"
          v-model="banner.url"
        />
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  name: "MainBanners",
  props: ["storeNDBanners", "banner"],
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      const files = event.target.files;
      this.banner.selectedFile = files[0].name;
      console.log(this.banner.selectedFile);
      if (this.banner.selectedFile.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.banner.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.banner.image = files[0];
      console.log(this.banner);
    },
    removeImage() {
      this.banner.image = null;
    },
    removeBanner() {
      this.storeNDBanners.splice(this.storeNDBanners.indexOf(this.banner), 1)
    },
  },
};
</script>

<style>
</style>