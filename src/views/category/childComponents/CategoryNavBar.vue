<template>
  <nav-bar class="category-nav-bar" background-color="#fff" color="#000">
    <template v-slot:left>
      <img src="~assets/img/navbar/back.svg" alt="" @click="goBack()">
    </template>
    <template v-slot:center>
      <header>全部类目</header>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from 'common/navBar/NavBar.vue'

  export default {
    name: 'CategoryNavBar',
    components: {
      NavBar
    },
    methods: {
      goBack () {
        this.$router.back()
      },
    },
  }
</script>

<style lang="scss" scoped>
  // @import 'assets/scss/base';
  .category-nav-bar {
    border-bottom: $border;
    img {
      @include go-back;
    }
    header {
      @include nav-title;
    }
  }
</style>