<template>
  <div class="sku-detail-header">
    <div class="img" v-if="headerInfo.image">
      <img :src="headerInfo.image" alt="">
    </div>
    <div class="detail-info">
      <div class="price">{{headerInfo.price}}</div>
      <div class="stock">库存 {{headerInfo.stock}} 件</div>
      <div class="hint">{{headerInfo.hint}}</div>
    </div>
    <div class="close" @click.stop="hide()">
      <img src="~assets/img/detail/close.svg" alt="×">
    </div>
  </div>
</template>

<script>
export default {
  name: 'sku-detail-header',
  props: {
    headerInfo: {
      type: Object,
      default () {
        return {
          image: '',
          price: 0,
          stock: 0,
          hint: ''
        }
      }
    }
  },
  methods: {
    hide () {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss" scoped>
  .sku-detail-header {
    display: flex;
    padding-left:26vw;
    padding-bottom: 20px;
    border-bottom: $border;
    position: relative;
    .img {
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 26vw;    
      border-radius: 1vw;
      box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
      flex-shrink: 0;
    }
    img {
      border-radius: 1vw;
      height: 100%;
      width: 100%;
      display: block;
    }
    .detail-info {
      height: 100px;
      text-align: left;
      padding: 32px 0 0 16px;
      line-height: 18px;
      font-size: $size-normal;
      .price {
        font-size: $size-large;
        color: $color-main;
      }
    }
    .close {
      height: 18px;
      width: 18px;
      line-height: 18px;
      position: absolute;
      right: 0;
    }
  }
  
</style>