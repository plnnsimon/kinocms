import firebase from "firebase"
export default {
    state: {
        storeNDBanners: [],
        savingBanners: false
    },
    mutations: {
        setLoadedNDBanners(state, payload) {
            state.storeNDBanners = payload
        },
        addNDBanner(state, payload) {
            state.storeNDBanners.push(payload)
        },
        setSaving(state, payload) {
            state.savingBanners = payload
        }

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
                            ...obj[key]
                        })
                    }
                    commit('setLoadedNDBanners', banners)
                    commit('setLoading', false)
                })
        },
        addNDBanner({ commit }, payload) {
            const banner = {
                ...payload
            }
            commit('addNDBanner', banner)
        },
        onNDBannersSave({ commit }, payload) {
            commit('setSaving', true)
            firebase.database().ref('newsDiscountBanners').set(payload)
                .then(() => {
                    commit('setLoadedNDBanners', payload)
                    commit('setSaving', false)
                })
                .catch((err) => console.log(err))
            console.log("saved");
        },

    },
    getters: {
        storeNDBanners(state) {
            return state.storeNDBanners
        }
    }
}