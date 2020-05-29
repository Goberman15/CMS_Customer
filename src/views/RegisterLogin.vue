<template>
  <div>
    <FormLoginRegister/>
  </div>
</template>

<script>
import FormLoginRegister from '@/components/FormLoginRegister.vue'

export default {
  name: 'RegisterLogin',
  components: {
    FormLoginRegister
  },
  created () {
    this.$store.commit('set_navbar_shown_toggle', false)
    if (localStorage.access_token) {
      this.$router.push({ name: 'Home' })
    }
  }

}
</script>

<style>

</style>
