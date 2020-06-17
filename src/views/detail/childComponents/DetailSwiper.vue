<template>
  <swiper class="detail-swiper" ref="swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" @load="imgLoaded(index)">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'common/swiper/index.js'

  export default {
    name: 'DetailSwiper',
    components: {
      Swiper,
      SwiperItem,
    },
    props: {
      topImages: {
        type: Array,
        default () {
          return []
        }
      },
    },
    data () {
      return {
        currentCount: 0,
      }
    },
    methods: {
      imgLoaded (index) {
        this.currentCount++
        if (index === 0) {
          this.$store.commit('setLoading', false)
        } 
        if (this.currentCount === this.topImages.length) {
          this.$refs.swiper && this.$refs.swiper.initSwiper && this.$refs.swiper.initSwiper()
        }
      },
    },
  }
</script>

<style scoped>
  .detail-swiper {
    height: 100vmin;
  }
</style>
