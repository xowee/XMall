<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar'
  }
</script>

<style scoped>
  .tab-bar {
    display: flex;
    text-align: center;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;


    height: 49px;

    font-size: 10px;

    background-color: #fff;
  }
</style>
