<template>
  <div class="container">
    <Product/>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'
export default {
  name: 'ProductDetail',
  components: {
    Product
  },
  created () {
    if (!localStorage.access_token) {
      this.$router.push({ name: 'RegisterLogin' })
    }
  }
}
</script>

<style>

</style>
