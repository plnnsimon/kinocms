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
    modules: {
        loading,
        mainBanners,
        login,
        movies,
        newsDiscountBanners,
        cinemas,
        news,
        promotions,
    }

})