<template>
  <div id="sku">
    <fade>
      <div class="background" v-show="skuVisible" @click.stop="hide()"></div>
    </fade>
    <slide>
      <sku-detail class="sku-detail" v-show="skuVisible" @hide="hide()">
        <slot></slot>
      </sku-detail>
    </slide>
  </div>
</template>

<script>
import {Fade, Slide} from 'common/transition/index.js'

import SkuDetail from './SkuDetail.vue'

export default {
  name: 'Sku',
  components: {
    Fade,
    Slide,
    SkuDetail
  },
  data () {
    return {
      skuVisible: false
    }
  },
  methods: {
    show () {
      this.skuVisible = true
    },
    hide () {
      this.skuVisible = false
    }
  },
  watch: {
    skuVisible (newValue) {
      if (newValue) {
        this.$store.commit('setBackTopListening', false)
        this.$store.commit('setBackTopVisible', false)
      } else {
        this.$store.commit('setBackTopListening', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #sku {
    color: $color-black;
  }
  .background {
    @include background;
  }
</style>