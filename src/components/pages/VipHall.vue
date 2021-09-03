<template>
  <div class="news-page">
    <div class="switcher">
      <p>Статус:</p>
      <label class="switch">
        <input v-model="vipHall.checked" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <div class="container">
      <div class="news-top-section">
        <div class="film-name">
          <label for="film-name">{{ $t("name") }}</label>
          <input
          v-if="lang == 'ru'"
            v-model="vipHall.ruTitle"
            type="text"
            id="film-name"
            :placeholder='$t("name")'
          />
          <input
          v-else
            v-model="vipHall.uaTitle"
            type="text"
            id="film-name"
            :placeholder='$t("name")'
          />
        </div>
      </div>

      <div class="description">
        <label for="film-description">{{ $t("description") }}</label>
        <textarea
        v-if="lang == 'ru'"
          v-model="vipHall.ruDescription"
          type="text"
          id="film-description"
          :placeholder="$t('description')"
        ></textarea>
        <textarea
        v-else
          v-model="vipHall.uaDescription"
          type="text"
          id="film-description"
          :placeholder="$t('description')"
        ></textarea>
      </div>
      <div class="main-picture">
        <p>{{ $t("mainImage") }}</p>
        <img :src="vipHall.picture.imageUrl" alt="picture" />
        <input
          type="file"
          style="display: none"
          ref="fileInput"
          @change="(event) => onFileSelected(event, vipHall.picture)"
        />
        <button @click="onPickFile" class="btn btn-primary">
          {{ $t("add") }}
        </button>
        <button @click="removeImage(vipHall.picture)" class="btn btn-danger">
          {{ $t("delete") }}
        </button>
      </div>
      <div class="picture-gallery">
        <p>{{ $t("imageGallery") }}</p>
        <div class="images">
          <div
            class="gallery-image"
            v-for="(image, index) in vipHall.imageGallery"
            :key="index"
          >
            <i
              class="fas fa-trash-alt"
              @click="removeGalleryImage(index)"
              v-if="vipHall.imageGallery[index].imageUrl"
            ></i>
            <input
              :index="index"
              v-if="!vipHall.imageGallery[index].imageUrl"
              type="file"
              @change="onGalleryImageSelected(index)"
              ref="galleryImageFile"
            />
            <img
              v-if="vipHall.imageGallery[index].imageUrl"
              :src="vipHall.imageGallery[index].imageUrl"
            />
          </div>
        </div>

        <button @click="addImage" class="btn btn-primary">
          {{ $t("add") }}
        </button>
      </div>
     <SeoBlock :item="vipHall" />
      <div class="buttons">
        <button @click="savePage" class="btn btn-primary">{{ $t("save") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import onFileSelected from '../../mixins/onFileSelected';
import SeoBlock from '../SeoBlock.vue';
export default {
  components: { SeoBlock },
  name: "NewsPage",
  mixins: [onFileSelected],
  data() {
    return {
      vipHall: {
        ruPageName: 'VIP зал',
        uaPageName: 'VIP залa',
        imageGallery: [],
        checked: false,
        picture: {
          selectedFile: null,
          imageUrl: ''
        },
        ruTitle: "",
        uaTitle: "",
        creationDate: new Date().toLocaleDateString(),
        ruDescription: "",
        uaDescription: "",
        trailerLink: "",
        isEditing: false,
        seo: {
          url: "",
          title: "",
          keywords: "",
          description: "",
        },
      },
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },},
  methods: {
    addImage() {
      this.vipHall.imageGallery.push({
        imageUrl: "",
      });
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    // onFileSelected(event) {
    //   const files = event.target.files;
    //   this.vipHall.picture.selectedFile = files[0].name;
    //   if (this.vipHall.picture.selectedFile.indexOf(".") <= 0) {
    //     return alert("Please add a valid file");
    //   }
    //   const fileReader = new FileReader();
    //   fileReader.addEventListener("load", () => {
    //     this.vipHall.picture.imageUrl = fileReader.result;
    //   });
    //   fileReader.readAsDataURL(files[0]);
    //   this.vipHall.picture.image = files[0];
    // },
    removeImage() {
      this.vipHall.picture.imageUrl = "";
    },
    onGalleryImageSelected(index) {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.vipHall.imageGallery[index].imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(this.$refs.galleryImageFile[0].files[0]);
    },
    removeGalleryImage(index) {
      this.vipHall.imageGallery.splice(index, 1);
    },
    savePage() {
      this.$store.dispatch("addPage", this.vipHall);
    },
  },
};
</script>

<style scoped>
.news-page {
  min-height: 709.021px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.container {
  display: flex;
  flex-direction: column;
}
label {
  margin-right: 15px;
}
.film-name {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.film-name input {
  width: 300px;
}
.description {
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.description textarea {
  width: 100%;
  min-height: 200px;
}
.main-picture {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.main-picture button {
  height: 40px;
}
.picture-gallery {
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.picture-gallery button {
  height: 40px;
  width: 100px;
}
.images {
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 30px;
}
.gallery-image {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 200px;
}
.gallery-image i {
  align-self: flex-end;
  margin: 5px;
  font-size: 25px;
  cursor: pointer;
}
.gallery-image i:hover {
  color: rgb(92, 92, 92);
}
.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.trailer {
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0 0 0 / 50%);
}
.trailer input {
  width: 80%;
}
.buttons {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.buttons :nth-child(1) {
  margin-right: 20px;
}
.news-top-section {
  display: flex;
  justify-content: space-between;
}
.date-input {
  justify-content: space-between;
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.date-input p {
  margin-right: 10px;
}
.switcher {
  align-self: flex-end;
  display: flex;
  width: 150px;
  justify-content: space-between;
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
</style>