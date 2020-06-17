<template>
  <div class="copy-right">
    Coded By Owen
    <p>演示作品，非商业用途</p>
  </div>
</template>

<script>
  export default {
    name: 'CopyRight'
  }
</script>

<style scoped>
  .copy-right {
    position: absolute;
    top: 44px;
    right: 0;
    left: 0;
    z-index: 0;

    padding: 15px;
    
    font-family: 'Courier New', Courier, monospace;
    line-height: 1.5;
    text-align: center;
  }
</style>