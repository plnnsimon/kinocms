<template>
  <div>
    <div class="cinemas-container">
      <div class="loader">
        <Spinner v-if="loading" />
      </div>
      <h2>{{ $t("cinemas.cinemasList") }}</h2>
      <CinemaPopupInfo
        @changePopupStatus="isPopupVisible = $event"
        v-if="isPopupVisible"
        :cinema="cinema"
      />
      <EditCinemaPage
        @changePopupStatus="isEditCinema = $event"
        v-if="isEditCinema"
        :cinema="cinema"
        :isHallEditing="isHallEditing"
        @updatedCinemaPage="updatedCinemaPage"
        @cancelEditingCinema="cancelEditingCinema"
      />
      <div class="cinemas">
        <div v-for="cinema in cinemas" :key="cinema.cinemaId">
          <Cinema
            @onRemoveCinema="onRemoveCinema"
            @editCinema="editCinema"
            :cinema="cinema"
            @getInfo="getInfo"
            :loading="loading"
          />
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
import CinemaPopupInfo from "../components/cinemas/CinemaPopupInfo";
import EditCinemaPage from "../components/cinemas/EditCinemaPage";
import Cinema from "../components/cinemas/Cinema.vue";

export default {
  name: "Cinemas",
  data() {
    return {
      removeCinema: false,
      editCinemaIcon: false,
      isPopupVisible: false,
      isEditCinema: false,
      isHallEditing: false,
      cinema: null,
    };
  },
  components: {
    Spinner,
    CinemaPopupInfo,
    EditCinemaPage,
    Cinema,
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
    cancelEditingCinema(data) {
      this.isEditCinema = data;
    },
    getInfo(data) {
      if (!this.filmCard) {
        this.isPopupVisible = true;
        this.cinema = data;
      }
    },
    onRemoveCinema(data) {
      if (confirm("Are you sure ?")) {
        this.filmCard = true;
        try {
          this.$store.dispatch("removeCinema", data.cinemaId);
          this.$store.dispatch("loadCinemas");
        } catch (err) {
          console.log(err);
        }
      } else {
        this.isPopupVisible = true;
      }
    },
    editCinema(data) {
      if (confirm("Edit ?")) {
        this.cinema = data;
        this.isEditCinema = true;
        this.isHallEditing = true;
      }
    },
    updatedCinemaPage(data) {
      this.isEditCinema = data;
    },
  },
};
</script>

<style scoped>
.editCinema {
  margin-right: 20px;
}
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