<template>
  <div id="cart">
    <cart-nav-bar class="cart-nav-bar" :action-name="actionName" @clickRightButton="shiftAction()"></cart-nav-bar>
    <scroll class="wrapper">
      <cart-list @showSku="showSku"></cart-list>
    </scroll>
    <cart-bottom-bar class="cart-bottom-bar" :paying="paying"></cart-bottom-bar>
    <sku ref="sku"><div class="sure" @click.stop="changeToCart()">确定</div></sku>
  </div>
</template>

<script>
  import CartNavBar from './childComponents/CartNavBar.vue'
  import CartList from './childComponents/cartList/CartList.vue'
  import CartBottomBar from './childComponents/CartBottomBar.vue'

  import Scroll from 'common/scroll/Scroll.vue'

  import Sku from 'content/sku/Sku.vue'

  export default {
    name: 'Cart',
    components: {
      Scroll,
      CartNavBar,
      CartList,
      CartBottomBar,
      Sku,
    },
    data () {
      return {
        paying: true,
        goodInfo: {}
      }
    },
    created () {
      this.$store.dispatch('synLocalStorgeItem')
    },
    activated () {
      this.$store.commit('setCartHasNew', false)
      this.$store.commit('setLoading', false)
      this.paying = true
    },
    computed: {
      actionName () {
        return this.paying ? '编辑' : '完成'
      }
    },
    methods: {
      shiftAction () {
        this.paying = !this.paying
      },
      showSku (goodInfo) {
        this.goodInfo = goodInfo
        this.$refs.sku.show()
      },
      changeToCart () { 
        if (this.$store.state.skuInfo.currentCount > this.$store.getters.skuStock) {
          this.$toast.showMessage('数量超出范围~')
        } else {
          this.$store.commit('setLoading', true)
          this.$store.dispatch('changeToCart', this.goodInfo).then(() => {
            this.$refs.sku.hide()
          }).finally(() => {
            this.$store.commit('setLoading', false)
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  #cart {
    @include fill-viewport;
    .cart-nav-bar {
      position: fixed;
      top: 0;
    }
    .wrapper {
      // height: calc(100% - #{$nav-bar-height + $bottom-bar-height});
      position: fixed;
      top: $nav-bar-height;
      bottom: $bottom-bar-height;
      overflow: hidden;
    }
    .cart-bottom-bar {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
    .sure {
      @include button;
    }
  }
</style>
