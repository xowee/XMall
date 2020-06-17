<template>
  <div @click="showSku()">
    <sku ref="sku">
      <div class="sure" @click.prevent="buy()">确定</div>
      <pay-confirm ref="payConfirm"></pay-confirm>
      <check-confirm ref="checkConfirm"></check-confirm>
    </sku>
    购买
  </div>
</template>

<script>
  import Sku from 'content/sku/Sku.vue'
  import PayConfirm from 'content/payConfirm/PayConfirm.vue'
  import CheckConfirm from 'content/checkConfirm/CheckConfirm.vue'

  export default {
    name: 'DetailSkuBuy',
    components: {
      Sku,
      PayConfirm,
      CheckConfirm
    },
    data () {
      return {
        message: ''
      }
    },
    methods: {
      showSku () {
        this.$refs.sku.show()
      },
      buy () {
        const price = this.$store.getters.skuPrice.split('￥')[1] * this.$store.state.skuInfo.currentCount
        this.$refs.payConfirm.show(price.toFixed(2)).then(() => {
          this.$store.commit('setLoading', true)
          return this.$refs.checkConfirm.show('支付成功~')
        }).then(() => {
          this.$refs.sku.hide()
        }).catch(() => {
        }).finally(() => {
          this.$store.commit('setLoading', false)
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sure {
    @include button;
  }
</style>
