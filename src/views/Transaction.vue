<template>
  <div>
    <TransactionData/>
  </div>
</template>

<script>
import TransactionData from '@/components/Transaction.vue'
export default {
  name: 'Transaction',
  components: {
    TransactionData
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
