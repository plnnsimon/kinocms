<template>
  <div class="second-section">
    <div class="radio-buttons">
      <div class="radio-btn">
        <label for="background">Фото на фоне</label>
        <input type="radio" name="background" />
      </div>
      <div class="radio-btn">
        <label for="simple">Простой фон</label>
        <input type="radio" name="background" />
      </div>
    </div>
    <div class="photo-add-container">
      <img :src="backgroundImageUrl" alt="" />
      <input
        type="file"
        @change="onFileSelected"
        style="display: none"
        ref="fileInput"
      />
      <button @click="onPickFile" class="btn btn-primary">Добавить</button>
      <button @click="removeImage" class="btn btn-danger">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThroughBanner",
  props: ["banners", "banner"],
  data() {
    return {
      background: null,
      selectedFile: null,
      backgroundImageUrl: "",
    };
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      const files = event.target.files;
      this.selectedFile = files[0].name;
      if (this.selectedFile.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.backgroundImageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.background = files[0];
    },
    removeImage() {
      this.backgroundImageUrl = null;
    },
  },
};
</script>

<style>
.second-section {
  display: flex;
  justify-content: space-between;
  min-height: 400px;
}
.radio-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 200px;
}
.radio-btn label {
  margin-right: 10px;
}
.second-section button {
  height: 40px;
}
.photo-add-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
}
</style>