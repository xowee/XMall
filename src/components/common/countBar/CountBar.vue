<template>
  <div class="count-bar" :style="getCountBarStyle()">
    <div class="sub" :class="{disable: !decreasable}" :style="getBtnStyle()" @click.stop="decreaseGoodCount()">
      <img src="~assets/img/common/sub_disable.svg" alt="-">
    </div>
    <div class="num" :style="getNumStyle()" @click.stop="">{{currentCount}}</div>
    <div class="plu" :class="{disable: !increasable}" :style="getBtnStyle()" @click.stop="increaseGoodCount()">
      <img src="~assets/img/common/plu_disable.svg" alt="+">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CountBar',
    props: {
      currentCount: {
        type: Number,
        default: 1
      },
      decreasable: {
        type: Boolean,
        default: true
      },
      increasable: {
        type: Boolean,
        default: true
      },
      height: {
        type: Number,
        default: 30
      },
    },
    methods: {
      decreaseGoodCount () {
        this.$emit('decreaseGoodCount')
      },
      increaseGoodCount () {
        this.$emit('increaseGoodCount')
      },
      getCountBarStyle () {
        return {
          height: `${this.height}px`,
          fontSize: `${this.height * 18 / 30}px`
        }
      },
      getNumStyle () {
        return {
          width: `${this.height * 5 / 3}px`,
          // lineHeight: `${this.height}px`
        }
      },
      getBtnStyle () {
        return {
          width: `${this.height}px`,
          padding: `${this.height * 8 / 30}px`
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .count-bar {
    display: flex;
    .enable {
      background-color: rgba(0, 0, 0, .1);
    }
    .disable {
      background-color: rgba(0, 0, 0, .04);
    }
    .num {
      @extend .enable;
      @include vertical-align-center;
      margin: 0 1px;
      text-align: center;
    }
    .sub, .plu {
      @extend .enable;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
</style>
