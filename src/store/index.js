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
    product: {},
    currentPage: '',
    targetPage: 1,
    totalPage: '',
    categories: [],
    searchParams: '',
    filterCategory: '',
    cartProducts: [],
    transactionHistory: [],
    cartTotalPrice: '',
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
    set_selected_product (state, payload) {
      state.product = payload
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
    set_current_page (state, payload) {
      state.currentPage = payload
    },
    set_target_page (state, payload) {
      state.targetPage = payload
    },
    set_total_page (state, payload) {
      state.totalPage = payload
    },
    set_cart (state, payload) {
      state.cartProducts = payload
    },
    set_cart_total_price (state, payload) {
      state.cartTotalPrice = payload
    },
    set_loading_status (state, payload) {
      state.isLoading = payload
    },
    set_transaction_history (state, payload) {
      state.transactionHistory = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      this.commit('set_loading_status', true)
      const { name, phoneNumber, email, password } = payload
      return server.post('/customers/register', {
        name,
        email,
        password,
        phone_number: phoneNumber
      })
    },
    login ({ commit }, payload) {
      this.commit('set_loading_status', true)
      const { email, password } = payload
      return server.post('/customers/login', {
        email,
        password
      })
    },
    showProducts ({ commit }) {
      this.commit('set_loading_status', true)
      const token = localStorage.access_token
      return server.get(`/products?search=${this.state.searchParams}&sort=name|asc&per_page=5&page=${this.state.targetPage}&categoryId=${this.state.filterCategory}`, {
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          this.commit('set_current_page', data.products.current_page)
          this.commit('set_total_page', data.products.last_page)
          this.commit('set_product_list', data.products.data)
          this.commit('set_search_params', '')
          this.commit('set_filter_params', '')
        })
        .catch(err => {
          console.log(err.response)
        })
        .finally(() => {
          this.commit('set_loading_status', false)
        })
    },
    showProductById ({ commit }, payload) {
      this.commit('set_loading_status', true)
      const token = localStorage.access_token
      return server.get(`/products/${payload}`, {
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          this.commit('set_selected_product', data.product)
        })
        .catch(err => {
          this.$toasted.show(err.response.data.error, {
            type: 'error'
          })
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
      this.commit('set_loading_status', true)
      const token = localStorage.access_token
      return server.get('carts', {
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          this.commit('set_cart', data.cart.Products)
          this.commit('set_cart_total_price', data.cart.total_price)
        })
        .catch(err => {
          console.log(err.response)
        })
        .finally(() => {
          this.commit('set_loading_status', false)
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
    },
    checkOutCart ({ commit }) {
      const token = localStorage.access_token
      return server.patch('/carts/checkout', {}, {
        headers: {
          access_token: token
        }
      })
    },
    showTransactionHistory ({ commit }) {
      this.commit('set_loading_status', true)
      const token = localStorage.access_token
      return server.get('/carts/history', {
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          this.commit('set_transaction_history', data.products)
        })
        .catch(err => {
          this.$toasted.show(err.response.data.error, {
            type: 'error'
          })
        })
        .finally(() => {
          this.commit('set_loading_status', false)
        })
    }
  },
  getters: {
    ItemOnCart: state => {
      return state.cartProducts.length
    },
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    }
  }
})
