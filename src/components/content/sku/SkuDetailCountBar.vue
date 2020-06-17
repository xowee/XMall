<template>
  <div class="sku-detail-count-bar">
    <div>购买数量</div>
    <count-bar 
      :current-count="this.$store.state.skuInfo.currentCount"
      :decreasable="decreasable" 
      :increasable="increasable"
      @decreaseGoodCount="decreaseGoodCount()" 
      @increaseGoodCount="increaseGoodCount()"
    ></count-bar>
  </div>
</template>

<script>
import {countBarMixin} from '@/common/mixins.js'

export default {
  name: 'SkuDetailCountBar',
  mixins: [countBarMixin]
}
</script>

<style>
  .sku-detail-count-bar {
    display: flex;
    justify-content: space-between;

    padding: 10px 0;
    
    line-height: 30px;
    font-size: 16px;
  }
</style>