<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @navClick="navClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="wrapper" :probeType="3" @scroll="scroll" ref="scroll">
      <div class="content">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :base-info="baseInfo"></detail-base-info>
        <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
        <detail-comment-info :commentInfo="commentInfo" ref="detailCommentInfo"></detail-comment-info>
        <detail-param-info :param-info="paramInfo" ref="detailParamInfo"></detail-param-info>
        <detail-detail-info :detail-info="detailInfo" @detailImgLoaded="detailImgLoaded" ref="detailDetailInfo"></detail-detail-info>
        <detail-recommend-info @recommendImgLoaded="recommendImgLoaded" ref="detailRecommendInfo"></detail-recommend-info>
      </div>
    </scroll>
    <detail-bottom-bar class="detail-bottom-bar"></detail-bottom-bar>
    <backtop :back-top-visible="$store.state.backTopStatus.visible" @click.native="backTop"></backtop>
  </div>
</template>

<script>
  import DetailNavBar from './childComponents/DetailNavBar.vue'
  import DetailSwiper from './childComponents/DetailSwiper.vue'
  import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
  import DetailShopInfo from './childComponents/DetailShopInfo.vue'
  import DetailCommentInfo from './childComponents/DetailCommentInfo.vue'
  import DetailParamInfo from './childComponents/DetailParamInfo.vue'
  import DetailDetailInfo from './childComponents/DetailDetailInfo.vue'
  import DetailRecommendInfo from './childComponents/DetailRecommendInfo.vue'
  import DetailBottomBar from './childComponents/DetailBottomBar.vue'

  import Scroll from 'common/scroll/Scroll.vue'

  import {getDetailData, Goods, Shop, Params, Sku} from 'network/detail.js'
  import {backtopMixin} from '@/common/mixins.js'

  export default {
    name: 'Detail',
    mixins: [backtopMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailCommentInfo,
      DetailParamInfo,
      DetailDetailInfo,
      DetailRecommendInfo,
      DetailBottomBar,

      Scroll,
    },
    data () {
      return {
        topImages: [],
        baseInfo: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        skuInfo: {},

        //offsetTop
        homeOffsetTop: 0,
        commentOffsetTop: -1,
        detailOffsetTop: -1,
        recommendOffsetTop: -1,

        currentIndex: 0,
      }
    },
    created () {
      getDetailData(this.$route.params.iid).then(res => {
        this.topImages = res.result.itemInfo.topImages

        this.baseInfo = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
        
        this.shopInfo = new Shop(res.result.shopInfo)

        this.detailInfo = res.result.detailInfo

        this.paramInfo = new Params(res.result.itemParams)

        this.commentInfo = res.result.rate.list ? res.result.rate.list[0] : {}
        // console.log(res.result)
        this.skuInfo = new Sku(res.result.skuInfo, res.result.itemInfo, res.result.shopInfo)
        // 初始化vueX里的skuInfo
        this.$store.commit('initSkuInfo', this.skuInfo)
        // 设置回到顶部按钮为不可见
        this.$store.commit('setBackTopVisible', false)
      })
    },
    mounted () {
      this.getOffsetTop()
    },
    methods: {
      navClick (index) {
        let scroll = this.$refs.scroll
        if (!scroll) return
        this.getOffsetTop()
        switch(index) {
          case 0: 
            scroll.scrollTo(0, this.homeOffsetTop)
            break
          case 1: 
            scroll.scrollTo(0, -this.commentOffsetTop)
            break
          case 2: 
            scroll.scrollTo(0, -this.detailOffsetTop)
            break
          case 3: 
            scroll.scrollTo(0, -this.recommendOffsetTop)
            break
        }
      },
      getOffsetTop () {
        this.commentOffsetTop = this.$refs.detailCommentInfo.$el ? this.$refs.detailCommentInfo.$el.offsetTop : -1
        this.detailOffsetTop = this.$refs.detailDetailInfo.$el ? this.$refs.detailDetailInfo.$el.offsetTop : -1
        this.recommendOffsetTop = this.$refs.detailRecommendInfo.$el ? this.$refs.detailRecommendInfo.$el.offsetTop : -1
      },
      detailImgLoaded () {
        this.$refs.scroll.refreshDebounce()
        this.getOffsetTop()
      },
      recommendImgLoaded () {
        this.$refs.scroll.refreshDebounce()
      },
      setCurrentIndex (index) {
        if (index === this.currentIndex) return
        this.currentIndex = index
        this.$refs.detailNavBar.currentIndex = index
      },
      scroll (pos) {
        this.showBackTop(pos)

        if (-pos.y+44 < this.commentOffsetTop) {
          this.setCurrentIndex(0)
        } else if (-pos.y + 44 < this.detailOffsetTop) {
          this.setCurrentIndex(1)
        } else if (-pos.y + 44 < this.recommendOffsetTop) {
          this.setCurrentIndex(2)
        } else {
          this.setCurrentIndex(3)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  #detail {
    @include fill-viewport;
    .detail-nav-bar {
      position: fixed;
      top: 0;
    }
    .wrapper {
      position: fixed;
      top: $nav-bar-height;
      bottom: $bottom-bar-height;
      overflow: hidden;
    }
    .detail-bottom-bar {
      position: fixed;
      bottom: 0;
    }
  }
</style>
