<template>
  <confirm ref="payConfirm" class="pay-confirm">
    <div>需支付: <span>￥</span><strong class="price">{{price}}</strong></div>
  </confirm>
</template>

<script>
  import Confirm from 'common/confirm/Confirm.vue'

  export default {
    name: 'PayConfirm',
    components: {
      Confirm 
    },
    data () {
      return {
        price: 0,
      }
    },
    methods: {
      show (price) {
        this.price = price
        return this.$refs.payConfirm.show()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pay-confirm {
    span {
      color: $color-main;
    }
    .price {
      font-size: $size-large;
      color: $color-main;
    }
  }
</style>