<template>
  <nav-bar
    class="home-nav-bar"
    color="#333"
    background-color="#fff" 
    @clickLeftButton="gotoCategoryView()"
    @clickRightButton="gotoCartView()"
  >
    <template v-slot:left>
      <img src="~assets/img/navbar/category.svg" alt="category.svg">
      <div>分类</div>
    </template>
    <template v-slot:center>
      <h3>购物</h3>
    </template>
    <template v-slot:right>
      <img src="~assets/img/navbar/cart.svg" alt="cart.svg">
      <div class="red-dot" v-show="$store.state.cartHasNew"></div>
      <div>购物车</div>
    </template>
  </nav-bar>  
</template>

<script>
  import NavBar from 'common/navBar/NavBar.vue'

  export default {
    name: 'HomeNavBar',
    components: {
      NavBar,
    },
    methods: {
      gotoCategoryView () {
        // console.log('gotoCategoryView')
        this.$router.push('/category')
      },
      gotoCartView () {
        // console.log('gotoCartView')
        this.$router.push('/cart')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .home-nav-bar {
    h3 {
      @include nav-title;
    }
    img {
      display: block;
      margin: 6px auto 2px;
      height: 22px;
      width: 22px;
    }
    div {
      font-size: $size-mini;
      line-height: $size-mini;
    }
    .red-dot {
      @include red-dot;
    }
  }
</style>