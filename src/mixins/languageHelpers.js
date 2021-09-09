import firebase from 'firebase'
export default {
    data() {
        return {
            timetable: []
        }
    },
    computed: {
        getLocale() {
            if (this.lang == 'ua') {
                return `uk-${this.lang.toUpperCase()}`
            } else {
                return `${this.lang}-${this.lang.toUpperCase()}`
            }
        },
        lang() {
            return this.$i18n.locale
        }

    },
    methods: {
        filteredTimetable(time) {
            let arr = this.timetable.filter(el => {
                if (new Date(el.date).toLocaleString('uk-UA', { weekday: 'long' }) == time.weekday || new Date(el.date).toLocaleString('ru-RU', { weekday: 'long' }) == time.weekday) {
                    return el
                }
            })
            return arr
        },
        getWeek(dayLength) {
            if (dayLength == '' || dayLength == undefined || dayLength == null) {
                dayLength = 'long'
            }
            let arr = []
            let today = new Date()
            for (let i = 0; i < 7; i++) {

                let day = new Date()
                day.setDate(today.getDate() + i)
                let normalDay = {
                    day: day.getDate(),
                    month: new Date(today.getFullYear(), day.getMonth(), day.getDate()).toLocaleString(`${this.getLocale}`, { month: 'short' }).toUpperCase(),
                    weekday: new Date(today.getFullYear(), day.getMonth(), day.getDate()).toLocaleString(`${this.getLocale}`, { weekday: `${dayLength}` }),
                }
                arr.push(normalDay)
            }
            return arr
        },
        getTimetable() {
            this.$store.commit('setLoading', true)
            firebase
                .database()
                .ref("timetable")
                .once("value")
                .then((data) => {
                    const obj = data.val()
                    for (let key in obj) {
                        this.timetable.push({...obj[key] })
                    }
                })
                .then(() => {
                    this.$store.commit('setLoading', false)
                });
        },
        getMovieTimetable(movie, selectedCinema, selectedDate, selectedType) {
            return this.timetable.filter(el => {
                if (el.cinema == selectedCinema && new Date(el.date).getDate() != selectedDate && el.movie == movie.filmId && selectedType != '') {
                    return null
                } else if (el.cinema == selectedCinema && el.type != selectedType && el.movie == movie.filmId && new Date(el.date).getDate() == selectedDate && selectedType != '') {
                    return null
                } else if (el.cinema == selectedCinema && el.type == selectedType && el.movie == movie.filmId && new Date(el.date).getDate() == selectedDate) {
                    return el
                } else if (el.cinema == selectedCinema && new Date(el.date).getDate() == selectedDate && el.movie == movie.filmId) {
                    return el
                } else if (el.cinema != selectedCinema && el.movie == movie.filmId && selectedCinema != '' && selectedDate != '') {
                    return null
                } else if (el.cinema == selectedCinema && el.movie == movie.filmId && new Date(el.date).getDate() == selectedDate) {
                    return el
                } else if (selectedCinema == '' && selectedType == '' && el.movie == movie.filmId && selectedDate == '') {
                    return el
                } else {
                    return null
                }
            })
        },
        getFilteredTimeListArray(selectedData) {
            if (selectedData == '') {
                return this.getWeek()
            } else {
                return this.getWeek().filter(el => {
                    if (el.weekday == selectedData) {
                        return el
                    }
                })
            }
        },
        getFilteredFilmsArray(timetable, time, selectedCinema, selectedHall, selectedMovie) {
            return timetable.filter(el => {
                if (el.cinema == selectedCinema && el.hall != selectedHall && new Date(el.date).getDate() == time.day && selectedHall != '') {
                    console.log('1');
                    return null
                } else if (el.movie != selectedMovie && el.hall == selectedHall && el.cinema == selectedCinema && new Date(el.date).getDate() == time.day && selectedMovie != '') {
                    console.log('2');
                    return null
                } else if (el.movie == selectedMovie && el.cinema == selectedCinema && new Date(el.date).getDate() == time.day) {
                    console.log('11');
                    return el
                } else if (el.movie == selectedMovie && el.hall == selectedHall && el.cinema == selectedCinema && new Date(el.date).getDate() == time.day) {
                    console.log('3');
                    return el
                } else if (el.cinema == selectedCinema && new Date(el.date).getDate() == time.day && selectedMovie == '') {
                    console.log('4');
                    return el
                } else if (el.movie != selectedMovie && el.hall != selectedHall && el.cinema == selectedCinema && new Date(el.date).getDate() == time.day && selectedHall == '' && selectedMovie == '') {
                    console.log('5');
                    return null
                } else if (el.cinema != selectedCinema && el.hall == selectedHall && new Date(el.date).getDate() == time.day) {
                    console.log('6');
                    return null
                } else if (el.cinema == selectedCinema && el.hall == selectedHall && new Date(el.date).getDate() == time.day) {
                    console.log('7');
                    return el
                } else if (el.hall == selectedHall && new Date(el.date).getDate() == time.day) {
                    console.log('8');
                    return el
                } else if (el.movie == selectedMovie && new Date(el.date).getDate() == time.day && selectedCinema == '') {
                    console.log('9');
                    return el
                } else if (el.movie != selectedMovie && new Date(el.date).getDate() == time.day && selectedCinema == '') {
                    console.log('10');
                    return el
                } else if (new Date(el.date).getDate() == time.day && selectedCinema == '' && selectedHall == '' && selectedMovie == '') {
                    return el
                } else {
                    return null
                }
            })
        },
        getPick(item) {
            if (!item.uaImageUrl && !item.imageUrl || !item.ruImageUrl && !item.imageUrl) {
                return "../../assets/films/no-image.jpeg"
            } else if (this.lang == 'ru' && item.ruImageUrl) {
                return item.ruImageUrl
            } else if (this.lang == 'ua' && item.uaImageUrl) {
                return item.uaImageUrl
            } else {
                return item.imageUrl
            }
        },
        getCinemaName(item) {
            if (this.lang == 'ru') {
                return item.ruCinemaName
            } else {
                return item.uaCinemaName
            }
        },
        getNewsTitle(item) {
            if (this.lang == 'ru') {
                return item.ruNewsTitle
            } else {
                return item.uaNewsTitle
            }
        },
        getFilmName(item) {
            if (this.lang == 'ru' && item) {
                return item.ruFilmName
            } else if (this.lang == 'ua' && item) {
                return item.uaFilmName
            }
            return
        },
        getPromotionTitle(item) {
            if (this.lang == 'ru') {
                return item.ruPromotionsTitle
            } else {
                return item.uaPromotionsTitle
            }
        },
        getDescription(item) {
            if (this.lang == 'ru') {
                return item.ruDescription
            } else {
                return item.uaDescription
            }
        },
        getConditions(item) {
            if (this.lang == 'ru') {
                return item.ruConditions
            } else {
                return item.uaConditions
            }
        },
        getTrailerLink(item) {
            if (this.lang == 'ru') {
                return item.ruTrailerLink
            } else {
                return item.uaTrailerLink
            }
        },

    }
}