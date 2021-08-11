<template>
  <div class="second-section">
    <div class="loader">
      <Spinner v-if="loading" />
    </div>
    <div class="radio-buttons">
      <div class="radio-btn">
        <label for="background">{{ $t('banners.photoBack') }}</label>
        <input type="radio" name="background" />
      </div>
      <div class="radio-btn">
        <label for="simple">{{ $t('banners.simpleBack') }}</label>
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
      <button @click="onPickFile" class="btn btn-primary">{{ $t('add') }}</button>
      <button @click="removeImage" class="btn btn-danger">{{ $t('delete') }}</button>
    </div>
  </div>
</template>

<script>
import Spinner from "../Spinner.vue";
import firebase from "firebase";
export default {
  name: "ThroughBanner",
  components: {
    Spinner,
  },
  data() {
    return {
      loading: false,
      background: null,
      selectedFile: null,
      backgroundImageUrl: "",
      imageUrl: "",
    };
  },
  mounted() {
    this.loading = true;
    firebase
      .database()
      .ref("Pictures")
      .once("value")
      .then((data) => {
        if (data.val() != null) {
          this.backgroundImageUrl = data.val().Link;
          this.imageUrl = data.val().Url;
          this.loading = false;
        } else {
          this.loading = false;
        }
      });
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
      let storageRef = firebase
        .storage()
        .ref("throughBanner/" + this.selectedFile);
      let uploadImage = storageRef.put(this.background);

      uploadImage.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.imageUrl = downloadURL;
            firebase.database().ref("Pictures").set({
              Name: this.selectedFile,
              Link: this.backgroundImageUrl,
              Url: this.imageUrl,
            });
          });
        }
      );
    },
    removeImage() {
      console.log(this.imageUrl);
      firebase
        .storage()
        .refFromURL(this.imageUrl)
        .delete()
        .then(() => {
          console.log("success");
        })
        .catch((err) => {
          console.log(err);
        });
      firebase.database().ref("Pictures").remove();
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
.photo-add-container img {
  max-width: 500px;
  width: 100%;
  object-fit: contain;
}
.loader {
  position: absolute;
  top: 40%;
  left: 50%;
}
</style>