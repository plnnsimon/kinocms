import firebase from "firebase"
import router from '../../router'
export default {
    state: {
        pages: []
    },
    mutations: {
        setPages(state, payload) {
            state.pages = payload
        },
        addPage(state, payload) {
            state.pages.push(payload)
        },
        removePage(state, payload) {
            state.pages.filter(el => el != payload)
        },
    },
    actions: {
        async loadPages({ commit }) {
            commit('setLoading', true)
            await firebase.database().ref('pages').once('value')
                .then((data) => {
                    const pages = []
                    const obj = data.val()
                    for (let key in obj) {
                        pages.push({
                            id: key,
                            ...obj[key]
                        })
                    }
                    commit('setPages', pages)
                    commit('setLoading', false)
                })
        },
        updatePage({ commit }, payload) {
            commit('setLoading', true)
            firebase.database().ref('news').child(payload.pageId).update(payload)
                .then(() => {
                    commit('setPages', payload)
                    commit('setLoading', false)
                    alert("saved successfully")
                })
                .catch((err) => console.log(err))
            console.log("saved");
        },
        removePage({ commit }, payload) {
            firebase.database().ref(`pages`).child(payload).remove()
            commit('removePage', payload)
        },
        addPage({ commit }, payload) {
            commit('setLoading', true)
            firebase.database().ref('pages').push(payload)
                .then(() => {
                    commit('addPage', payload)
                    commit('setPages', payload)
                    commit('setLoading', false)
                    alert("saved successfully")
                    router.push('pages');
                })
                .catch((err) => console.log(err))
            console.log("saved");

        },

    },
    getters: {
        pages(state) {
            return state.pages
        },
    }
}