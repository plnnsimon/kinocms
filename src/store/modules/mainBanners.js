import firebase from "firebase"
export default {
    state: {
        storeBanners: [],
    },
    mutations: {
        setLoadedBanners(state, payload) {
            state.storeBanners = payload
          },
          addBanner(state, payload) {
            state.storeBanners.push(payload)
          },

    },
    actions: {
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
          onBannersSave({ commit }, payload) {
            firebase.database().ref('banners').set(payload)
              .then(() => {
                commit('setLoadedBanners', payload)
              })
              .catch((err) => console.log(err))
      
          },
        
    },
    getters: {
        storeBanners(state) {
            return state.storeBanners
          },
    }
}