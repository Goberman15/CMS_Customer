<template>
  <div class="cart-container mt-3">
    <h2 class="mb-3">{{ currentUser }}'s Shopping Cart</h2>
    <div class="d-flex aligh-items-center mb-3 top-btn">
      <router-link to="/transaction">
        <button class="btn btn-info"><i class="fas fa-clipboard mr-2"></i>See Transaction History</button>
      </router-link>
    </div>
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
        <tr v-for="product in cartItem" :key="product.id">
          <td>{{ product.name }}</td>
          <td>
            <img
              class="product-img"
              width="80"
              :src="product.image_url"
              :alt="product.name"
              @click="enlargingImage(product)"
            >
          </td>
          <td>{{ priceFormatter(product.price) }}</td>
          <td>
            <div class="qty">
              <i
                class="fas fa-minus-circle"
                @click="qtyDecrement(product.ProductCart)"
                v-if="product.ProductCart.quantity > 1"
              ></i>
              <input
                type="number"
                class="order-qty"
                min="1"
                :max="product.stock"
                :value="product.ProductCart.quantity"
                @input="updateQty($event.target.value, product.id)"
              >
              <i
                class="fas fa-plus-circle"
                @click="qtyIncrement(product.ProductCart)"
                v-if="product.ProductCart.quantity != product.stock"
              ></i>
            </div>
          </td>
          <td>{{ priceFormatter(product.ProductCart.price) }}</td>
          <td>
            <i class="fas fa-trash-alt" @click="removeProduct(product)"></i>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr v-if="cartItem.length && !isLoading">
          <td colspan="3" class="d-sm-table-cell"></td>
          <td colspan="2" class="d-sm-table-cell text-right">
            <strong class="pr-3">Total {{ priceFormatter(totalPrice) }}</strong>
          </td>
          <td class="px-0">
            <button class="btn btn-primary" @click="checkOut">
              Checkout <i class="fa fa-angle-right d-inline"></i>
            </button>
          </td>
        </tr>
        <tr v-if="!cartItem.length && !isLoading">
          <td class="text-center" colspan="6">
            <strong class="pr-3">You dont have any product on your cart</strong>
          </td>
        </tr>
      </tfoot>
    </table>
    <CubeShadow v-if="isLoading" :size="loaderSize" class="mt-5"></CubeShadow>
  </div>
</template>

<script>
import accounting from 'accounting-js'
import Swal from 'sweetalert2'
import { CubeShadow } from 'vue-loading-spinner'

export default {
  name: 'Cart',
  components: {
    CubeShadow
  },
  methods: {
    priceFormatter (price) {
      return accounting.formatMoney(price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })
    },
    removeProduct (product) {
      const deleteWarning = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-2',
          cancelButton: 'btn btn-danger mr-2'
        },
        buttonsStyling: false
      })

      deleteWarning.fire({
        title: `Are you sure want to remove ${product.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, take me back!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('removeProductFromCart', product.id)
            .then(({ data }) => {
              this.$store.dispatch('showProductOnCart')
              deleteWarning.fire(
                'Deleted!',
                `Success remove ${product.name} from your cart`,
                'success'
              )
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: err.response.data.error
              })
            })
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          deleteWarning.fire(
            'Cancelled',
            `${product.name} is safe. It still on your cart`,
            'error'
          )
        }
      })
    },
    tableUpdate (data) {
      this.$store.dispatch('changeQuantity', data)
        .then(({ data }) => {
          this.$store.dispatch('showProductOnCart')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.error
          })
        })
    },
    updateQty (value, id) {
      const data = {
        productId: id,
        quantity: value
      }
      this.tableUpdate(data)
    },
    qtyIncrement (product) {
      const data = {
        productId: product.ProductId,
        quantity: product.quantity + 1
      }
      this.tableUpdate(data)
    },
    qtyDecrement (product) {
      const data = {
        productId: product.ProductId,
        quantity: product.quantity - 1
      }
      this.tableUpdate(data)
    },
    enlargingImage (product) {
      Swal.fire({
        text: `${product.name}`,
        imageUrl: `${product.image_url}`,
        imageWidth: 400
      })
    },
    checkOut () {
      this.$store.dispatch('checkOutCart')
        .then(({ data }) => {
          console.log(data)
          this.$toasted.show('Checkout Success', {
            type: 'success'
          })
          this.$store.dispatch('showProductOnCart')
        })
        .catch(err => {
          this.$toasted.show(err.response.data.error, {
            type: 'error'
          })
        })
    }
  },
  computed: {
    cartItem () {
      return this.$store.state.cartProducts
    },
    totalPrice () {
      return this.$store.state.cartTotalPrice
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
    this.$store.dispatch('showProductOnCart')
  }

}
</script>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.top-btn {
  width: 85%;
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

i:hover {
  color: greenyellow;
  cursor: pointer;
}

.product-img:hover {
  cursor: pointer;
}
</style>
