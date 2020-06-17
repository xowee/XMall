<template>
  <div class="cart-list-item">
    <check-box class="check-box" :box-checked="good.checked" @click.native="checkGood()"></check-box>
    <div class="item-detail" @click="goToDetail()">
      <div class="img"><img :src="good.selectedItem.img" alt=""></div>
      <div class="info">
        <div class="top">
          <div class="title">{{good.title}}</div>
          <div class="param"><good-param :param="param" @click.native.stop="showSku()"></good-param></div>
        </div>
        <div class="tool">
          <div class="price">￥<strong>{{price}}</strong></div>
          <count-bar 
            class="count-bar"
            :height="22"
            :current-count="good.currentCount" 
            :decreasable="decreasable"
            :increasable="increasable"
            @decreaseGoodCount="decreaseGoodCount()"
            @increaseGoodCount="increaseGoodCount()">
          </count-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GoodParam from './GoodParam.vue'

  import CheckBox from 'common/checkBox/CheckBox.vue'
  import CountBar from 'common/countBar/CountBar.vue'

  import {countBarMixin} from '@/common/mixins.js'

  export default {
    name: 'CartListItem',
    mixins: [countBarMixin],
    components: {
      GoodParam,

      CheckBox,
      CountBar,
    },
    props: {
      good: {
        type: Object,
        default () {
          return {}
        }
      },
    },
    computed: {
      param () {
        return this.good.selects.reduce((previousValue, currentValue) => {
          return previousValue + ' ' + currentValue.label + currentValue.name
        }, '')
      },
      price () {
        return (this.good.selectedItem.nowprice / 100).toFixed(2)
      },
      decreasable () {
        return this.good.currentCount > 1
      },
      increasable () {
        // const stock = this.good.skus.find(obj => obj.xdSkuId === this.good.selectedItem.xdSkuId).stock
        return this.good.currentCount < this.good.selectedItem.stock
      }
    },
    methods: {
      // 选中商品
      checkGood () {
        this.$store.commit('checkGood', this.good)
      },
      // 减少购物车中商品数量
      decreaseGoodCount () {
        if (this.decreasable) {
          this.$store.commit('changeGoodCount', {good: this.good, currentCount: -1})
        } else {
          this.$toast.showMessage('数量低于范围~')
        }
      },
      // 增加购物车中商品数量
      increaseGoodCount () {
        if (this.increasable) {
          this.$store.commit('changeGoodCount', {good: this.good, currentCount: 1})
        } else {
          this.$toast.showMessage('数量超出范围~')
        }
      },
      showSku () {
        this.$store.state.skuInfo = this.good
        this.$emit('showSku', {iid: this.good.iid, xdSkuId: this.good.selectedItem.xdSkuId})
      },
      goToDetail () {
        this.$router.push('/detail/'+this.good.iid)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cart-list-item {
    display: flex;
    align-items: center;
    .check-box {
      flex-shrink: 0;
    }
    .item-detail {
      display: flex;
      padding-top: 15px;
      .img {
        flex-shrink: 0;
        margin-bottom: 15px;
        margin-left: 10px;
        width: 70px;
        height: 80px;
        overflow: hidden;
        border-radius: 4px;
        img {
          display: block;
          width: 100%;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
        .title {
          display: -webkit-box;
          margin-bottom: 4px;
          font-size: $size-middle;
          line-height: 1.3;
          overflow: hidden;
          color: black;

          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .tool {
          display: flex;
          flex-grow: 1;
          justify-content: space-between;
          align-items: center;
          .price {
            font-size: $size-mini;
            color: $color-main;
          }
          .price>strong {
            font-size: $size-large;
            font-weight: normal;
          }
        }
      }
    }
  }
</style>
