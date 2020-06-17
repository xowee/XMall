<template>
  <div class="swiper" ref="swiper">
    <div class="main" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" ref="main">
      <slot></slot>
    </div>
    <div class="indicator" v-if="indicatorVisible && swiperItemCount > 1" ref="indicator">
      <div 
        class="indicator-item"
        v-for="(item, index) in swiperItemCount" 
        :class="{'indicator-item-active': activeIndex === index + 1}"
        :key="index">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperItemCount: 0,  // 元素个数
      currentIndex: 1,  // 当前元素index
      swiperWidth: 0,  //slide的宽度
      swiperStyle: {},  // slide的行内样式
      playTimer: null,  // 定时器
      scrolling: false, // 是否正在滚动
      startX: 0,  //触摸x坐标
      distance: 0 //触摸距离
    }
  },
  props: {
    interTime: {
      type: Number,
      default () {
        return 3000
      } 
    },
    animDuration: {
      type: Number,
      default () {
        return 300
      }
    },
    moveRatio: {
      type: Number,
      default () {
        return 0.2
      }
    },
    indicatorVisible: {
      type: Boolean,
      default () {
        return true
      }
    },
    css: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.initSwiper()
    }, 200);
  },
  computed: {
    curPosition () {
      return - this.currentIndex * this.swiperWidth
    },
    activeIndex () {
      let index
      if (this.currentIndex === 0) {
        index = this.swiperItemCount
      } else if (this.currentIndex === this.swiperItemCount) {
        index = this.currentIndex
      } else {
        index = this.currentIndex % this.swiperItemCount
      }
      return index
    }
  },
  methods: {
    // 初始化
    initSwiper () {
      // const swiperElement = document.querySelector('#slide')
      const swiperElement = this.$refs.main
      const swiperItemElements = swiperElement.getElementsByClassName('swiper-item')

      this.swiperItemCount = swiperItemElements.length

      if (this.swiperItemCount > 1) {
        const nodeFirst = swiperItemElements[0].cloneNode(true)
        const nodeLast = swiperItemElements[this.swiperItemCount - 1].cloneNode(true)

        swiperElement.insertBefore(nodeLast, swiperItemElements[0])
        swiperElement.appendChild(nodeFirst)

        this.swiperStyle = swiperElement.style

        this.swiperWidth = parseFloat(window.getComputedStyle(swiperElement).width)

        this.setTransform(-this.swiperWidth)

        this.setStyle()

        this.startTimer()
      }
    },
    // 打开定时器
    startTimer () {
      if (this.playTimer === null) {
        this.playTimer = setInterval(() => {
          this.currentIndex++
          this.scrollContent(- this.currentIndex * this.swiperWidth)
        }, this.interTime)
      }
    },
    // 移除定时器
    stopTimer () {
      window.clearInterval(this.playTimer)
      this.playTimer = null
    },
    // 设置滑块位置
    setTransform (position) {
      this.swiperStyle.trnasform = `translate3d(${position}px, 0, 0)`
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px, 0, 0)`
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px, 0, 0)`
    },
    // 滚动滑块
    scrollContent (currentPosition) {
      this.scrolling = true

      this.stopTimer()

      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms'

      this.setTransform(currentPosition)

      this.checkIndex()
    
      this.startTimer()
      this.scrolling = false
    },
    // 校验滑块位置
    checkIndex () {
      setTimeout(() => {
        this.swiperStyle.transition = '0ms'

        if (this.currentIndex < 1) {
          this.currentIndex = this.swiperItemCount
        } else if (this.currentIndex > this.swiperItemCount) {
          this.currentIndex = 1
        }

        this.setTransform(this.curPosition)
      }, this.animDuration)
    },
    // 开始拖动
    touchStart (e) {
      if (this.scrolling) return
      this.stopTimer()
      this.startX = e.touches[0].pageX
    },
    // 拖动中
    touchMove (e) {
      this.distance = e.touches[0].pageX - this.startX
      this.setTransform(this.curPosition + this.distance)
    },
    // 结束拖动
    touchEnd () {
      const currentMove = Math.abs(this.distance)
      if (currentMove >= this.swiperWidth * this.moveRatio) {
        this.distance > 0 ? this.currentIndex-- : this.currentIndex++
      }
      this.scrollContent(this.curPosition)
      this.startTimer()
    },
    setStyle () {
      if (Object.keys(this.css).length) {
        const swiperStyle = this.$refs.swiper.style
        if (this.css.indicatorBottom) {
          swiperStyle.setProperty('--indicator-bottom', this.css.indicatorBottom)
        }
        if (this.css.indicatorLeft) {
          swiperStyle.setProperty('--indicator-left', this.css.indicatorLeft)
        }
        if (this.css.backgroundColor) {
          swiperStyle.setProperty('--background-color', this.css.backgroundColor)
        }
        if (this.css.backgroundImage) {
          swiperStyle.setProperty('--background-image', this.css.backgroundImage)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper {
    position: relative;
    overflow: hidden;

    --indicator-bottom: 8px;
    --indicator-left: 8px;
    --background-color: transparent;
    --background-image: none;

    background-color: var(--background-color);
    background-image: var(--background-image);

    .main {
      display: flex;
    }
    
    .indicator {
      position: absolute;
      bottom: var(--indicator-bottom);
      left: var(--indicator-left);

      display: flex;

      width: 100%;

      .indicator-item {
        box-sizing: border-box;
        margin: 0 3px;

        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: rgba(255, 255, 255, 0.3);
        
        text-align: center;
        line-height: 6px;
      }
      .indicator-item-active {
        width: 10px;
        background-color: $color-main;
      }
    }
  }
</style>
