<template>
  <div>
    <Cart/>
  </div>
</template>

<script>
import Cart from '@/components/Cart.vue'

export default {
  name: 'ShoppingCart',
  components: {
    Cart
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
