<template>
  <div class="cart-container mt-3">
    <h2 class="mb-3">{{ $store.state.loggedInUser }}'s Shopping Cart</h2>
    <table class="table cart-table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Image</th>
          <th scope="col" style="width: 15%;">Price</th>
          <th scope="col" style="width: 15%;">Quantity</th>
          <th scope="col" style="width: 15%;">Sub-Total</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in $store.state.cart.Products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>
            <img width="80" :src="product.image_url" :alt="product.name">
          </td>
          <td>{{ priceFormatter(product.price) }}</td>
          <td>
            <div class="qty">
              <i class="fas fa-minus-circle"></i>
              <input type="number" class="order-qty" min="1" v-model="product.ProductCart.quantity">
              <i class="fas fa-plus-circle"></i>
            </div>
          </td>
          <td>{{ priceFormatter(product.ProductCart.price) }}</td>
          <td>
            <i class="fas fa-trash-alt" @click="removeProduct(product.id)"></i>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="d-sm-table-cell"></td>
          <td colspan="2" class="d-sm-table-cell text-right">
            <strong class="pr-3">Total {{ priceFormatter($store.state.cart.total_price) }}</strong>
          </td>
          <td class="px-0">
            <button class="btn btn-primary">
              Checkout <i class="fa fa-angle-right d-inline"></i>
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import accounting from 'accounting-js'

export default {
  name: 'Cart',
  methods: {
    priceFormatter (price) {
      return accounting.formatMoney(price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })
    },
    removeProduct (id) {
      console.log(id)
      this.$store.commit('set_deletedId', id)
      this.$store.dispatch('removeProductFromCart')
        .then(({ data }) => {
          console.log(data)
          this.$store.dispatch('showProductOnCart')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  created () {
    this.$store.dispatch('showProductOnCart')
  }

}
</script>

<style>
.cart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.cart-table {
  width: 85%;
}

input {
  width: 40%;
  margin: 4px;
}

td {
  vertical-align: middle;
}

.fa-trash-alt {
  color: red;
  padding: 2px;
}
.fa-trash-alt:hover {
  cursor: pointer;
  background-color: red;
  color: white;
}
</style>
