// export default {
//     state: {
//         banners: []
//     },
//     mutations: {
//         updateBanners(state, banners) {
//             state.banners = banners
//         }
//     },
//     actions: {
//         getBanners(ctx) {
//             const data = localStorage.getItem("banners");
//             if (data) {
//                 this.banners = JSON.parse(data);
//             }

//             ctx.commit('updateBanners', )
//         }
//     },
//     getters: {
//         allBanners(state) {
//             return state.banners
//         }
//     }
// }