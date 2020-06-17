<template>
  <div class="cart-list" v-if="$store.state.cartInfo.length > 0">
    <div class="shop-list" v-for="shopId in shopList" :key="shopId">
      <div>
        <check-box 
          background-color="#aaa" 
          :box-checked="$store.getters.shopChecked(shopId)" 
          @click.native="checkShopGood({shopId})">
        </check-box>
        <div class="shop-name">{{getShopName(shopId)}}</div>
      </div>
      <cart-list-item
        v-for="good in getGoodList(shopId)" 
        :key="good.skuId" 
        :good="good"
        @showSku="showSku"
      />
    </div>
  </div>
  <div v-else class="cart-empty">
    <img src="~assets/img/cart/cart_empty.svg" alt="购物车为空">
    <div>你的购物车空空如也</div> 
  </div>
</template>

<script>
  import CartListItem from './CartListItem.vue'

  import CheckBox from 'common/checkBox/CheckBox.vue'

  export default {
    name: 'CartList',
    components: {
      CartListItem,
      CheckBox,
    },
    data () {
      return {
        boxChecked: true
      }
    },
    computed: {
      shopList () {
        return Array.from(new Set(this.$store.state.cartInfo.map(obj => obj.shopInfo.shopId)))
      }
    },
    methods: {
      getGoodList (shopId) {
        return this.$store.state.cartInfo.filter(obj => obj.shopInfo.shopId === shopId)
      },
      getShopName (shopId) {
        return this.$store.state.cartInfo.find(obj => obj.shopInfo.shopId === shopId).shopInfo.shopName
      },
      checkShopGood (shopInfo) {
        return this.$store.dispatch('checkShopGood', shopInfo)
      },
      showSku (goodInfo) {
        this.$emit('showSku', goodInfo)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cart-list {
    padding: $padding-vertical $padding-horizontal;
    .shop-list {
      background-color: $color-light;
      margin-bottom: 15px;
      padding: 15px $padding-horizontal 0;
      border-radius: 4px;
      .shop-name {
        height: 20px;
        line-height: 20px;
        display: inline-block;
        vertical-align: top;
        padding-left: 10px;
      }
    }
  }
  .cart-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: $size-large;
    line-height: 1.5;
    text-align: center;
    color: #8a8a8a;
    img {
      width: 50vw;
      padding-top: 4vh;
    }
    div {
      padding-top: 4vh;
    }
  }
</style>
