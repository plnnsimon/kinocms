import firebase from 'firebase'
import 'firebase/auth'
import router from '../../router'
export default {
    state: {
        isLoggedIn: false,
        users: [],
        admin: null,
        user: null,
        message: false,
        registrationMessage: false,
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
        },
        setUser(state, payload) {
            state.user = payload
        },
        setMessage(state, payload) {
            state.message = payload
        },
        setRegistrationMessage(state, payload) {
            state.registrationMessage = payload
        }
    },

    actions: {
        async logIn({ commit }, payload) {
            commit('setLoading', true)
            await firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password)
                .then((data) => {
                    if (data.user.uid == "11p2flnCwNSo2UwbFstZlaJYd5n2") {
                        commit('setMessage', true)
                    } else {
                        commit('setMessage', true)
                    }
                    setTimeout(() => {
                        commit('setMessage', false)
                    }, 6000)
                    if (data) {
                        router.push({ name: 'kino-cms' }).catch(err => err)
                    }
                })
                .catch((err) => {
                    console.log(err + "from");
                    alert("Incorrect email or password, please try again...")
                    commit('setLoading', false)
                });

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
            commit('setLoading', true)
            await firebase.database().ref('users').once('value')
                .then((data) => {
                    const users = []
                    const obj = data.val()
                    for (let key in obj) {
                        users.push({
                            key: key,
                            ...obj[key]
                        })
                    }
                    commit('setUsers', users)
                    commit('setLoading', false)
                })
        },
        setupFirebase({ commit }) {
            commit('setLoading', true)
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    if (user.uid == "11p2flnCwNSo2UwbFstZlaJYd5n2") {

                        // Admin is signed in.
                        console.log();
                        commit('setAdmin', user)
                        console.log("signed in");
                        commit('setIsLoggedIn', true)
                        console.log("admin");
                        commit('setLoading', false)

                    } else {
                        commit('setUser', user)
                        console.log("signed in");
                        commit('setIsLoggedIn', true)
                        console.log("user");
                        commit('setLoading', false)
                    }

                } else {
                    // No user is signed in.
                    commit('setIsLoggedIn', false)
                    console.log("signed out");
                    commit('setLoading', false)
                }
            });
        },
        signOut({ commit }) {
            firebase.auth().signOut()
                .then(() => {
                    commit('setIsLoggedIn', false)
                    commit('setUser', null)
                    commit('setAdmin', null)
                    commit('setMessage', true)
                    setTimeout(() => {
                        commit('setMessage', false)
                    }, 6000)
                    router.push('/').catch(err => err)
                })
        },
        async updateUser({ commit }, payload) {
            commit('setLoading', true)
            await firebase.database().ref('users').child(payload.userId).update(payload)
                .then(() => {
                    commit('setUsers', payload)
                    commit('setLoading', false)
                        // alert("saved successfully")
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
        },
        user(state) {
            return state.user
        },
        message(state) {
            return state.message
        },
        registrationMessage(state) {
            return state.registrationMessage
        }

    }
}