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
            hint: '',
          }
        }
      },
    },
    methods: {
      hide () {
        this.$emit('hide')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sku-detail-header {
    display: flex;
    position: relative;

    padding-left:26vw;
    padding-bottom: 20px;
    
    border-bottom: $border;
    .img {
      flex-shrink: 0;
      position: absolute;
      left: 0;
      bottom: 20px;

      width: 26vw;    
      
      border-radius: 1vw;
      
      box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 1vw;
    }
    .detail-info {
      padding: 32px 0 0 16px;

      height: 100px;
      
      font-size: $size-normal;
      line-height: 18px;
      text-align: left;
      .price {
        font-size: $size-large;
        color: $color-main;
      }
    }
    .close {
      position: absolute;
      right: 0;

      width: 18px;
      height: 18px;
      
      line-height: 18px;
    }
  }
</style>
