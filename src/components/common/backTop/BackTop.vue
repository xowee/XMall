<template>
  <fade>
    <div class="my-back-top" v-show="backTopVisible">
      <img src="~assets/img/common/backtop.png" alt="回到顶部">
    </div>
  </fade>
</template>

<script>
  import Fade from 'common/transition/Fade.vue'

  export default {
    name: 'BackTop',
    components: {
      Fade
    },
    props: {
      backTopVisible: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-back-top {
    position: fixed;
    bottom: 8vh;
    right: 2vw;
    z-index: 999;
    img {
      width: 43px;
      height: 43px;
    }
  }
</style>