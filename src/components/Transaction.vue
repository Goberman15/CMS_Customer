<template>
  <div class="d-flex flex-column justify-content-center align-items-center full-width mt-3">
    <h2>{{ currentUser }}'s Transaction History</h2>
    <div class="d-flex aligh-items-center mb-3 top-btn">
      <router-link to="/cart">
        <button class="btn btn-info"><i class="fas fa-shopping-cart mr-2"></i>See Shopping Cart</button>
      </router-link>
    </div>
    <table class="table table-width">
      <thead class="thead-dark">
        <tr>
          <th scope="col" style="width: 30%;">Product</th>
          <th scope="col" style="width: 15%;">Image</th>
          <th scope="col" style="width: 15%;">Price</th>
          <th scope="col" style="width: 3%;">Quantity</th>
          <th scope="col" style="width: 15%;">Total Price</th>
          <th scope="col" style="width: 15%;">Checkout Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in transactionHistory" :key="product.id">
          <td>{{ product.Product.name }}</td>
          <td>
            <img
              class="product-img"
              width="80"
              :src="product.Product.image_url"
              :alt="product.Product.name"
              @click="enlargingImage(product.Product)"
            >
          </td>
          <td>{{ priceFormatter(product.Product.price) }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ priceFormatter(product.price) }}</td>
          <td>{{ dateFormatter(product.updatedAt) }} WIB</td>
        </tr>
      </tbody>
      <tfoot v-if="!transactionHistory.length && !isLoading">
        <tr>
          <td colspan="6">
            <strong class="pr-3">You haven't done any transactions yet, let's start shopping!</strong>
          </td>
        </tr>
      </tfoot>
      <CubeShadow v-if="isLoading" :size="loaderSize"></CubeShadow>
    </table>
  </div>
</template>

<script>
import accounting from 'accounting-js'
import moment from 'moment-timezone'
import Swal from 'sweetalert2'
import { CubeShadow } from 'vue-loading-spinner'

export default {
  name: 'TransactionData',
  components: {
    CubeShadow
  },
  methods: {
    priceFormatter (price) {
      return accounting.formatMoney(price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })
    },
    dateFormatter (date) {
      const dateTime = moment(date)
      return dateTime.tz('Asia/Jakarta').format('ddd, MMM Do, YYYY hh:mm')
    },
    enlargingImage (product) {
      Swal.fire({
        text: `${product.name}`,
        imageUrl: `${product.image_url}`,
        imageWidth: 400
      })
    }
  },
  computed: {
    transactionHistory () {
      return this.$store.state.transactionHistory
    },
    currentUser () {
      return this.$store.state.loggedInUser
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    loaderSize () {
      return this.$store.state.loaderSize
    }
  },
  created () {
    this.$store.dispatch('showTransactionHistory')
  }
}
</script>

<style scoped>
.full-width {
  width: 100%;
}

.table-width {
  width: 85%;
}

td {
  vertical-align: middle;
}

.product-img:hover {
  cursor: pointer;
}

.top-btn {
  width: 85%;
}
</style>
