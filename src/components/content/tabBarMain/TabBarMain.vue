<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <template v-slot:item-img>
        <img src="~assets/img/tabbar/home.svg" alt="首页" />
      </template>
      <template v-slot:item-img-act>
        <img src="~assets/img/tabbar/home-act.svg" alt="首页">
      </template>
      <template v-slot:item-name>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template v-slot:item-img>
        <img src="~assets/img/tabbar/category.svg" alt="分类" />
      </template>
      <template v-slot:item-img-act>
        <img src="~assets/img/tabbar/category-act.svg" alt="分类">
      </template>
      <template v-slot:item-name>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <template v-slot:item-img>
        <img src="~assets/img/tabbar/cart.svg" alt="购物车" />
      </template>
      <template v-slot:item-img-act>
        <img src="~assets/img/tabbar/cart-act.svg" alt="购物车">
      </template>
      <template v-slot:item-name>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template v-slot:item-img>
        <img src="~assets/img/tabbar/profile.svg" alt="我" />
      </template>
      <template v-slot:item-img-act>
        <img src="~assets/img/tabbar/profile-act.svg" alt="我">
      </template>
      <template v-slot:item-name>
        <div>我</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'common/tabbar/TabBar.vue'
  import TabBarItem from 'common/tabbar/TabBarItem.vue'

  export default {
    components: {
      TabBar,
      TabBarItem,
    },
  }
</script>

<style>
</style>