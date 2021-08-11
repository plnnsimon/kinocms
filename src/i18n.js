import ru from './assets/i18n/ru.json'
import ua from './assets/i18n/ua.json'
import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

export default new VueI18n({
    locale: localStorage.getItem('lang') || 'ru',
    messages: {
        ru: ru,
        ua: ua
    }
})