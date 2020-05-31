<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link to="/">
      <img src="../assets/gobers-logo-light.png" height="50" alt="gober-logo">
    </router-link>
    <div class="nav-menu">
      <ul class="nav justify-content-end">
        <li class="nav-item whitey username" v-if="$store.state.isLoggedIn">
          <p class="mr-2">Hi, {{ $store.state.loggedInUser }}</p>
        </li>
        <li class="nav-item whitey cart" v-if="$store.state.isLoggedIn">
          <router-link to="/cart">
            <i class="fas fa-shopping-cart mr-2"></i>
            <span class="badge badge-light mr-4">0</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="!$store.state.isLoggedIn">
          <button class="btn btn-success mr-2" @click="toRegister">Register</button>
        </li>
        <li class="nav-item" v-if="!$store.state.isLoggedIn">
          <button class="btn btn-primary mr-2" @click="toLogin">Login</button>
        </li>
        <li class="nav-item" v-if="$store.state.isLoggedIn">
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
