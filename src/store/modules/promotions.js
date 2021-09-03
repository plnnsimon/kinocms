import firebase from "firebase"
import router from '../../router'
export default {
    state: {
        promotions: []
    },
    mutations: {
        setPromotions(state, payload) {
            state.promotions = payload
        },
        addPromotions(state, payload) {
            state.promotions.push(payload)
        },
        removePromotions(state, payload) {
            state.promotions.filter(el => el != payload)
        },
    },
    actions: {
        async loadPromotions({ commit }) {
            commit('setLoading', true)
            await firebase.database().ref('promotions').once('value')
                .then((data) => {
                    const promotions = []
                    const obj = data.val()
                    for (let key in obj) {
                        promotions.push({
                            promotionId: key,
                            ...obj[key]
                        })
                    }
                    commit('setPromotions', promotions)
                    commit('setLoading', false)
                })
        },
        updatePromotions({ commit }, payload) {
            commit('setLoading', true)
            firebase.database().ref('promotions').child(payload.promotionId).update(payload)
                .then(() => {
                    commit('setPromotions', payload)
                    commit('setLoading', false)
                    alert("saved successfully")
                })
                .catch((err) => console.log(err))
            console.log("saved");
        },
        removePromotions({ commit }, payload) {
            firebase.database().ref(`promotions`).child(payload).remove()
            commit('removePromotions', payload)
        },
        addPromotions({ commit }, payload) {
            commit('setLoading', true)
            firebase.database().ref('promotions').push(payload)
                .then(() => {
                    commit('addPromotions', payload)
                    commit('setPromotions', payload)
                    commit('setLoading', false)
                    alert("saved successfully")
                    router.push({ name: 'Promotions' });
                })
                .catch((err) => console.log(err))
            console.log("saved");

        },

    },
    getters: {
        promotions(state) {
            return state.promotions
        },
    }
}