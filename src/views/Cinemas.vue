<template>
  <div>
    <div class="cinemas-container">
      <div class="loader">
        <Spinner v-if="loading" />
      </div>
      <h2>Список кинотеатров</h2>
      <div v-for="cinema in cinemas" :key="cinema.cinemaId" class="cinemas">
        <CinemaPopupInfo
          @changePopupStatus="isPopupVisible = $event"
          v-if="isPopupVisible"
          :cinema="cinema"
        />
        <div
          @click="getInfo"
          @mouseenter="removeCinema = true"
          @mouseleave="removeCinema = false"
          class="cinema"
        >
          <i
            v-if="removeCinema"
            @click="onRemoveCinema(cinema)"
            class="fas fa-trash"
          ></i>
          <img :src="cinema.logo" alt="logo" />
          <h3>{{ cinema.cinemaName }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
import CinemaPopupInfo from "../components/cinemas/CinemaPopupInfo";

export default {
  name: "Cinemas",
  data() {
    return {
      removeCinema: false,
      isPopupVisible: false,
    };
  },
  components: {
    Spinner,
    CinemaPopupInfo,
  },
  computed: {
    cinemas() {
      return this.$store.getters.cinemas;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  mounted() {
    this.$store.dispatch("loadCinemas");
  },
  methods: {
    getInfo() {
      if (!this.filmCard) {
        this.isPopupVisible = true;
      }
    },
    onRemoveCinema(cinema) {
      if (confirm("Are you sure ?")) {
        this.filmCard = true;
        try {
          this.$store.dispatch("removeCinema", cinema.cinemaId);
          this.$store.dispatch("loadCinemas");
        } catch (err) {
          console.log(err);
        }
      } else {
        this.isPopupVisible = true;
      }
    },
  },
};
</script>

<style scoped>
.cinemas-container {
  padding: 20px;
  position: relative;
}
.loader {
  position: absolute;
  left: 50%;
  top: 100px;
}
.cinemas-container h2 {
  text-align: center;
}
.cinemas {
  display: flex;
  flex-flow: row wrap;
}
.cinema {
  cursor: pointer;
  width: 200px;
  margin-right: 20px;
  position: relative;
}
.cinema img {
  transition: all ease 0.5s;
  opacity: 1;
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