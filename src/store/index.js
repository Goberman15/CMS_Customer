import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loggedInUser: 'Akbar',
    alreadyRegister: false,
    navbarShown: true,
    loginData: {},
    registerData: {},
    secretKey: 'pJty7oa0gsAvbpY9c2cMixU88nRl99vTlINfYgERVQkgHQQX9rmi7dj0rcbrLlKa',
    access_token: localStorage.access_token,
    products: [],
    categories: [],
    searchParams: '',
    filterCategory: ''
  },
  mutations: {
    set_login_status (state, payload) {
      state.isLoggedIn = payload
    },
    set_current_user (state, payload) {
      state.loggedInUser = payload
    },
    set_registration_status (state, payload) {
      state.alreadyRegister = payload
    },
    set_navbar_shown_toggle (state, payload) {
      state.navbarShown = payload
    },
    set_login_data (state, payload) {
      state.loginData = payload
    },
    set_register_data (state, payload) {
      state.registerData = payload
    },
    set_product_list (state, payload) {
      state.products = payload
    },
    set_category_list (state, payload) {
      state.categories = payload
    },
    set_search_params (state, payload) {
      state.searchParams = payload
    },
    set_filter_params (state, payload) {
      state.filterCategory = payload
    }
  },
  actions: {
    register ({ commit }) {
      const { name, phoneNumber, email, password } = this.state.registerData
      return server.post('/customers/register', {
        name,
        email,
        password,
        phone_number: phoneNumber
      })
    },
    login ({ commit }) {
      const { email, password } = this.state.loginData
      return server.post('/customers/login', {
        email,
        password
      })
    },
    showProducts ({ commit }) {
      return server.get(`/products?search=${this.state.searchParams}&sort=name|asc&per_page=100&page=1&categoryId=${this.state.filterCategory}`, {
        headers: {
          access_token: this.state.access_token
        }
      })
        .then(({ data }) => {
          this.commit('set_product_list', data.products.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getAllCategory ({ commit }) {
      return server.get('/categories?sort=name|asc', {
        headers: {
          access_token: this.state.access_token
        }
      })
        .then(({ data }) => {
          this.commit('set_category_list', [])
          const categories = []
          data.categories.forEach(category => {
            categories.push(category)
          })
          this.commit('set_category_list', categories)
        })
        .catch(err => {
          console.log(err.response)
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Something Went Wrong',
          //   text: `${err.response.data.error}`
          // })
        })
    }
  }
})
