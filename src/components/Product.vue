<template>
<div class="d-flex flex-column align-items-center mt-3">
  <CubeShadow v-if="isLoading"></CubeShadow>
  <div class="product-container" v-if="!isLoading">
    <div class="product-img">
        <img :src="product.image_url" width="300" :alt="product.name" @click="imageEnlarge">
    </div>
    <div class="product-detail ml-5">
      <div class="product-name text-left">
        <h2>{{ product.name }}</h2>
      </div>
      <div class="product-price text-left">
        <h4 class="text-lightblack">{{ priceFormatter(product.price) }}</h4>
      </div>
      <div class="product-stock text-left">
        <h5 v-if="product.stock > 0">{{ product.stock }} left on stock</h5>
        <h4 v-if="product.stock === 0"><span class="badge badge-danger">Out of Stock</span></h4>
        <h4><span class="badge badge-info">{{ product.Category.name }}</span></h4>
      </div>
      <div class="action text-left" v-if="product.stock > 0">
        <div class="qty">
          <i class="fas fa-minus-circle" v-if="orderQuantity > 1" @click="qtyDecrement"></i>
          <input type="number" class="order-qty" v-model="orderQuantity" min="1" :max="product.stock">
          <i class="fas fa-plus-circle" v-if="orderQuantity != product.stock" @click="qtyIncrement"></i>
        </div>
        <button class="btn btn-success" @click="addToCart">Add To Cart</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import accounting from 'accounting-js'
import Swal from 'sweetalert2'
import { CubeShadow } from 'vue-loading-spinner'

export default {
  name: 'Product',
  components: {
    CubeShadow
  },
  data () {
    return {
      orderQuantity: 1
    }
  },
  methods: {
    priceFormatter (price) {
      return accounting.formatMoney(price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })
    },
    qtyIncrement () {
      this.orderQuantity++
    },
    qtyDecrement () {
      this.orderQuantity--
    },
    imageEnlarge () {
      Swal.fire({
        text: `${this.product.name}`,
        imageUrl: `${this.product.image_url}`,
        imageWidth: 400
      })
    },
    addToCart () {
      const data = {
        productId: this.product.id,
        quantity: this.orderQuantity
      }
      this.$store.dispatch('addProductToCart', data)
        .then(({ data }) => {
          this.$toasted.show(`Success add ${data.product.Product.name} to your cart`, {
            type: 'success'
          })
          this.orderQuantity = 1
          this.$store.dispatch('showProductOnCart')
        })
        .catch(err => {
          this.$toasted.show(err.response.data.error)
        })
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.$store.dispatch('showProductById', this.$route.params.id)
  }
}
</script>

<style scoped>
.product-container {
    text-align: center;
    width:100%;
    min-width: 780px;
    border: rgb(206, 202, 202) 1px solid;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    min-height: 300px;
    padding: 10px;
    margin: 5px;
    font-family: 'Balsamiq Sans', cursive;
}

.product-img {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 1/2;
}

.product-img:hover {
  cursor: pointer;
}

.product-name {
  color: rgb(77, 88, 240);
}

.product-stock {
  width: 100%;
  color: rgb(240, 53, 91);
  display: flex;
  justify-content: space-between;
}

.product-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  min-height: 300px;
  grid-column: 2/4;
}

.action {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.qty {
  width: 140px;
}

.order-qty {
  border-radius: 5px;
  width: 40%;
  margin: 5px;
}

i {
  width: 20px;
}

i:hover {
  color: chartreuse;
  cursor: pointer;
}

.text-lightblack {
  color: rgb(46, 44, 44);
}
</style>
