<template>
  <transition name="slide-fade">
    <slot></slot>
  </transition>
</template>

<script>
  export default {
    name: 'Slide'
  }
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .6s cubic-bezier(.3, .15, .1, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(25vh);
    opacity: 0;
  }
</style>