import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '../i18n'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: `/${i18n.locale}/kino-cms`
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

        children: [{
                path: 'pages',
                name: 'pages',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/users-main-page/pages/Pages'),
                children: [{
                        path: 'poster',
                        name: 'Poster',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/Poster')
                    },
                    {
                        path: 'soon',
                        name: 'soon',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/SoonShawnFilms')
                    },
                    {
                        path: 'cinemas',
                        name: 'user_cinemas',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/UsersCinemas')
                    },
                    {
                        path: 'cinemas/:cinemaId',
                        name: 'cinema__info',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/CinemaInfo')
                    },
                    {
                        path: 'cinemas/:cinemaId/:hallId',
                        name: 'about_hall',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/HallInfo')
                    },
                    {
                        path: 'movies/:movieId',
                        name: 'moviePage',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../components/movies/MoviePageInfo')
                    },
                    {
                        path: 'promotions',
                        name: 'UsersPromotions',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/UsersPromotions')
                    },
                    {
                        path: 'promotions/:promId',
                        name: 'promotions__info',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/PromotionsInfo')
                    },
                    {
                        path: 'news',
                        name: 'UsersNews',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/UsersNews')
                    },
                    {
                        path: 'cafe_bar',
                        name: 'UsersCafeBar',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/UsersCafeBar')
                    },
                    {
                        path: 'advertisement',
                        name: 'UsersAdvertisement',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/UsersAdvertisement')
                    },
                    {
                        path: 'vip_hall',
                        name: 'vip_hall',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/VipHall')
                    },
                    {
                        path: 'child_room',
                        name: 'child_room',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/ChildRoom')
                    },
                    {
                        path: 'contacts',
                        name: 'UsersContacts',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/UsersContacts')
                    },
                    {
                        path: 'user_office',
                        name: 'user_office',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/UserOffice')
                    },
                ]
            },



            {
                path: `kino-cms`,
                name: 'kino-cms',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/UsersMainPage'),
                children: [{
                        path: 'timetable',
                        name: 'Timetable',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/Timetable')
                    },
                    {
                        path: 'mobile_version',
                        name: 'UsersMobile',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/users-views/UsersMobile')
                    },
                ]
            },
            {
                path: `admin`,
                name: 'admin',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/Admin'),
                children: [{
                        path: 'stats',
                        name: 'Stats',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/Stats.vue'),

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
                        path: 'movies/movie_page',
                        name: 'MoviePage',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../components/movies/MoviePage')
                    },
                    {
                        path: 'cinemas/cinemacard',
                        name: 'CinemaCard',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../components/cinemas/CinemaCard')
                    },
                    {
                        path: 'cinemas/cinemahall',
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
                        path: 'timetable',
                        name: 'timetable',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/Timetable.vue')
                    },
                    {
                        path: 'news/news_page',
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
                        path: 'promotions/promotions_page',
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
                        path: 'pages/main_page',
                        name: 'MainPage',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../components/pages/MainPage')
                    },
                    {
                        path: 'pages/about_cinema',
                        name: 'AboutCinema',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../components/pages/AboutCinema')
                    },
                    {
                        path: 'pages/cafe_bar',
                        name: 'CafeBar',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../components/pages/CafeBar')
                    },
                    {
                        path: 'pages/vip_hall',
                        name: 'VipHall',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../components/pages/VipHall')
                    },
                    {
                        path: 'pages/child_room',
                        name: 'ChildRoom',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../components/pages/ChildRoom')
                    },
                    {
                        path: 'pages/advertisement',
                        name: 'Advertisement',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../components/pages/Advertisement')
                    },
                    {
                        path: 'pages/contacts',
                        name: 'Contacts',
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../components/pages/Contacts')
                    },
                    {
                        path: 'pages/add_page',
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
            },


        ]
    },
    {
        path: "*",
        name: "PageNotFound",
        component: () =>
            import ("../components/PageNotFound.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router