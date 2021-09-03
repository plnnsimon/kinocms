<template>
  <div class="news">
    <div class="loader">
      <Spinner v-if="loading" />
    </div>
    <h2>{{ $t("sidebar.timetable") }}</h2>
    <div class="timetable">
      <label for="date">
        Дата
        <input v-model="date" type="date" id="date" />
      </label>
      <select name="" id="" v-model="selectedCinema">
        <option value="" disabled>Выберите кинотеатр</option>
        <option
          v-for="cinema in cinemas"
          :key="cinema.cinemaId"
          :value="cinema.cinemaId"
        >
          {{ getCinemaName(cinema) }}
        </option>
      </select>
      <select name="" id="" v-model="selectedHall">
        <option value="" disabled>Зал</option>
        <option
          v-for="(hall, index) in getCinemaHalls"
          :key="index"
          :value="hall.hallName"
        >
          {{ hall.hallName }}
        </option>
      </select>
      <select name="" id="" v-model="selectedMovie">
        <option value="" disabled>Фильм</option>
        <option
          v-for="movie in movies"
          :key="movie.filmId"
          :value="movie.filmId"
        >
          {{ getFilmName(movie) }}
        </option>
      </select>
      <select name="" id="" v-model="selectedType">
        <option value="" disabled>Формат</option>
        <option value="2D">2D</option>
        <option value="3D">3D</option>
        <option value="IMAX">IMAX</option>
      </select>

      <label for="time">
        Время
        <input v-model="time" type="time" id="time" />
      </label>
      <label for="price">
        Цена
        <input v-model="price" type="text" id="price" />
      </label>
      <button @click="addTimetable" class="btn btn-primary">
        {{ $t("add") }}
      </button>
    </div>
    <div class="table__container">
      <table class="table table-striped">
        <thead>
          <tr>
            <td>Дата</td>
            <td>Время</td>
            <td>Цена</td>
            <td>Тип кино</td>
            <td>Фильм</td>
            <td>Кинотеатр</td>
            <td>Зал</td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="table__body"
            v-for="(time, index) in timetable"
            :key="index"
          >
            <td>{{ time.date }}</td>
            <td>{{ time.time }}</td>
            <td>{{ time.price }} грн</td>
            <td>{{ time.type }}</td>
            <td>{{ getFilmName(getMovie(time.movie)) }}</td>
            <td>{{ time.cinema }}</td>
            <td>{{ time.hall }}</td>
            <i
              ref="editNewsInfo"
              @click="editTimetable(time)"
              class="fas fa-pen"
            ></i>
            <i
              @click="deleteTimetable(time)"
              class="fas fa-trash-alt"
              style="right: -60px"
            ></i>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="saveTimetable" class="btn btn-success">
      {{ $t("save") }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Spinner from "../components/Spinner";
import languageHelpers from "../mixins/languageHelpers";
import firebase from "firebase";

export default {
  name: "Timetable",
  components: {
    Spinner,
  },
  mixins: [languageHelpers],
  data() {
    return {
      isEditing: false,
      selectedCinema: "",
      selectedHall: "",
      selectedType: "",
      selectedMovie: "",
      date: "",
      time: "",
      price: "",
      timetable: [],
    };
  },
  created() {
    this.$store.dispatch("loadCinemas");
    this.$store.dispatch("loadMovies");
  },
  computed: {
    ...mapGetters(["loading", "movies", "cinemas"]),
    getCinemaHalls() {
      let cinema = this.cinemas.find(
        (el) => el.cinemaId == this.selectedCinema
      );
      if (cinema) {
        cinema = cinema.cinemaHalls;
        return cinema;
      }
      return cinema;
    },
  },
  async mounted() {
    await this.$store.dispatch("loadNews");
    await this.getTimetable();
  },
  methods: {
    editTimetable(item) {
      console.log(item);
    },
    deleteTimetable(item) {
      try {
        if(confirm("Delete ?")) {
          this.$timetable.filter(el => el == item);
        } else {
          return
        }
        
      } catch (err) {
        console.log(err);
      }
    },
    getTimetable() {
      try {
        firebase
          .database()
          .ref("timetable")
          .once("value")
          .then((data) => {
            const obj = data.val();
            for (let key in obj) {
              this.timetable.push({
                ...obj[key],
              });
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    saveTimetable() {
      try {
        this.timetable.forEach((el) => {
          firebase
            .database()
            .ref(`timetable/${this.date}`)
            .push(el)
            .then(() => alert("success"));
        });
      } catch (err) {
        console.log(err);
      }
    },
    getMovie(id) {
      return this.movies.find((el) => el.filmId == id);
    },
    addTimetable() {
      this.timetable.push({
        date: this.date,
        time: this.time,
        cinema: this.selectedCinema,
        hall: this.selectedHall,
        movie: this.selectedMovie,
        price: this.price,
        type: this.selectedType,
      });
      console.log(this.timetable);
    },
  },
};
</script>

<style scoped>
.table__body td:nth-child(2n) {
  background: white;
}
.timetable select {
  margin-right: 20px;
}
.news {
  position: relative;
  padding: 20px;
}
.news h2 {
  text-align: center;
  margin: 20px;
}
.loader {
  position: absolute;
  left: 50%;
  top: 200px;
}
.table__container {
  display: flex;
  justify-content: center;
  margin: 20 auto;
  max-width: 900px;
}
</style>