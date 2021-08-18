<template>
  <div class="banner">
    <div class="banner-item">
      <i class="fas fa-window-close remove-banner" @click="removeBanner"></i>
      <div
        @mouseover="removeImageIcon = true"
        @mouseleave="removeImageIcon = false"
        class="image"
        v-if="banner.imageUrl"
      >
        <i
          v-if="removeImageIcon"
          class="fas fa-times"
          @click="removeImage"
          :class="{ removeImage: removeImageIcon }"
        ></i>
        <img :src="banner.imageUrl" height="150" />
      </div>
      <div v-if="!banner.imageUrl" class="selectImage">
        <button class="btn btn-secondary mt-2" @click="onPickFile">
          {{ $t("banners.chooseImage") }}
        </button>
        <input
          type="file"
          @change="onFileSelected"
          style="display: none"
          ref="fileInput"
        />
      </div>
      <div class="inputs-group">
        <div class="inputs">
          <label for="url">URL:</label>
          <input
            class="form-control"
            type="text"
            name="url"
            placeholder="URL"
            v-model="banner.url"
          />
        </div>
        <div class="inputs">
          <label for="url">Текст:</label>
          <input
            class="form-control"
            type="text"
            name="text"
            placeholder="text"
            v-model="banner.text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainBanners",
  props: ["storeBanners", "banner"],
  data() {
    return {
      removeImageIcon: false,
    };
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      const files = event.target.files;
      this.banner.selectedFile = files[0].name;
      if (this.banner.selectedFile.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.banner.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
    },
    removeImage() {
      this.banner.imageUrl = null;
    },
    removeBanner() {
      this.storeBanners.splice(this.storeBanners.indexOf(this.banner), 1);
    },
  },
};
</script>

<style>
</style>