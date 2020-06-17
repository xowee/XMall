<template>
  <nav-bar class="detail-nav-bar" background-color="#fff" color="#000">
    <template v-slot:left>
      <img class="back" src="~assets/img/navbar/back.svg" alt="返回" @click="goBack" />
    </template>
    <template v-slot:center>
      <ul>
        <li v-for="(item, index) in ['商品', '评价', '详情', '推荐']" 
            :key="index" 
            :class="showActive(index)"
            @click="navClick(index)">
          {{item}}
        </li>
      </ul>
    </template>
    <template v-slot:right>
      <div class="cart">
        <img src="~assets/img/navbar/cart.svg" alt="购物车" @click="goToCart()">
        <div class="red-dot" v-show="$store.state.cartHasNew"></div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from 'common/navBar/NavBar.vue'

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar,
    },
    data () {
      return {
        currentIndex: 0
      }
    },
    methods: {
      showActive (index) {
        return index === this.currentIndex ? {active:true} : {}
      },
      navClick (index) {
        this.$emit('navClick', index)
        this.currentIndex = index
      },
      goBack () {
        this.$router.back()
      },
      goToCart () {
        this.$router.push('/cart')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail-nav-bar {
    .back {
      @include go-back;
    }
    ul {
      display: flex;
      justify-content: center;
      list-style: none;
      li {
        flex-shrink: 0.8;
        width: 50px;
        font-size: $size-normal;
      }
      .active {
        color: $color-main;
        font-size: $size-large;
        font-weight: bold;
        transition: font-size 120ms ease-in;
      }
    }
    .cart {
      position:relative;
      width: 100%;
      height: 100%;
      img {
        position: absolute;
        left: 17px;
        bottom: 9px;
        width: 26px;
        height: 26px;
      }
      .red-dot {
        @include red-dot;
      }
    }
  }
</style>
