import i18n from '../i18n'

export default {
    data() {
        return {
            lang: i18n.locale
        }
    },
    methods: {
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
        }
    }
}