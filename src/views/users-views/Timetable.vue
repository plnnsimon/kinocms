<template>
  <div class="page">
    <div>
      
      <select name="" id="" v-model="selectedCinema">
          <option value="">{{ $t('cinema') }}</option>
          <option
            v-for="cinema in cinemas"
            :key="cinema.cinemaId"
            :value="cinema.cinemaId"
          >
            {{ getCinemaName(cinema) }}
          </option>
        </select>
      <select name="" id="" v-model="selectedData">
          <option value="">Дата</option>
          <option
             v-for="(time, index) in getWeek()" :key="index"
          >
            {{ time.weekday }}
          </option>
        </select>
        <select name="" id="" v-model="selectedMovie">
        <option value="">{{ $t('timetableList.moviesAll') }}</option>
        <option
          v-for="movie in movies"
          :key="movie.filmId"
          :value="movie.filmId"
        >
          {{ getFilmName(movie) }}
        </option>
      </select>
      <select name="" id="" v-model="selectedHall">
          <option value="">{{ $t('timetableList.halls') }}</option>
          <option
            v-for="(hall, index) in getCinemaHalls"
            :key="index"
            :value="hall.hallName"
          >
            {{ hall.hallName }}
          </option>
        </select>
    </div>
    <div v-for="(time, index) in getFilteredTimeListArray(selectedData)" :key="index" class="timetable">
      <h3>{{ time.day }} {{ time.month }}, {{ time.weekday }}</h3>
      
      <table>
        <thead>
          <tr>
            <td>{{ $t('timetableList.time') }}</td>
            <td>{{ $t('timetableList.movie') }}</td>
            <td>Зал</td>
            <td>{{ $t('timetableList.price') }} в грн.</td>
            <td>{{ $t('timetableList.book') }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in getFilteredFilmsArray(timetable, time, selectedCinema, selectedHall, selectedMovie)" :key="index">
            <td>{{item.time}}</td>
            <td>{{getFilmName(getMovie(item.movie))}}</td>
            <td>{{item.hall}}</td>
            <td>{{item.price}}</td>
            <td><i class="fas fa-ticket-alt"></i></td>
          </tr>
        </tbody>
        <Spinner v-if="loading" />
          <p v-if="filteredTimetable(time).length <= 0 && !loading">
            {{ $t('noFilmsYet') }}
          </p>
          <p v-if="getFilteredFilmsArray(timetable, time, selectedCinema, selectedHall, selectedMovie).length <= 0 && filteredTimetable(time).length > 0">
            {{ $t('noMatchingFound') }}
          </p>
      </table>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase";
import languageHelpers from '../../mixins/languageHelpers';
import { mapGetters } from 'vuex';
import Spinner from '../../components/Spinner.vue';
export default {
  mixins: [languageHelpers],
  components: {
    Spinner
  },
  data() {
    return {
      selectedCinema: '',
      selectedHall: '',
      selectedMovie: '',
      selectedData: '',
    }
  },
  computed: {
    
    ...mapGetters(['cinemas', 'loading', 'movies']),
    isCinema() {
      if (this.selectedCinema == '') {
        return this.selectedHall == ''
      }
      console.log('isCinema');
      return this.selectedCinema
    },
    
    getCinemaHalls() {
      let cinema = this.cinemas.find((el) => {
        return el.cinemaId == this.selectedCinema;
      });
      if (cinema) {
        cinema = cinema.cinemaHalls;
        return cinema;
      } else {
        return cinema = ''
      }
    },
  },
  async mounted() {
    this.$store.dispatch('loadCinemas')
    this.$store.dispatch('loadMovies')
    await this.getTimetable()
  },
  methods: {
    getMovie(id) {
      return this.movies.find((el) => el.filmId == id);
    },
    getCinema(id) {
      return this.cinemas.find((el) => el.cinemaId == id);
    },
  }
};
</script>

<style scoped>
.page {
  padding: 100px 10px 180px;
  margin-right: 250px;
  height: 100%;
  top: 204px;
  color: rgb(255, 255, 255);
}
.timetable {
  color: black;
  border: 3px solid #ff6e00;
    padding: 10px;
    max-width: 500px;
    margin: 0 auto 20px;
}
.timetable table {
  margin: 0;
}
.timetable table td {
  border-bottom: 1px solid;
}
.timetable table tr {
  height: 35px;
}
.timetable table thead tr td {
  padding-right: 30px;
  font-weight: 700;
}
.timetable table tbody tr td:nth-child(2) {
  text-decoration: underline;
}
.timetable i {
  color: black;
  font-size: 20px;
  cursor: pointer;
}
.timetable i:hover {
  color: rgba(0, 0, 0, 0.536);
  font-size: 20px;
}
</style>