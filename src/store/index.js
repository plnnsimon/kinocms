import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import firebase from "firebase"
import router from '../router'
import login from './modules/login'
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
    movie_page: {}
  },
  mutations: {
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
    setLoadedMoviePage(state, payload) {
      state.movie_page = payload
    },
    addBanner(state, payload) {
      state.storeBanners.push(payload)
    },
    addNDBanner(state, payload) {
      state.storeNDBanners.push(payload)
    }
  },
  actions: {
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

    onMoviePageSave({ commit }, payload) {
      firebase.database().ref('movie_page').push(payload)
        .then(() => {
          commit('setLoadedMoviePage', payload)
          alert("saved successfully")
        })
        .catch((err) => console.log(err))
      console.log("saved");
      
    },
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
      movie_page(state) {
        return state.movie_page
      }
    },
    modules: {
      login
    }

  })
