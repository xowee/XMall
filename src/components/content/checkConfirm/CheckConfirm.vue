<template>
  <confirm :cancel-visible="false" ref="checkConfirm" class="check-confirm">
    <img src="~assets/img/content/check.svg" alt="">
    <strong>{{message}}</strong>
  </confirm>
</template>

<script>
  import Confirm from 'common/confirm/Confirm.vue'
  
  export default {
    name: 'CheckConfirm',
    components: {
      Confirm,
    },
    data() {
      return {
        message: '',
      }
    },
    methods: {
      show (message) {
        this.message = message
        return this.$refs.checkConfirm.show()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .check-confirm {
    img {
      width: 30px;
      height: 30px;
    }
    strong {
      display: block;
      padding-top: 10px;
      font-size: $size-normal;
    }
  }
</style>