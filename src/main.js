import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueJWT from 'vuejs-jwt'
import Toasted from 'vue-toasted'

Vue.use(VueJWT)
Vue.use(Toasted, {
  position: 'top-right',
  duration: 5000,
  action: {
    text: 'Close',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
