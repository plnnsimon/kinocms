import firebase from "firebase"
import router from '../../router'
export default {
    state: {
        movies: [],
    },
    mutations: {
        setMovies(state, payload) {
            state.movies = payload
        },
        addMovie(state, payload) {
            state.movies.push(payload)
        },
        removeMovie(state, payload) {
            state.movies.filter(el => el != payload)
        },

    },
    actions: {
        loadMovies({ commit }) {
            commit('setLoading', true)
            firebase.database().ref('movies').once('value')
                .then((data) => {
                    const movies = []
                    const obj = data.val()
                    for (let key in obj) {
                        movies.push({
                            filmId: key,
                            imageUrl: obj[key].picture.imageUrl,
                            soonShawn: obj[key].soonShawn,
                            filmName: obj[key].filmName,
                            description: obj[key].movieDescription,
                            filmType: obj[key].filmType,
                            imageGallery: obj[key].imageGallery || [],
                            seo: obj[key].seo
                        })
                    }
                    commit('setMovies', movies)
                    commit('setLoading', false)
                })
        },
        removeMovie({ commit }, payload) {
            firebase.database().ref(`movies`).child(payload).remove()
            commit('removeMovie', payload)
        },
        addMovie({ commit }, payload) {
            commit('setLoading', true)
            firebase.database().ref('movies').push(payload)
                .then(() => {
                    commit('addMovie', payload)
                    commit('setMovies', payload)
                    commit('setLoading', false)
                    alert("saved successfully")
                    router.push('movies');
                })
                .catch((err) => console.log(err))
            console.log("saved");

        },
        updateMovie({ commit }, payload) {
            commit('setLoading', true)
            firebase.database().ref('movies').child(payload.filmId).update(payload)
                .then(() => {
                    commit('setMovies', payload)
                    commit('setLoading', false)
                    alert("update successfully")
                })
                .catch((err) => console.log(err))
            console.log("saved");

        },

    },
    getters: {
        movies(state) {
            return state.movies
        },
    }
}