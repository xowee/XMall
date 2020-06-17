<template>
  <div class="sku-detail">
    <sku-detail-header
      class="sku-detail-header"
      :header-info="getHeaderInfo()"
      @hide="hide()">
    </sku-detail-header>
    <div class="sku-detail-content">
      <div v-for="(prop, index) in $store.state.skuInfo.props" :key="index">
        <sku-detail-list :prop="prop"></sku-detail-list>
      </div>
      <sku-detail-count-bar v-if="countBarVisible"></sku-detail-count-bar>
    </div>
    <div class="sku-detail-bottom">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import SkuDetailHeader from './SkuDetailHeader.vue'
  import SkuDetailList from './SkuDetailList.vue'
  import SkuDetailCountBar from './SkuDetailCountBar.vue'

  export default {
    name: 'SkuDetail',
    components: {
      SkuDetailHeader,
      SkuDetailList,
      SkuDetailCountBar,
    },
    props: {
      countBarVisible: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      getHeaderInfo () {
        return {
          image: this.$store.getters.skuImage,
          price: this.$store.getters.skuPrice,
          stock: this.$store.getters.skuStock,
          hint: this.$store.getters.skuHint
        }
      },
      getPropList (index) {
        return this.$store.state.skuInfo.props.length > index ? this.$store.state.skuInfo.props[index] : {}
      },
      hide () {
        this.$emit('hide')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sku-detail {
    display: flex;
    flex-direction: column;

    position: fixed;
    top: 25vh;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: $color-light;
    .sku-detail-header {
      margin: 4vw 4vw 0;
      flex-shrink: 0;
    }
    .sku-detail-content {
      flex-grow: 1;

      margin: 0 4vw;
      margin-bottom: 1vh;

      overflow-y: auto;
    }
    .sku-detail-bottom {
      display: flex;
      flex-shrink: 0;

      height: 44px;
      background-color: pink;

      line-height: 44px;
      text-align: center;
    }
  }
</style>
