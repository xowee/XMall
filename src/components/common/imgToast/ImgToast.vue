<template>
  <transition>
    <div class="img-toast" v-show="visible">
      <img src="~assets/img/content/check.svg" alt="">
      <div>{{message}}</div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ImgToast',
    data () {
      return {
        message: '添加成功,在购物车等亲~',
        visible: false,
      }
    },
    methods: {
      show (message, keepTime=1000) {
        this.message = message
        this.visible = true
        setTimeout(() => {
          this.visible = false
        }, keepTime)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .img-toast {
    background-color: rgba(0, 0, 0, .8);
    // width: 70vw;
    position: fixed;
    top: 40vh;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    color: #e0e0e0;
    border-radius: 6px;
    line-height: 30px;
    padding: 10px 10px 0;
    font-size: $size-middle;
    img {
      width: 30px;
      height: 30px;
      display: block;
      margin: 0 auto;
    }
  }
  .v-enter-active {
    transition: transform 300ms cubic-bezier(0,1.02,1,1.09), opacity 300ms ease;
  }
  .v-leave-active {
    transition: transform 300ms cubic-bezier(1,0,1,0), opacity 300ms ease-out;
  }
  .v-enter, .v-leave-to {
    opacity: 0;
    left: 50%;
    transform: translate(-50%, 100px) scale(0.01);
  }
</style>
