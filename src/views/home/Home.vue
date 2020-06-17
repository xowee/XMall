<template>
  <div id="home">
    <home-nav-bar class="home-nav-bar"></home-nav-bar>
    <copy-right></copy-right>
    <tab-control 
      class="fixed" 
      v-show="tabControlVisible" 
      :tabs="['流行', '上新', '热销']" 
      @tabclick="tabClick" 
      ref="tabControlFixed">
    </tab-control>
    <scroll class="wrapper" :pull-up-load="true" :probe-type="3" @pullingUp="loadMore" @scroll="scroll" ref="scroll">
      <div class="content">
        <home-swiper class="swiper" :banners="banners" ref="homeSwiper"></home-swiper>
        <div class="background">
          <home-recommend-view 
            class="recommend-view" 
            :recommends="recommends" 
            @recommendImgLoaded="recommendImgLoaded">
          </home-recommend-view>
          <home-feature-view :features="features" @featureImgLoaded="featureImgLoaded"></home-feature-view>
          <div class="line"></div>
          <div class="tab-control">
            <tab-control :tabs="['流行', '上新', '热销']" @tabclick="tabClick" ref="tabControl"></tab-control>
          </div>
          <good-list :goodList="goodList[type].list" @goodImgLoaded="goodImgLoaded" ref="goodList"></good-list>
        </div>
      </div>
    </scroll>
    <backtop 
      class="back-top" 
      @click.native="backTop" 
      :back-top-visible="this.$store.state.backTopStatus.visible">
    </backtop>
  </div>
</template>

<script>
  import HomeNavBar from './childComponents/HomeNavBar.vue'
  import HomeSwiper from './childComponents/HomeSwiper.vue'
  import HomeRecommendView from './childComponents/HomeRecommendView.vue'
  import HomeFeatureView from './childComponents/HomeFeatureView.vue'

  import TabControl from 'common/tabcontrol/TabControl.vue'
  import Scroll from 'common/scroll/Scroll.vue'

  import CopyRight from 'content/copyRight/CopyRight.vue'
  import GoodList from 'content/goodList/GoodList.vue'

  import {getMultiData, getHomeData, getFeatureData} from 'network/home.js'

  import {debounce} from '@/common/utils.js'
  import {backtopMixin} from '@/common/mixins.js'

  export default {
    name: 'Home',
    mixins: [backtopMixin],
    components: {
      HomeNavBar,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,

      TabControl,
      Scroll,

      CopyRight,
      GoodList,
    },
    data () {
      return {
        banners: [],
        recommends: [],
        features: [],
        goodList: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        type: 'pop',
        
        tabControlVisible: false,
        tabOffsetTop: 0,

        setTabTopDebounce: {},
      }
    },
    created () {
      getMultiData().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })

      getFeatureData().then(res => {
        this.features = res.data.list.slice(1, 9)
      })

      this.getHomeData('pop')
      this.getHomeData('new')
      this.getHomeData('sell')
    },
    mounted () {
      // 防抖
      this.setTabTopDebounce = debounce(this.setTabTop)
      this.setTabTopDebounce()
    },
    activated () {
      this.$refs.homeSwiper && this.$refs.homeSwiper.startTimer()
      this.$store.commit('setBackTopVisible', false)
      this.$store.commit('setLoading', false)
    },
    deactivated () {
      this.$refs.homeSwiper && this.$refs.homeSwiper.stopTimer()
    },
    methods: {
      getHomeData(type) {
        let page = this.goodList[type].page + 1
        getHomeData(type, page).then(res => {
          this.goodList[type].list.push(...res.data.list)
          this.goodList[type].page++

          this.$refs.scroll.refreshDebounce()
          this.$refs.scroll.finishPullUp()
        }).catch(() => {
          this.$toast.showMessage('已经到底了~')
          this.$refs.scroll.finishPullUp()
        })
      },
      tabClick (index) {
        const oldType = this.type
        switch (index) {
          case 0: this.type = 'pop'
          break
          case 1: this.type = 'new'
          break
          case 2: this.type = 'sell'
          break
        }
        if (oldType !== this.type) {
          this.$refs.goodList.initColList()
        }
        this.$refs.tabControlFixed.curIndex = index
        this.$refs.tabControl.curIndex = index
      },
      loadMore () {
        this.getHomeData(this.type)
      },
      scroll (pos) {  
        // console.log(pos.y, -this.tabOffsetTop)
        // 监听位置，选择是否显示backtop按钮
        this.showBackTop(pos)

        // 监听位置，选择是否固定tabControl
        if (pos.y <= -this.tabOffsetTop && this.tabControlVisible === false) {
          this.tabControlVisible = true
        } else if (pos.y > -this.tabOffsetTop && this.tabControlVisible === true) {
          this.tabControlVisible = false
        }
      },
      setTabTop () {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      recommendImgLoaded () {
        this.setTabTopDebounce()
        this.$refs.scroll.refreshDebounce()
      },
      featureImgLoaded () {
        this.setTabTopDebounce()
        this.$refs.scroll.refreshDebounce()
      },
      goodImgLoaded () {
        this.$refs.scroll.refreshDebounce()
      },
    },
  }
</script>

<style lang="scss" scoped>
  #home {
    @include fill-viewport;
    .home-nav-bar {
      position: fixed;
      top: 0;
    }
    .fixed {
      position: fixed;
      top: $nav-bar-height;
    }
    .wrapper {
      position: fixed;
      top: $nav-bar-height;
      bottom: 0;
      overflow: hidden;
      // height: calc(100% - #{$nav-bar-height});
      .background {
        padding: $padding-vertical $padding-horizontal;
        background-color: $color-back;
        .line {
          @include line;
          &::after {
            width: 90%;
          }
        }
        .tab-control>div {
          border-radius: 0 0 14px 14px;
        }
      }
    }
    .back-top {
      bottom: 2vh;
    }
  }
</style>
