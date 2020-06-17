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
</style>
