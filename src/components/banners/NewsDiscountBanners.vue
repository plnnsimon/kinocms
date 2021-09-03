<template>
  <div class="banner">
    <div class="banner-item">
      <i class="fas fa-window-close remove-banner" @click="removeBanner"></i>
      <div
        @mouseover="removeImageIcon = true"
        @mouseleave="removeImageIcon = false"
        class="image"
      >
        <i
          v-if="removeImageIcon"
          class="fas fa-times"
          @click="removeImage(banner, lang)"
        ></i>
        <img
          :src="getPick(banner, lang)"
          height="150"
        />
      </div>
      <div class="selectImage">
        <button
          v-if="!banner.uaImageUrl && lang == 'ua'"
          class="btn btn-secondary mt-2"
          @click="onPickFile"
        >
          {{ $t("banners.chooseImage") }}
        </button>
        <button
          v-if="!banner.ruImageUrl && lang == 'ru'"
          class="btn btn-secondary mt-2"
          @click="onPickFile"
        >
          {{ $t("banners.chooseImage") }}
        </button>
        <input
          v-if="lang == 'ru'"
          type="file"
          @change="(event) => onFileSelected(event, banner, lang)"
          style="display: none"
          ref="fileInput"
        />
        <input
          v-else-if="lang == 'ua'"
          type="file"
          @change="(event) => onFileSelected(event, banner, lang)"
          style="display: none"
          ref="fileInput"
        />
      </div>
      <div class="inputs">
        <label for="url">URL:</label>
        <input
          v-if="lang == 'ru'"
          class="form-control"
          type="text"
          name="url"
          placeholder="URL"
          v-model="banner.ruUrl"
        />
        <input
          v-else
          class="form-control"
          type="text"
          name="url"
          placeholder="URL"
          v-model="banner.uaUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import languageHelpers from '../../mixins/languageHelpers';
import OnFileSelected from "../../mixins/onFileSelected";
export default {
  name: "MainBanners",
  props: ["storeNDBanners", "banner"],
  mixins: [OnFileSelected, languageHelpers],
  data() {
    return {
      removeImageIcon: false,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    removeBanner() {
      this.storeNDBanners.splice(this.storeNDBanners.indexOf(this.banner), 1);
    },
  },
};
</script>

<style>
</style>