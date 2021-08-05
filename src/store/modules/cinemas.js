import router from '../../router'
import firebase from "firebase"
export default {
  state: {
    cinemas: [],
    isPopupVisible: false,
  },
  mutations: {
    setCinemas(state, payload) {
      state.cinemas = payload
    },
    addCinema(state, payload) {
      state.cinemas.push(payload)
    },
    removeCinema(state, payload) {
      state.cinemas.filter(el => el != payload)
    }

  },
  actions: {
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
    removeCinema({commit}, payload) {
      firebase.database().ref(`cinemas`).child(payload).remove()
      commit('removeCinema', payload)
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
    cinemas(state) {
      return state.cinemas
    }
  }
}