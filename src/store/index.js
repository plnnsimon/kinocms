import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import firebase from "firebase"
import login from './modules/login'
import mainBanners from './modules/mainBanners'
import cinemas from './modules/cinemas'
import movies from './modules/movies'
import newsDiscountBanners from './modules/newsDiscountBanners'
import loading from './modules/loading'
import news from './modules/news'
import promotions from './modules/promotions'
import pages from './modules/pages'

Vue.prototype.$axios = axios;

Vue.use(Vuex)

const firebaseConfig = {
    apiKey: "AIzaSyBEuT5qWbHsZTeuyj27fSjlnmum400oh38",
    authDomain: "kino-cms-2.firebaseapp.com",
    databaseURL: "https://kino-cms-2-default-rtdb.firebaseio.com",
    projectId: "kino-cms-2",
    storageBucket: "kino-cms-2.appspot.com",
    messagingSenderId: "330102524828",
    appId: "1:330102524828:web:582e177a22f67149679659",
    measurementId: "G-1C56LFC1YT"
};

firebase.initializeApp(firebaseConfig);

export default new Vuex.Store({
    modules: {
        loading,
        mainBanners,
        login,
        movies,
        newsDiscountBanners,
        cinemas,
        news,
        promotions,
        pages,
    }

})