<template>
  <div class="swiper-item" ref="swiperItem">
    <div class="img">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwiperItem',
  props: {
    css: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    setStyle () {
      let style = this.$refs.swiperItem.style
      style.setProperty('--padding', this.css.padding)
      style.setProperty('--height', this.css.height)
      style.setProperty('--radius', this.css.radius)
    }
  },
  mounted () {
    if (Object.keys(this.css).length) {
      this.setStyle()
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper-item {
    --padding: 0;
    --height: x;
    --radius: 0;
    width: 100%;
    flex-shrink: 0;
    padding: var(--padding);
    .img {
      width: 100%;
      height: var(--height);
      border-radius: var(--radius);
      overflow: hidden;
      img {
        width: 100%;
        display: block;
      }
    }
  }
</style>
