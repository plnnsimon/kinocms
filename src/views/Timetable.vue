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
          <tr class="table__body" v-for="(time, index) in array" :key="index">
            <td>{{ time.date }}</td>
            <td>{{ time.time }}</td>
            <td>{{ time.price }} грн</td>
            <td>{{ time.type }}</td>
            <td>{{ getFilmName(getMovie(time.movie)) }}</td>
            <td>{{ getCinemaName(getCinema(time.cinema)) }}</td>
            <td>{{ time.hall }}</td>
            <i
              ref="editNewsInfo"
              @click="(event) => editTimetable(event, time)"
              class="fas fa-pen"
            ></i>
            <i
              @click="deleteTimetable(time)"
              class="fas fa-trash-alt"
              style="right: -60px"
            ></i>
          </tr>
        </tbody>
        <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Пред'"
          :next-text="'След'"
          :container-class="'myPagination'"
          :page-class="'item'"
          :prev-class="'prev'"
          :next-class="'next'"
        />
      </table>
      <div class="editing__timetable" v-if="isEditing">
        <label for="date">
          Дата
          <input v-model="updatedItem.date" type="date" id="date" />
        </label>
        <select name="" id="" v-model="updatedItem.cinema">
          <option value="" disabled>Выберите кинотеатр</option>
          <option
            v-for="cinema in cinemas"
            :key="cinema.cinemaId"
            :value="cinema.cinemaId"
          >
            {{ getCinemaName(cinema) }}
          </option>
        </select>
        <select name="" id="" v-model="updatedItem.hall">
          <option value="" disabled>Зал</option>
          <option
            v-for="(hall, index) in getUpdatedCinemaHalls"
            :key="index"
            :value="hall.hallName"
          >
            {{ hall.hallName }}
          </option>
        </select>
        <select name="" id="" v-model="updatedItem.movie">
          <option value="" disabled>Фильм</option>
          <option
            v-for="movie in movies"
            :key="movie.filmId"
            :value="movie.filmId"
          >
            {{ getFilmName(movie) }}
          </option>
        </select>
        <select name="" id="" v-model="updatedItem.type">
          <option value="" disabled>Формат</option>
          <option value="2D">2D</option>
          <option value="3D">3D</option>
          <option value="IMAX">IMAX</option>
        </select>

        <label for="time">
          Время
          <input v-model="updatedItem.time" type="time" id="time" />
        </label>
        <label for="price">
          Цена
          <input v-model="updatedItem.price" type="text" id="price" />
        </label>
        <button @click="updateTimetable(updatedItem)" class="btn btn-success">
          {{ $t("update") }}
        </button>
        <i @click="closeEditing" class="fas fa-window-close"></i>
      </div>
    </div>
    <button
      @click="saveTimetable"
      :disabled="isEditing"
      class="btn btn-success"
    >
      {{ $t("save") }}
    </button>
    {{ (savedTime / timetable.length || 0) * 100 }} %
    <transition name="fade" appear>
      <div v-if="isSuccess" class="popup__message">
        <p>Updated successfully</p>
        <i class="far fa-check-circle"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Spinner from "../components/Spinner";
import languageHelpers from "../mixins/languageHelpers";
import firebase from "firebase";
import pagination from "../mixins/pagination";

export default {
  name: "Timetable",
  components: {
    Spinner,
  },
  mixins: [languageHelpers, pagination],
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
      updatedItem: null,
      savedTime: 0,
      timetableFromFirebase: false,
      isSuccess: false,
    };
  },
  created() {
    this.$store.dispatch("loadCinemas");
    this.$store.dispatch("loadMovies");
  },
  computed: {
    ...mapGetters(["loading", "movies", "cinemas"]),
    array() {
      return this.setupPagination(this.timetable);
    },
    getCinemaHalls() {
      let cinema = this.cinemas.find((el) => {
        return el.cinemaId == this.selectedCinema;
      });
      if (cinema) {
        cinema = cinema.cinemaHalls;
        return cinema;
      }
      return cinema;
    },
    getUpdatedCinemaHalls() {
      let cinema = this.cinemas.find((el) => {
        return el.cinemaId == this.updatedItem.cinema;
      });
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
    closeEditing(e) {
      this.isEditing = false;
      let arr =
        e.target.offsetParent.childNodes[3].childNodes[0].childNodes[1]
          .childNodes;
      arr.forEach((el) => {
        el.classList.forEach((elem) => {
          if (elem == "editing") {
            el.classList.remove("editing");
          }
        });
      });
    },
    editTimetable(event, item) {
      event.target.parentNode.classList.add("editing");
      this.isEditing = true;
      this.updatedItem = item;
    },
    deleteTimetable(item) {
      try {
        if (confirm("Delete ?")) {
          this.timetable.splice(this.timetable.indexOf(item), 1);
          firebase
            .database()
            .ref(`timetable`)
            .child(item.id)
            .remove()
            .then(() => console.log("item removed"));
        } else {
          return;
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
            if (obj != null) {
              this.timetableFromFirebase = true;
              for (let key in obj) {
                this.timetable.push({
                  id: key,
                  ...obj[key],
                });
              }
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    saveTimetable() {
      try {
        firebase
          .database()
          .ref(`timetable`)
          .set(this.timetable)
          .then(() => {
            this.timetable.forEach((el) => {
              console.log(el);
              this.savedTime += 1;
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    updateTimetable(el) {
      try {
        firebase
          .database()
          .ref(`timetable`)
          .child(el.id)
          .update(el)
          .then(() => {
            this.isSuccess = true;
            setTimeout(() => {
              this.isSuccess = false;
            }, 5000);
          });
      } catch (err) {
        console.log(err);
      }
    },
    getMovie(id) {
      return this.movies.find((el) => el.filmId == id);
    },
    getCinema(id) {
      return this.cinemas.find((el) => el.cinemaId == id);
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
    },
  },
};
</script>

<style scoped>
.table__body td {
  border-right: 1px solid;
}
.editing {
  background: rgba(0, 255, 0, 0.616) !important;
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
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin: 20 auto;
  max-width: 900px;
}
.editing__timetable .fas {
  font-size: 26px;
}
.fas:hover {
  color: gray;
  cursor: pointer;
}
.popup__message {
  display: flex;
  border-radius: 10px;
  border: 1px solid white;
  position: fixed;
  bottom: 10%;
  width: 230px;
  height: 70px;
  font-size: 20px;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px black;
  background: rgb(20, 168, 0);
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  z-index: 10;
}
.popup__message p {
  margin: 0;
  padding: 0;
}
.popup__message i {
  font-size: 40px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity ease 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>