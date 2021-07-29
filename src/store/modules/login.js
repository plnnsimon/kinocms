// import firebase from 'firebase'
// // import 'firebase/auth'
// export default {
//     state: {
//         isLoggedIn: false,
//         // login: '',
//         // password: ''
//     },
//     mutations: {
//         setIsLoggedIn(state, payload) {
//             state.isLoggedIn = payload
//         },
//         // setLogIn(state, payload) {
//         //     state.login = payload,
//         //         state.password = payload
//         // }
//     },
//     actions: {
//         logIn({ commit }, payload) {
//             firebase
//                 .auth()
//                 .signInWithEmailAndPassword(payload.email, payload.password)
//                 .then(() => {
//                     commit('setIsLoggedIn', true)
//                     this.$router.replace({ name: "Stats" });

//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     // alert("you are not administrator!");
//                 });

//         }

//     },
//     getters: {
//         isLoggedIn(state) {
//             return state.isLoggedIn
//         },
//         // login(state) {
//         //     return state.login
//         // },
//         // password(state) {
//         //     return state.password
//         // }
//     }
// }