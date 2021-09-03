<template>
  <div
    v-if="!loading"
    @click="getInfo(cinema)"
    @mouseenter="
      removeCinema = true;
      editCinemaIcon = true;
    "
    @mouseleave="
      removeCinema = false;
      editCinemaIcon = false;
    "
    class="cinema"
  >
    <i
      v-if="removeCinema"
      @click="onRemoveCinema(cinema)"
      class="fas fa-trash"
    ></i>
    <i
      v-if="editCinemaIcon"
      @click.stop="editCinema(cinema)"
      class="fas fa-edit"
      :class="{ editCinema: editCinemaIcon }"
    ></i>
    <img :src="cinema.logo.imageUrl" alt="logo" />
    <h3>{{ getName }}</h3>
  </div>
</template>

<script>
import languageHelpers from '../../mixins/languageHelpers';
export default {
  name: "Cinema",
  props: ["cinema", 'loading'],
  mixins: [languageHelpers],
  data() {
    return {
      removeCinema: false,
      editCinemaIcon: false,
      isPopupVisible: false,
      isEditCinema: false,
      isHallEditing: false,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    getName() {
      if (this.lang == 'ru') {
        return this.cinema.ruCinemaName
      } else {
        return this.cinema.uaCinemaName
      }
    }
  },
  methods: {
    onRemoveCinema(cinema) {
      this.$emit("onRemoveCinema", cinema);
    },
    getInfo(cinema) {
        this.$emit('getInfo', cinema)
    },
    editCinema(cinema){
        this.$emit('editCinema', cinema)
    }
  },
};
</script>

<style scoped>
.editCinema {
  margin-right: 20px;
}
.cinema {
  cursor: pointer;
  width: 200px;
  margin-right: 20px;
  position: relative;
}
.cinema h3 {
  margin: 10px;
}
.cinema img {
  transition: all ease 0.5s;
  opacity: 1;
  box-shadow: 6px 5px 5px 2px;
}
.cinema img:hover {
  transition: all ease 0.5s;
  opacity: 0.6;
}
.cinema i {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  z-index: 9;
}
.cinema i:hover {
  color: rgb(92, 92, 92);
}
.cinema img {
  width: 100%;
  object-fit: cover;
}
</style>