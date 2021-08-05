import firebase from 'firebase'
import 'firebase/auth'
import router from '../../router'
export default {
    state: {
        isLoggedIn: false,
    },
    mutations: {
        setIsLoggedIn(state, payload) {
            state.isLoggedIn = payload
        },
    },
    actions: {
        async logIn({ commit }, payload) {
            commit('setLoading', true)
            await firebase
              .auth()
              .signInWithEmailAndPassword(payload.email, payload.password)
              .then(() => {
                commit('setLoading', false)
                commit('setIsLoggedIn', true)
                router.push('/stats');
              })
              .catch((err) => {
                console.log(err + "from");
                alert("you are not administrator!");
              });
      
          },
          setupFirebase({ commit }) {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                // User is signed in.
                console.log("signed in");
                commit('setIsLoggedIn', true)
              } else {
                // No user is signed in.
                commit('setIsLoggedIn', false)
                console.log("signed out");
                router.push('/login').catch(() => { });
              }
            });
          },
          signOut({ commit }) {
            firebase.auth().signOut()
              .then(() => {
                commit('setIsLoggedIn', false)
                router.push('/login').catch(err => console.log(err))
              })
          },

    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn
        },
        
    }
}