<template>
  <div class="good-param">
    <div class="desc">{{param}}</div>
    <div class="drop-down"><img src="~assets/img/cart/drop_down.svg"></div>
    <div class="void"></div>
  </div>
</template>

<script>
  export default {
    name: 'GoodParam',
    props: {
      param: {
        type: String,
        default: ''
      },
    },
  }
</script>

<style lang="scss" scoped>
  .good-param {
    display: flex;
    font-size: $size-mini;
    color: $color-hint;
    .param-base {
      @include vertical-align-center;
      background-color: $color-back;
    }
    .desc {
      @extend .param-base;
      padding: 2px 8px;
      border-radius: 8px 0 0 8px;
    }
    .drop-down {
      @extend .param-base;
      padding-right: 8px;
      border-radius: 0 8px 8px 0;
      position: relative;
    }
    img {
      display: block;
      position: absolute;
      top: 50%;
      right: 50%;
      margin-top: -5px;
      width: 10px;
      height: 10px;
    }
    .void {
      flex-grow: 1;
      flex-shrink: 1;
    }
  }
</style>
