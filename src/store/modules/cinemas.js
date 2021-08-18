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
        async loadCinemas({ commit }) {
            commit('setLoading', true)
            await firebase.database().ref('cinemas').once('value')
                .then((data) => {
                    const cinemas = []
                    const obj = data.val()
                    for (let key in obj) {
                        cinemas.push({
                            cinemaId: key,
                            logo: obj[key].logo || null,
                            bannerPhoto: obj[key].bannerPhoto || null,
                            cinemaName: obj[key].cinemaName,
                            description: obj[key].description,
                            conditions: obj[key].conditions,
                            cinemasGallery: obj[key].cinemasGallery || [],
                            cinemaHalls: obj[key].cinemaHalls,
                            seo: obj[key].seo
                        })
                    }
                    commit('setCinemas', cinemas)
                    commit('setLoading', false)
                })
        },
        removeCinema({ commit }, payload) {
            firebase.database().ref(`cinemas`).child(payload).remove()
            commit('removeCinema', payload)
        },
        addCinema({ commit }, payload) {
            commit('setLoading', true)
            firebase.database().ref('cinemas').push(payload)
                .then(() => {
                    commit('addCinema', payload)
                    commit('setCinemas', payload)
                    alert("saved successfully")
                    router.push('cinemas');
                })
                .catch(err => console.log(err))
            console.log('saved');
        },
        updateCinema({ commit }, payload) {
            commit('setLoading', true)
            firebase.database().ref('cinemas').child(payload.cinemaId).update(payload)
                .then(() => {
                    commit('setCinemas', payload)
                    commit('setLoading', false)
                    alert("update successfully")
                })
                .catch((err) => console.log(err))
            console.log("saved");

        },

    },
    getters: {
        cinemas(state) {
            return state.cinemas
        }
    }
}