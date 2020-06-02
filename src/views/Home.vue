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
    this.$store.dispatch('showProducts')
    this.$store.dispatch('getAllCategory')
  }
}
</script>

<style scoped>
.balsamiq {
  font-family: 'Balsamiq Sans', cursive;
}
</style>
