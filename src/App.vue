<template>
  <div id="app">
    <Navbar v-if="navbarShown"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    navbarShown () {
      return this.$store.state.navbarShown
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('set_login_status', true)
      const payload = this.$jwt.decode(localStorage.access_token, this.$store.state.secretKey)
      this.$store.commit('set_current_user', payload.name)
    } else {
      this.$store.commit('set_login_status', false)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
