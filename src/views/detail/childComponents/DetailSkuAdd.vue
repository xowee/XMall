<template>
  <div @click="showSku()">
    <sku ref="sku">
      <div class="sure" @click.stop="addToCart()">确定</div>
    </sku>
    <img-toast ref="imgToast"></img-toast>
    加入购物车
  </div>
</template>

<script>
  import ImgToast from 'common/imgToast/ImgToast.vue'

  import Sku from 'content/sku/Sku.vue'

  export default {
    name: 'DetailSkuAdd',
    components: {
      Sku,
      ImgToast
    },
    methods: {
      showSku () {
        this.$refs.sku.show()
      },
      addToCart () {
        if (!this.$store.getters.isSkuSelectFulfill) {
          this.$toast.showMessage(this.$store.getters.skuHint)
        } else {
          if (this.$store.getters.skuStock < this.$store.state.skuInfo.currentCount) {
            this.$toast.showMessage('数量超出范围~')
          } else {
            this.$store.dispatch('addToCart', this.$store.state.skuInfo).then(() => {
              this.$refs.imgToast.show('添加成功,在购物车等亲~', 2000)
              this.$refs.sku.hide()
              this.$store.commit('setCartHasNew', true)
            })
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sure {
    @include button;
  }
</style>
