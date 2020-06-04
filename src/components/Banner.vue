<template>
<div class="carousel m-3">
  <vue-flux
    :options="vfOptions"
    :images="vfImages"
    :transitions="vfTransitions"
    :captions="vfCaptions"
    ref="slider">

    <template v-slot:preloader>
      <flux-preloader />
    </template>

    <template v-slot:caption>
      <flux-caption />
    </template>

    <template v-slot:controls>
      <flux-controls />
    </template>

    <template v-slot:pagination>
      <flux-pagination />
    </template>

  </vue-flux>
</div>
</template>

<script>
import { VueFlux, FluxCaption, FluxPagination, FluxPreloader, FluxControls } from 'vue-flux'
import one from '../assets/1.png'
import two from '../assets/2.png'
import three from '../assets/3.png'

export default {
  name: 'Banner',
  components: {
    VueFlux, FluxCaption, FluxPagination, FluxPreloader, FluxControls
  },
  data () {
    return {
      vfOptions: {
        autoplay: true
      },
      vfImages: [one, two, three],
      vfTransitions: ['kenburn', 'waterfall', 'blocks2', 'cube', 'book', 'round1', 'round2'],
      vfCaptions: [
        'Football Weekend Discount Special',
        'GOBER\'S PRESENT: 2021 RUN-ATHON',
        'Be a Weekend Warrior with Gober\'s'
      ]
    }
  }
}
</script>

<style>
  .carousel {
    width: 60%;
  }
</style>
