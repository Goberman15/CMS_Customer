<template>
    <div class="d-flex justify-content-center align-items-center mb-5">
        <ul class="pagination text-primary">
            <li class="page-item" v-if="currentPage != 1" @click="changePage(1)">
              <a class="page-link"><i class="fas fa-angle-double-left"></i></a>
            </li>
            <li class="page-item" v-if="currentPage != 1" @click="changePage(currentPage-1)">
              <a class="page-link"><i class="fas fa-angle-left"></i></a>
            </li>
            <!-- Paginated Page -->
            <li class="page-item" v-for="n in totalPage" :key="n" :class="{active: n == currentPage}" @click="changePage(n)">
              <a class="page-link">{{ n }}</a>
            </li>
            <!-- Paginated Page -->
            <li class="page-item" v-if="currentPage != totalPage" @click="changePage(currentPage+1)">
              <a class="page-link"><i class="fas fa-angle-right"></i></a>
            </li>
            <li class="page-item" v-if="currentPage != totalPage">
              <a class="page-link"><i class="fas fa-angle-double-right" @click="changePage(totalPage)"></i></a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Pagination',
  methods: {
    changePage (page) {
      this.$store.commit('set_target_page', page)
      this.$store.dispatch('showProducts')
    }
  },
  computed: {
    totalPage () {
      return this.$store.state.totalPage
    },
    currentPage () {
      return this.$store.state.currentPage
    }
  }
}
</script>

<style>

</style>
