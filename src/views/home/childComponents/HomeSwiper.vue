<template>
  <swiper class="swiper" :css="getSwiperCSS()" ref="swiper">
    <swiper-item v-for="(banner, index) in banners" :key="index" :css="getSwiperItemCSS()">
      <img :src="banner.image" alt="轮播图">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'common/swiper/index.js'

  export default {
    components: {
      Swiper,
      SwiperItem,
    },
    props: {
      banners: {
        type: Array,
        defualt() {
          return []
        }
      }
    },
    methods: {
      startTimer () {
        this.$refs.swiper && this.$refs.swiper.startTimer()
      },
      stopTimer () {
        this.$refs.swiper && this.$refs.swiper.stopTimer()
      },
      getSwiperCSS () {
        return {
          indicatorBottom: '22px', 
          indicatorLeft: '8vw',
          backgroundImage: 'linear-gradient(#fff, #f4f4f4)'
        }
      },
      getSwiperItemCSS () {
        return {
          height: '150px', 
          padding: '15px 4vw',
          radius: '10px'
        }
      },
    },
  }
</script>

<style>
</style>