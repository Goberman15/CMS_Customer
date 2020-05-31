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
import Swal from 'sweetalert2'

export default {
  name: 'Cart',
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
          this.$store.commit('set_deletedId', product.id)
          this.$store.dispatch('removeProductFromCart')
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
      this.$store.commit('set_cart_product', data)
      this.$store.dispatch('changeQuantity')
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
