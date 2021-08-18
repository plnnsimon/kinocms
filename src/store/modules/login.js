import firebase from 'firebase'
import 'firebase/auth'
import router from '../../router'
export default {
    state: {
        isLoggedIn: false,
        users: [],
        admin: null,
    },
    mutations: {
        setIsLoggedIn(state, payload) {
            state.isLoggedIn = payload
        },
        setUsers(state, payload) {
            state.users = payload
        },
        removeUser(state, payload) {
            state.users.filter(el => el != payload)
        },
        setAdmin(state, payload) {
            state.admin = payload
        }
    },

    actions: {
        async logIn({ commit }, payload) {
            commit('setLoading', true)
            if (payload) {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(payload.email, payload.password)
                    .then(() => {
                        commit('setLoading', false)
                        commit('setIsLoggedIn', true)
                        router.replace('/');
                    })
                    .catch((err) => {
                        console.log(err + "from");
                        alert("you are not administrator!");
                        commit('setLoading', false)
                        return
                    });
            } else {
                alert("you are not administrator")
                commit('setLoading', false)
                return
            }

        },
        async removeUser({ commit }, payload) {
            commit('setLoading', true)
            try {
                await firebase.database().ref(`users`).child(payload).remove()
                commit('setUsers', payload)
                commit('setLoading', false)
            } catch (err) {
                console.log(err);

                commit('setLoading', false)
            }
        },
        async loadUsers({ commit }) {

            await firebase.database().ref('users').once('value')
                .then((data) => {
                    const users = []
                    const obj = data.val()
                    for (let key in obj) {
                        users.push({
                            userId: key,
                            ...obj[key]
                        })
                    }
                    commit('setUsers', users)
                    commit('setLoading', false)
                })
        },
        setupFirebase({ commit }) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // Admin is signed in.
                    commit('setAdmin', user)
                    console.log("signed in");
                    commit('setIsLoggedIn', true)
                        // console.log(firebase.auth().currentUser);

                } else {
                    // No user is signed in.
                    commit('setIsLoggedIn', false)
                    console.log("signed out");
                    router.replace('/login').catch(() => {});
                }
            });
        },
        signOut({ commit }) {
            firebase.auth().signOut()
                .then(() => {
                    commit('setIsLoggedIn', false)
                    router.replace('/login').catch(err => console.log(err))
                })
        },
        async updateUser({ commit }, payload) {
            commit('setLoading', true)
            await firebase.database().ref('users').child(payload.userId).update(payload)
                .then(() => {
                    commit('setUsers', payload)
                    commit('setLoading', false)
                    alert("saved successfully")
                })
                .catch((err) => console.log(err))
            console.log("saved");
        },

    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn
        },
        users(state) {
            return state.users
        },
        admin(state) {
            return state.admin
        }

    }
}