<template>
  <div class="sku">
    <fade>
      <div class="background" v-show="skuVisible" @click.stop="hide()"></div>
    </fade>
    <slide>
      <sku-detail 
        class="sku-detail" 
        v-show="skuVisible"
        :count-bar-visible="countBarVisible" 
        @hide="hide()"
      >
        <slot></slot>
      </sku-detail>
    </slide>
  </div>
</template>

<script>
  import SkuDetail from './SkuDetail.vue'

  import {Fade, Slide} from 'common/transition/index.js'

  export default {
    name: 'Sku',
    components: {
      SkuDetail,
      Fade,
      Slide,
    },
    props: {
      countBarVisible: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        skuVisible: false,
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
    },
    methods: {
      show () {
        this.skuVisible = true
      },
      hide () {
        this.skuVisible = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sku {
    color: $color-black;
    .background {
      @include background;
    }
  }
</style>