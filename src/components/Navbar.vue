<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link to="/">
      <img src="../assets/gobers-logo-light.png" height="50" alt="gober-logo">
    </router-link>
    <div class="nav-menu">
      <ul class="nav justify-content-end">
        <li class="nav-item whitey username" v-if="isLoggedIn">
          <p class="mr-2">Hi, {{ currentUser }}</p>
        </li>
        <li class="nav-item whitey cart" v-if="isLoggedIn">
          <router-link to="/cart">
            <i class="fas fa-shopping-cart mr-2"></i>
            <span class="badge badge-light mr-4">Cart ({{ cartItems }} items)</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <button class="btn btn-success mr-2" @click="toRegister">Register</button>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <button class="btn btn-primary mr-2" @click="toLogin">Login</button>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button class="btn btn-danger ml-4 mr-2" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    toRegister () {
      this.$store.commit('set_registration_status', false)
      this.$router.push({ name: 'RegisterLogin' })
    },
    toLogin () {
      this.$store.commit('set_registration_status', true)
      this.$router.push({ name: 'RegisterLogin' })
    },
    logout () {
      this.$store.commit('set_registration_status', false)
      this.$store.commit('set_login_status', false)
      this.$store.commit('set_current_user', '')
      this.$router.push({ name: 'Home' })

      localStorage.removeItem('access_token')
    }
  },
  computed: {
    cartItems () {
      return this.$store.getters.ItemOnCart
    },
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    currentUser () {
      return this.$store.state.loggedInUser
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.dispatch('showProductOnCart')
    }
  }
}
</script>

<style>
.nav-menu {
  display: flex;
  align-items: center;
}

.nav-item {
  margin-bottom: 0;
}

.whitey {
  color: whitesmoke;
}

.username {
  font-size: 18px;
}

.cart {
  font-size: 20px;
  border-right: solid 2px white;
}
</style>
