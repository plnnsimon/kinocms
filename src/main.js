import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "admin-lte/plugins/jquery/jquery.min.js";
import "admin-lte/plugins/bootstrap/js/bootstrap.min.js";
import "admin-lte/plugins/chart.js/Chart.min.css";
import "admin-lte/plugins/chart.js/Chart.bundle.min.js";
import "admin-lte/plugins/bs-custom-file-input/bs-custom-file-input.min.js";
import "admin-lte/plugins/bs-stepper/css/bs-stepper.min.css";
import "admin-lte/plugins/bs-stepper/js/bs-stepper.min.js";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
