import firebase from "firebase"
export default {
  state: {
    storeNDBanners: [],
  },
  mutations: {
    setLoadedNDBanners(state, payload) {
      state.storeNDBanners = payload
    },
    addNDBanner(state, payload) {
      state.storeNDBanners.push(payload)
    },

  },
  actions: {
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
    addNDBanner({ commit }, payload) {
      const banner = {
        selectedFile: payload.selectedFile,
        imageUrl: payload.imageUrl,
        image: null,
        url: payload.url,
      }
      commit('addNDBanner', banner)
    },
    onNDBannersSave({ commit }, payload) {
      firebase.database().ref('newsDiscountBanners').set(payload)
        .then(() => {
          commit('setLoadedNDBanners', payload)
        })
        .catch((err) => console.log(err))
      console.log("saved");
    },

  },
  getters: {
    storeNDBanners(state) {
      return state.storeNDBanners
    },
  }
}