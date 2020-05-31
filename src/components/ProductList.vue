<template>
  <div class="home-container">
    <div class="form-row search-filter">
      <div class="form-group col-md-4 input-group">
        <input type="text" class="form-control" id="product-search" v-model="productSearch" placeholder="Search Product">
        <div class="input-group-append">
          <span class="input-group-text clear-field"><i class="fas fa-times-circle" @click="clearField"></i></span>
        </div>
      </div>
      <div class="form-group col-md-4">
        <select id="product-category" class="form-control" v-model="productCategory">
          <option value="">Choose Category</option>
          <option v-for="category in $store.state.categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
    </div>
    <h3 class="text-center" v-if="!$store.state.products.length">No Product Found with selected criteria</h3>
    <div class="product-container" v-if="$store.state.products.length">
      <div class="product-card" v-for="product in $store.state.products" :key="product.id">
        <div class="img-product">
          <img :src="product.image_url" width="200" alt="">
        </div>
        <div class="product-info">
          <div class="product-name">
            <router-link :to="`/product/${product.id}`">
              <p class="text-center">{{ product.name }}</p>
            </router-link>
          </div>
          <div class="product-stock">
            <p>{{ product.stock }} left in stock</p>
            <h5><span class="badge badge-info">{{ product.Category.name }}</span></h5>
          </div>
          <div class="more-info">
            <h5>{{ priceFormatter(product.price) }}</h5>
            <button class="btn btn-success add-cart" @click="addToCart(product.id)">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import accounting from 'accounting-js'
import _ from 'lodash'

export default {
  name: 'ProductList',
  data () {
    return {
      productCategory: '',
      productSearch: ''
    }
  },
  methods: {
    priceFormatter (price) {
      return accounting.formatMoney(price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })
    },
    debounceSearch: _.debounce(function () {
      this.$store.dispatch('showProducts')
    }, 500),
    clearField () {
      this.productSearch = ''
    },
    addToCart (id) {
      const data = {
        quantity: 1,
        productId: id
      }
      this.$store.commit('set_cart_product', data)
      this.$store.dispatch('addProductToCart')
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  watch: {
    productSearch (search) {
      this.$store.commit('set_search_params', search)
      this.debounceSearch()
    },
    productCategory (category) {
      this.$store.commit('set_filter_params', category)
      this.debounceSearch()
    }
  },
  created () {
    this.$store.dispatch('showProducts')
    this.$store.dispatch('getAllCategory')
  }

}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.product-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
}

.product-card {
  width: 400px;
  min-height: 300px;
  margin: 5px;
  padding: 7px;
  padding-top: 12px;
  border: rgb(192, 188, 188) 1px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Balsamiq Sans', cursive;
}

.product-name {
  color: rgb(77, 88, 240);
  width: 100%;
  font-size: 22px;
  font-weight: 700;
}

.product-name:hover {
  cursor: pointer;
  color: rgb(46, 55, 175);
}

.product-stock {
  color: crimson;
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-info {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.img-product {
  transition: all .2s ease-in-out;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-product:hover {
  transform: scale(1.1);
}

.more-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.badge{
  margin-bottom: 1rem;
}

.search-filter {
  width: 100%;
  margin: 5px;
  padding: 5px 55px;
  display: flex;
  justify-content: space-between;
}

.clear-field:hover {
  cursor: pointer;
  color: red;
}
</style>
