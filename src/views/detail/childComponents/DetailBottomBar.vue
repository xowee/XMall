<template>
  <div class="detail-bottom-bar">
    <div class="left-item">
      <div>
        <span>客服</span> 
      </div>
      <div>
        <span>店铺</span>
      </div>
      <div>
        <span>收藏</span>
      </div>
    </div>
    <div class="right-item">
      <detail-sku-add :sku-info="skuInfo"></detail-sku-add>
      <detail-sku-buy :sku-info="skuInfo"></detail-sku-buy>
    </div>
  </div>
</template>

<script>
  import DetailSkuAdd from './DetailSkuAdd.vue'
  import DetailSkuBuy from './DetailSkuBuy.vue'

  export default {
    name: 'DetailBottomBar',
    components: {
      DetailSkuAdd,
      DetailSkuBuy
    },
    props: {
      skuInfo: {
        type: Object,
        default () {
          return {}
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail-bottom-bar {
    display: flex;
    
    width: 100%;
    height: $bottom-bar-height;
    
    background-color: $color-light;
    .bar-item {
      display: flex;
      text-align: center;
      &>div {
        flex: 1;
      }
    }
    .left-item {
      @extend .bar-item;
      flex: 2;
      font-size: $size-small;
      line-height: 1;
      span {
        color: $color-normal;
      }
      .icon {
        display: block;
        margin: 8px auto 2px;
        width: 22px;
        height: 22px;
        background: url(~assets/img/detail/detail_bottom.png) 0 0/100%;
        content: "";
      }
      div:first-child>span::before {
        @extend .icon;
        background-position: 0 -52px;
      }
      div:nth-child(2)>span::before {
        @extend .icon;
        background-position: 0 -98px;
      }
      div:nth-child(3)>span::before {
        @extend .icon;      
        background-position: 0 1px;
      }
    }
    .right-item {
      @extend .bar-item;
      flex: 3;
      font-size: $size-normal;
      line-height: $bottom-bar-height;
      div:first-child {
        background-color: #ffe817;
        color: $color-black;
      }
      div:nth-child(2) {
        background-color: $color-main;
        color: $color-light;
      }
    }
  }
</style>
