<template>
  <div class="page">
    <Spinner v-if="loading" />
    <div class="movies">
      <div v-for="movie in array" :key="movie.filmId" class="movie">
        <router-link
          :to="{ name: 'moviePage', params: { movieId: movie.filmId } }"
        >
          <p v-if="!movie.releaseDate">{{ $t('nowInCinema') }}</p>
          <p v-if="movie.releaseDate">{{ $t('since') }} {{ releaseDay(movie.releaseDate) }}</p>
          <div class="image">
            <img
              :src="getPick(movie.picture)"
              alt="movie"
            />
            <div class="film__types">
              <span v-if="movie.filmType.imax">IMAX</span>
              <span v-if="movie.filmType.threeD">3D</span>
              <span v-if="movie.filmType.twoD">2D</span>
            </div>
          </div>
          <p class="title">
            {{  getFilmName(movie) }}
          </p>
        </router-link>
        <button class="btn btn-success">
          <i class="fas fa-ticket-alt"></i>{{ $t("buy") }}
        </button>
      </div>
    </div>
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
    <div class="movie__advertisement">
      <ContextAdvertisement />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import languageHelpers from '../../../mixins/languageHelpers';
import pagination from '../../../mixins/pagination';
import Spinner from "../../Spinner.vue";
import ContextAdvertisement from "../../users-main-page/ContextAdvertisement.vue";
export default {
  components: {
    ContextAdvertisement,
    Spinner,
  },
  props: ["data"],
  mixins: [languageHelpers, pagination],
  beforeCreate() {
    this.$store.dispatch("loadMovies");
  },
  computed: {
    ...mapGetters([ "movies", "loading"]),
    getFilteredMovies() {
      if (this.data == true) {
        return this.movies.filter((el) => el.soonShawn);
      } else {
        return this.movies;
      }
    },
    array() {
      return this.setupPagination(this.getFilteredMovies)
    }
  },
  // beforeMount() {
    
  // },
  methods: {
    
    releaseDay(data) {
      if (this.lang == "ru") {
        return new Date(data).toLocaleString("ru-RU", {
          day: "numeric",
          month: "long",
        });
      } else {
        return new Date(data).toLocaleString("uk-UA", {
          day: "numeric",
          month: "long",
        });
      }
    },
  },
};
</script>

<style scoped>
.poster {
  background: white;
  overflow: hidden;
}
.main__top {
  background: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  float: right;
  padding: 10px 10px 0 0;
  position: relative;
}
.socials {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
.socials i {
  font-size: 40px;
  cursor: pointer;
  color: black;
}
.socials i:hover {
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 4px rgb(0, 0, 0);
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.contacts p {
  font-weight: 700;
  padding: 0;
  margin: 0;
}
.logo {
  position: absolute;
  left: 20px;
  top: 20px;
}
.logo i {
  font-size: 60px;
  text-shadow: 5px 7px 8px rgb(0 0 0);
}
.footer {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
}
.movie__advertisement {
  position: absolute;
  left: 10px;
  top: 20%;
}
.poster__main {
  padding: 100px 0 180px 250px;
}
.movies {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding: 20px 0 20px 10px;
  color: white;
}
.page {
  background: #181f42;
}
.movie {
  margin-right: 40px;
}
.movie p {
  text-align: center;
}
.image {
  position: relative;
}
.image img {
  width: 100%;
  max-height: 280px;
  max-width: 190px;
  transition: all ease 0.5s;
  opacity: 1;
  box-shadow: 6px 5px 5px 2px rgba(0, 0, 0, 0.527);
  border-radius: 10px;
}
.image img:hover {
  opacity: 0.8;
  cursor: pointer;
}
.film__types {
  position: absolute;
  top: 10px;
  right: -30px;
  display: flex;
  flex-direction: column;
}
.film__types span {
  border: 1px solid white;
  color: white;
  background: linear-gradient(208deg, #ed00ff, #473a3ac0);
  border-radius: 15px;
  padding: 3px;
  margin-bottom: 5px;
  text-decoration: underline;
  font-weight: bold;
  text-align: center;
}
.film__types span:nth-child(1) {
  background: linear-gradient(208deg, #0004ff, #473a3abb);
}
.film__types span:nth-child(2) {
  background: linear-gradient(208deg, #00ff37, #473a3ab6);
}
.movie button i {
  transform: rotate(135deg);
  margin-right: 5px;
}
.title {
  margin: 10px;
  font-size: 20px;
  font-weight: 400;
}
a {
  color: inherit;
  text-decoration: none;
}
</style>