<template>
  <div class="cart-bottom-bar">
    <div class="select-all">
      <check-box class="select-all-button" :box-checked="$store.getters.allChecked" @click.native="checkAllGood()"></check-box>
      <div class="select-all-text">全选({{$store.getters.goodCheckedCount}})</div>
    </div>
    <div class="action">
      <div class="pay" v-if="paying">
        <div class="pay-text">
          <strong>合计:</strong>
          <span class="red">￥<strong>{{$store.getters.goodPriceTotal}}</strong></span>
        </div> 
        <span class="button" @click="pay()">结算</span>
      </div>
      <div class="delete" v-else>
        <span class="button" @click="deleteGood()">删除</span>
      </div>
    </div>
    <confirm ref="deleteConfirm">确定要删除这{{$store.getters.goodCheckedCount}}个商品么？</confirm>
    <pay-confirm ref="payConfirm"></pay-confirm>
    <check-confirm ref="checkConfirm"></check-confirm>
  </div>
</template>

<script>
  import CheckBox from 'common/checkBox/CheckBox.vue'
  import Confirm from 'common/confirm/Confirm.vue'

  import PayConfirm from 'content/payConfirm/PayConfirm.vue'
  import CheckConfirm from 'content/checkConfirm/CheckConfirm.vue'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckBox,
      Confirm,

      PayConfirm,
      CheckConfirm,
    },
    props: {
      paying: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      checkAllGood () {
        this.$store.dispatch('checkAllGood')
      },
      deleteGood () {
        if (this.$store.getters.goodCheckedCount < 1) {
          this.$toast.showMessage('请选择要删除的商品~')
        } else {
          this.$refs.deleteConfirm.show().then(() => {
            this.$store.commit('setLoading', true)
            return this.$store.dispatch('deleteCheckedGood')
          }).catch(() => {
          }).finally(() => {
            this.$store.commit('setLoading', false)
          })
        }
      },
      pay () {
        if (this.$store.getters.goodCheckedCount < 1) {
          this.$toast.showMessage('请选择要支付的商品~')
        } else {
          this.$refs.payConfirm.show(this.$store.getters.goodPriceTotal).then(() => {
            this.$store.commit('setLoading', true)
            return this.$store.dispatch('deleteCheckedGood')
          }).then(() => {
            this.$refs.checkConfirm.show('支付成功~')
          }).catch(() => {
          }).finally(() => {
            this.$store.commit('setLoading', false)
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cart-bottom-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 15px;
    height: $bottom-bar-height;
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
  .select-all {
    display: flex;
    align-items: center;
    height: 20px;
    .select-all-text {
      padding-left: 5px;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
    }
  }
  .item {
    display: flex;
    align-items: center;
    font-size: $size-mini;
  }
  .pay{
    @extend .item;
    .red {
      color: $color-main;
    }
    .pay-text>span>strong {
      padding-right: 15px;
      font-size: $size-large;
      font-weight: normal;
    }
  }
  .delete {
    @extend .item;
  }
  .button {
    padding: 6px 16px 4px;
    font-size: $size-middle;
    color: $color-light;
    background-color: $color-main;
    border-radius: 14px;
  }
</style>
