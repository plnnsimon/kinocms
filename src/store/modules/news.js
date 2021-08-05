import firebase from "firebase"
import router from '../../router'
export default {
  state: {
    news: []
  },
  mutations: {
    setNews(state, payload) {
      state.news = payload
    },
    addNews(state, payload) {
      state.news.push(payload)
    },
    removeNews(state, payload) {
      state.news.filter(el => el != payload)
    },
    // updateNews(state, payload) {
    //   state.news.filter(el => el == payload)
    // }
  },
  actions: {
    async loadNews({ commit }) {
      commit('setLoading', true)
      await firebase.database().ref('news').once('value')
        .then((data) => {
          const news = []
          const obj = data.val()
          for (let key in obj) {
            news.push({
              newsId: key,
              newsTitle: obj[key].newsTitle,
              description: obj[key].newsDescription,
              imageGallery: obj[key].imageGallery,
              checked: obj[key].checked,
              newsDate: obj[key].newsDate,
              trailerLink: obj[key].trailerLink
            })
          }
          commit('setNews', news)
          commit('setLoading', false)
        })
    },
    updateNews({ commit }, payload) {
      commit('setLoading', true)
      firebase.database().ref('news').update(payload)
      .then((data) => {
        console.log(data);
        // commit('updateNews', payload)
          commit('setNews', payload)
          commit('setLoading', false)
          alert("saved successfully")
        })
        .catch((err) => console.log(err))
      console.log("saved");
    },
    removeNews({ commit }, payload) {
      firebase.database().ref(`news`).child(payload).remove()
      commit('removeNews', payload)
    },
    addNews({ commit }, payload) {
      commit('setLoading', true)
      firebase.database().ref('news').push(payload)
        .then(() => {
          commit('addNews', payload)
          commit('setNews', payload)
          commit('setLoading', false)
          alert("saved successfully")
          router.push('/news');
        })
        .catch((err) => console.log(err))
      console.log("saved");

    },

  },
  getters: {
    news(state) {
      return state.news
    },
  }
}