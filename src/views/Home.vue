<template>
  <div class="home d-flex flex-column justify-content-start align-items-center mt-3">
    <h1 class="balsamiq">Welcome to Gober's Sporting Goods</h1>
    <Banner/>
    <ProductList/>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import Banner from '@/components/Banner.vue'

export default {
  name: 'Home',
  components: {
    ProductList, Banner
  },
  created () {
    this.$store.commit('set_target_page', 1)
    this.$store.dispatch('showProducts')
    this.$store.dispatch('getAllCategory')
  },
  beforeDestroy () {
    this.$store.commit('set_search_params', '')
    this.$store.commit('set_filter_params', '')
  }
}
</script>

<style scoped>
.balsamiq {
  font-family: 'Balsamiq Sans', cursive;
}
</style>
