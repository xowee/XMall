<template>
  <div class="nav-bar" :style="{'backgroundColor': backgroundColor, 'color': color}">
    <div class="left" @click="clickLeftButton"><slot name="left"></slot></div>
    <div class="center" @click="clickCenterButton"><slot name="center"></slot></div>
    <div class="right" @click="clickRightButton"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    props: {
      backgroundColor: {
        type: String,
        default: '#d81e06'
      },
      color: {
        type: String,
        default: '#fff'
      },
    },
    methods: {
      clickLeftButton () {
        this.$emit('clickLeftButton')
      },
      clickCenterButton () {
        this.$emit('clickCenterButton')
      },
      clickRightButton () {
        this.$emit('clickRightButton')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .nav-bar {
    display: flex;

    width: 100%;
    height: $nav-bar-height;

    text-align: center;
    line-height: 44px;
    .left, .right {
      width: 60px;
    }

    .center {
      flex: 1;
    }
  }
</style>