<template>
  <div ref="wrapper">
    <slot></slot>
  </div>  
</template>

<script>
import BScroll from 'better-scroll'

import {debounce, throttle} from '@/common/utils.js'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default () {
        return 1
      }
    },
    pullUpLoad: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      scroll: {},
      refreshDebounce: {},
      scrollThrottle: {}
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })

    if (this.probeType > 1) {
      // this.scroll.on('scroll', (pos) => {
      //   this.scrollThrottle(pos)
      // })
      this.scroll.on('scroll', this.onScroll)
    }

    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })

    this.refreshDebounce = debounce(this.refresh, 60)
    this.scrollThrottle = throttle(this.onScroll, 120)
  },
  methods: {
    onScroll (pos) {
      this.$emit('scroll', pos)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh () {
      this.scroll.refresh()
    },
    scrollTo (x, y, time=200) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>
</style>