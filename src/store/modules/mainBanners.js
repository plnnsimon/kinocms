import firebase from "firebase"
export default {
    state: {
        storeBanners: [],
        savingBanners: false,
    },
    mutations: {
        setLoadedBanners(state, payload) {
            state.storeBanners = payload
        },
        addBanner(state, payload) {
            state.storeBanners.push(payload)
        },
        setSaving(state, payload) {
            state.savingBanners = payload
        }

    },
    actions: {
        async loadBanners({ commit }) {
            commit('setLoading', true)
            await firebase.database().ref('banners').once('value')
                .then((data) => {
                    const banners = []
                    const obj = data.val()
                    for (let key in obj) {
                        banners.push({
                            ...obj[key]
                        })
                    }
                    commit('setLoadedBanners', banners)
                    commit('setLoading', false)
                })
        },
        addBanner({ commit }, payload) {
            const banner = {
                ...payload
            }
            commit('addBanner', banner)
        },
        async onBannersSave({ commit }, payload) {
            commit('setSaving', true)
            await firebase.database().ref('banners').set(payload)
                .then(() => {
                    console.log("saved");
                    commit('setSaving', false)
                    commit('setLoadedBanners', payload)
                })
                .catch((err) => console.log(err))

        },

    },
    getters: {
        storeBanners(state) {
            return state.storeBanners
        },
        savingBanners(state) {
            return state.savingBanners
        }
    }
}