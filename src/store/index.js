import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import firebase from "firebase"
import router from '../router'
// import login from './modules/login'
Vue.prototype.$axios = axios;

Vue.use(Vuex)

const firebaseConfig = {
  apiKey: "AIzaSyDqemGHgKb_JUWqC5_T1YhA-xydruFigKQ",
  authDomain: "kinocms-43f31.firebaseapp.com",
  projectId: "kinocms-43f31",
  storageBucket: "gs://kinocms-43f31.appspot.com",
  messagingSenderId: "476797615031",
  appId: "1:476797615031:web:62073167c0e88b0ee00632"
};

firebase.initializeApp(firebaseConfig);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loading: false,
    storeBanners: [],
    storeNDBanners: [],
    movies: [],
    isPopupVisible: false,
    cinemas: []
  },
  mutations: {
    setCinemas(state, payload) {
      state.cinemas = payload
    },
    addCinema(state, payload) {
      state.cinemas.push(payload)
    },
    setIsLoggedIn(state, payload) {
      state.isLoggedIn = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setLoadedBanners(state, payload) {
      state.storeBanners = payload
    },
    setLoadedNDBanners(state, payload) {
      state.storeNDBanners = payload
    },
    setMovies(state, payload) {
      state.movies = payload
    },
    addBanner(state, payload) {
      state.storeBanners.push(payload)
    },
    addNDBanner(state, payload) {
      state.storeNDBanners.push(payload)
    },
    addMovie(state, payload) {
      state.movies.push(payload)
    },
    setPopupInfo(state, payload) {
      state.isPopupVisible = payload
    },
    removeMovie(state, payload) {
      state.movies.filter(el => el != payload)
    },
    removeCinema(state, payload) {
      state.cinemas.filter(el => el != payload)
    }
  },
  actions: {
    getMovieInfo({commit}) {
      commit('setPopupInfo', true)
    },
    closeMovieInfo({commit}) {
      commit('setPopupInfo', false)
    },
    logIn({ commit }, payload) {
      commit('setLoading', true)
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          commit('setLoading', false)
          commit('setIsLoggedIn', true)
          router.push('/stats');
        })
        .catch((err) => {
          console.log(err + "from");
          alert("you are not administrator!");
        });

    },
    setupFirebase({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          commit('setIsLoggedIn', true)
        } else {
          // No user is signed in.
          commit('setIsLoggedIn', false)
          console.log("signed out");
          router.push('/login').catch(() => { });
        }
      });
    },
    signOut({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          commit('setIsLoggedIn', false)
          router.push('/login').catch(err => console.log(err))
        })
    },

    loadMovies({commit}) {
      commit('setLoading', true)
      firebase.database().ref('movies').once('value')
        .then((data) => {
          const movies = []
          const obj = data.val()
          for (let key in obj) {
            movies.push({
              filmId: key,
              imageUrl: obj[key].picture.imageUrl,
              filmName: obj[key].filmName,
              description: obj[key].movieDescription,
              filmType: obj[key].filmType,
              imageGallery: obj[key].imageGallery
            })
          }
          commit('setMovies', movies)
          commit('setLoading', false)
        })
    },

    loadCinemas({commit}) {
      commit('setLoading', true)
      firebase.database().ref('cinemas').once('value')
        .then((data) => {
          const cinemas = []
          const obj = data.val()
          for (let key in obj) {
            cinemas.push({
              cinemaId: key,
              logo: obj[key].logo.imageUrl,
              bannerPhoto: obj[key].bannerPhoto.imageUrl,
              cinemaName: obj[key].cinemaName,
              description: obj[key].cinemaDescription,
              conditions: obj[key].cinemaConditions,
              filmType: obj[key].filmType,
              cinemasGallery: obj[key].cinemasGallery
            })
          }
          commit('setCinemas', cinemas)
          commit('setLoading', false)
        })
    },

    removeMovie({commit}, payload) {
      firebase.database().ref(`movies`).child(payload).remove()
      commit('removeMovie', payload)
    },

    removeCinema({commit}, payload) {
      firebase.database().ref(`cinemas`).child(payload).remove()
      commit('removeCinema', payload)
    },

    loadBanners({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('banners').once('value')
        .then((data) => {
          const banners = []
          const obj = data.val()
          for (let key in obj) {
            banners.push({
              selectedFile: obj[key].selectedFile,
              imageUrl: obj[key].imageUrl,
              image: obj[key].image,
              url: obj[key].url,
              text: obj[key].text,
            })
          }
          commit('setLoadedBanners', banners)
          commit('setLoading', false)
        })
    },

    loadNDBanners({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('newsDiscountBanners').once('value')
        .then((data) => {
          const banners = []
          const obj = data.val()
          for (let key in obj) {
            banners.push({
              selectedFile: obj[key].selectedFile,
              imageUrl: obj[key].imageUrl,
              image: null,
              url: obj[key].url,
            })
          }
          commit('setLoadedNDBanners', banners)
          commit('setLoading', false)
        })
    },

    addBanner({ commit }, payload) {
      const banner = {
        selectedFile: payload.selectedFile,
        imageUrl: payload.imageUrl,
        image: payload.image,
        url: payload.url,
        text: payload.text,
      }
      commit('addBanner', banner)
    },

    addNDBanner({ commit }, payload) {
      const banner = {
        selectedFile: payload.selectedFile,
        imageUrl: payload.imageUrl,
        image: null,
        url: payload.url,
      }
      commit('addNDBanner', banner)
    },
    onBannersSave({ commit }, payload) {
      firebase.database().ref('banners').set(payload)
        .then(() => {
          commit('setLoadedBanners', payload)
        })
        .catch((err) => console.log(err))

    },
    onNDBannersSave({ commit }, payload) {
      firebase.database().ref('newsDiscountBanners').set(payload)
        .then(() => {
          commit('setLoadedNDBanners', payload)
        })
        .catch((err) => console.log(err))
      console.log("saved");
    },

    addMovie({ commit }, payload) {
      commit('setLoading', true)
      firebase.database().ref('movies').push(payload)
        .then(() => {
          commit('addMovie', payload)
          commit('setMovies', payload)
          commit('setLoading', false)
          alert("saved successfully")
          router.push('/movies');
        })
        .catch((err) => console.log(err))
      console.log("saved");
      
    },
    addCinema({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('cinemas').push(payload)
        .then(() => {
          commit('addCinema', payload)
          commit('setCinemas', payload)
          alert("saved successfully")
          router.push('/cinemas');
        })
        .catch(err => console.log(err))
      console.log('saved');
    }
  },
    getters: {
      storeBanners(state) {
        return state.storeBanners
      },
      storeNDBanners(state) {
        return state.storeNDBanners
      },
      isLoggedIn(state) {
        return state.isLoggedIn
      },
      loading(state) {
        return state.loading
      },
      movies(state) {
        return state.movies
      },
      isPopupVisible(state) {
        return state.isPopupVisible
      },
      cinemas(state) {
        return state.cinemas
      }
    },
    modules: {
    }

  })
