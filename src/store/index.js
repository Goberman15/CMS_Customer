import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loggedInUser: '',
    alreadyRegister: false,
    navbarShown: true,
    loginData: {},
    registerData: {},
    secretKey: 'pJty7oa0gsAvbpY9c2cMixU88nRl99vTlINfYgERVQkgHQQX9rmi7dj0rcbrLlKa',
    products: [],
    categories: [],
    searchParams: '',
    filterCategory: '',
    cart: [],
    isLoading: false,
    loaderSize: '150px'
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
    },
    set_cart (state, payload) {
      state.cart = payload
    },
    set_loading_status (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      const { name, phoneNumber, email, password } = payload
      return server.post('/customers/register', {
        name,
        email,
        password,
        phone_number: phoneNumber
      })
    },
    login ({ commit }, payload) {
      const { email, password } = payload
      return server.post('/customers/login', {
        email,
        password
      })
    },
    showProducts ({ commit }) {
      this.commit('set_loading_status', true)
      const token = localStorage.access_token
      return server.get(`/products?search=${this.state.searchParams}&sort=name|asc&per_page=100&page=1&categoryId=${this.state.filterCategory}`, {
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          this.commit('set_product_list', data.products.data)
        })
        .catch(err => {
          console.log(err.response)
        })
        .finally(() => {
          this.commit('set_loading_status', false)
        })
    },
    getAllCategory ({ commit }) {
      const token = localStorage.access_token
      return server.get('/categories?sort=name|asc', {
        headers: {
          access_token: token
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
    },
    addProductToCart ({ commit }, payload) {
      const token = localStorage.access_token
      const { productId, quantity } = payload
      return server.post('/carts', {
        productId,
        quantity
      }, {
        headers: {
          access_token: token
        }
      })
    },
    showProductOnCart ({ commit }) {
      const token = localStorage.access_token
      return server.get('carts', {
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          this.commit('set_cart', data.cart)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    changeQuantity ({ commit }, payload) {
      const token = localStorage.access_token
      const { productId, quantity } = payload
      return server.patch(`/carts/${productId}`, {
        quantity
      }, {
        headers: {
          access_token: token
        }
      })
    },
    removeProductFromCart ({ commit }, payload) {
      const token = localStorage.access_token
      return server.delete(`/carts/${payload}`, {
        headers: {
          access_token: token
        }
      })
    }
  }
})
