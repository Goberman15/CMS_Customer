<template>
  <div class="d-flex flex-column justify-content-center align-items-center full-width mt-3">
    <h2>{{$store.state.loggedInUser}}'s Transaction History</h2>
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
              @click="enlargingImage(product)"
            >
          </td>
          <td>{{ priceFormatter(product.Product.price) }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ priceFormatter(product.price) }}</td>
          <td>{{ dateFormatter(product.updatedAt) }} WIB</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import accounting from 'accounting-js'
// import moment from 'moment'
import moment from 'moment-timezone'
export default {
  name: 'TransactionData',
  methods: {
    priceFormatter (price) {
      return accounting.formatMoney(price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })
    },
    dateFormatter (date) {
      const dateTime = moment(date)
      return dateTime.tz('Asia/Jakarta').format('ddd, MMM Do, YYYY hh:mm')
    }
  },
  computed: {
    transactionHistory () {
      return this.$store.state.transactionHistory
    }
  },
  created () {
    if (!localStorage.access_token) {
      this.$router.push({ name: 'RegisterLogin' })
    } else {
      this.$store.dispatch('showTransactionHistory')
    }
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

.top-btn {
  width: 85%;
}
</style>
