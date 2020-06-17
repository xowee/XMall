<template>
  <div class="detail-recommend-info">
    <header>热门推荐</header>
    <good-list :good-list="recommendList" @goodImgLoaded="recommendImgLoaded"></good-list>
    <footer>已经到底了~</footer>
  </div>
</template>

<script>
  import GoodList from 'content/goodList/GoodList.vue'
  import {getRecommend} from 'network/detail.js'
  export default {
    name: 'DetailRecommendInfo',
    components: {
      GoodList
    },
    data () {
      return {
        recommendList: {
          type: Array,
          default () {
            return []
          }
        }
      }
    },
    created () {
      getRecommend().then(res => {
        this.recommendList = res.data.list
      })
    },
    methods: {
      recommendImgLoaded() {
        this.$emit('recommendImgLoaded')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail-recommend-info {
    padding: 15px 4vw;
    margin-top: 4px;
    background-color: $color-back;

    @mixin title {
      text-align: center;
      font-size: $size-normal;
      font-weight: bold;
      color: $color-hint;
    }
    footer {
      @include title;
    }
    header {
      @include title;
      color: $color-main;
    }
  }
</style>
