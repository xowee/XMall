<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive exclude="Detail">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <loader class="loader"></loader>
  </div>
</template>

<script>
  import Loader from 'common/loader/Loader.vue'
    
  export default {
    name: 'App',
    components: {
      Loader,
    },
    data () {
      return {
        transitionName: 'fade',
      }
    },
    watch: {
      $route () {
        this.$store.commit('setLoading', true)
        // const toIndex = to.meta.index
        // const fromIndex = from.meta.index
        // // console.log(toIndex + '::' + fromIndex)
        // if (toIndex === 3 || toIndex === 2 && fromIndex === 3 || !fromIndex) {
        //   this.transitionName = ''
        // } else {
        //   this.transitionName = toIndex > fromIndex ? 'slide-left' : 'slide-right'
        // }
      },
    },
  }
</script>

<style lang="scss">
  @import "./assets/style/normalize.css";
  @import "./assets/style/base.scss";

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 300ms ease-in-out;
  }
  // .slide-right-enter-active,
  // .slide-right-leave-active,
  // .slide-left-enter-active,
  // .slide-left-leave-active {
  //   transition: opacity 300ms ease-in-out;
  // }
  // .slide-right-enter {
  //   opacity: 0;
  // }
  // .slide-right-leave-to {
  //   opacity: 0;
  // }
  // .slide-left-enter {
  //   opacity: 0;
  // }
  // .slide-left-leave-to {
  //   opacity: 0;
  // }
</style>
