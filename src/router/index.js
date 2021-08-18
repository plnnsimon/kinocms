import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '../i18n'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: `/${i18n.locale}`
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/Login.vue')
    },
    {
        path: "/:lang",
        component: {
            render(c) { return c('router-view') }
        },

        children: [

            {
                path: 'stats',
                name: 'Stats',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/Stats.vue')
            },
            {
                path: 'banners',
                name: 'Banners',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/Banners.vue')
            },
            {
                path: 'movies',
                name: 'Movies',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/Movies.vue')
            },
            {
                path: 'movie_page',
                name: 'MoviePage',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/movies/MoviePage')
            },
            {
                path: 'edit_movie_page',
                name: 'EditMoviePage',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/movies/EditMoviePage')
            },
            {
                path: 'cinemacard',
                name: 'CinemaCard',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/cinemas/CinemaCard')
            },
            {
                path: 'cinemahall',
                name: 'CinemaHall',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/cinemas/CinemaHall')
            },
            {
                path: 'cinemas',
                name: 'Cinemas',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/Cinemas.vue')
            },
            {
                path: 'news',
                name: 'News',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/News.vue')
            },
            {
                path: 'news_page',
                name: 'NewsPage',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/news/NewsPage.vue')
            },
            {
                path: 'promotions',
                name: 'Promotions',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/Promotions.vue')
            },
            {
                path: 'promotions_page',
                name: 'PromotionsPage',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/promotions/PromotionsPage')
            },
            {
                path: 'pages',
                name: 'Pages',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/Pages.vue')
            },
            {
                path: 'main_page',
                name: 'MainPage',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/pages/MainPage')
            },
            {
                path: 'about_cinema',
                name: 'AboutCinema',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/pages/AboutCinema')
            },
            {
                path: 'cafe_bar',
                name: 'CafeBar',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/pages/CafeBar')
            },
            {
                path: 'vip_hall',
                name: 'VipHall',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/pages/VipHall')
            },
            {
                path: 'child_room',
                name: 'ChildRoom',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/pages/ChildRoom')
            },
            {
                path: 'advertisement',
                name: 'Advertisement',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/pages/Advertisement')
            },
            {
                path: 'contacts',
                name: 'Contacts',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/pages/Contacts')
            },
            {
                path: 'add_page',
                name: 'AddPage',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/pages/AddPage')
            },
            {
                path: 'users',
                name: 'Users',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/Users.vue')
            },
            {
                path: 'mails',
                name: 'Mails',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/Mails.vue')

            },

            {
                path: 'registration',
                name: 'Registration',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/Registration.vue')
            },
            {
                path: 'user_registration',
                name: 'UserRegistration',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/UserRegistration.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router