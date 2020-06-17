<template>
  <nav-bar background-color="#fff" color="#000" @clickRightButton="clickRightButton()">
    <template v-slot:left>
      <img src="~assets/img/navbar/back.svg" alt="" @click="goBack()" />
    </template>
    <template v-slot:center>
      <header>购物车({{$store.getters.goodCount}})</header>
    </template>
    <template v-slot:right>
      {{actionName}}
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from 'common/navBar/NavBar.vue'
  
  export default {
    name: 'CartNavBar',
    components: {
      NavBar,
    },
    props: {
      actionName: {
        type: String,
        default: '编辑'
      }
    },
    methods: {
      goBack () {
        this.$router.back()
      },
      clickRightButton () {
        this.$emit('clickRightButton')
      },
    },
  }
</script>

<style lang="scss" scoped>
  img {
    @include go-back;
  }
  header {
    @include nav-title;
  }
</style>