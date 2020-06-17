import Backtop from 'common/backtop/Backtop.vue'
import CountBar from 'common/countBar/CountBar.vue'
// import {mapState} from 'vuex'

export const backtopMixin = {
  components: {
    Backtop
  },
  data () {
    return {
      posPrevious: {}
    }
  },
  methods: {
    backTop () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    showBackTop (pos) {
      if (!this.$store.state.backTopStatus.listening) return
      if (!this.$store.state.backTopStatus.visible && pos.y <= -1000 && this.posPrevious.y - pos.y < 0) {
        this.$store.commit('setBackTopVisible', true)
      } else if (this.$store.state.backTopStatus.visible && (pos.y > -1000 || this.posPrevious.y - pos.y > 0)){
        this.$store.commit('setBackTopVisible', false)
      }
      this.posPrevious = pos
    }
  }
}

export const countBarMixin = {
  components: {
    CountBar
  },
  computed: {
    // ...mapState({
    //   currentCount: state => state.skuInfo.currentCount
    // }),
    decreasable () {
      return this.$store.state.skuInfo.currentCount > 1
    },
    increasable () {
      return this.$store.state.skuInfo.currentCount < this.$store.getters.skuStock
    }
  },
  methods: {
    decreaseGoodCount () {
      if (this.decreasable) {
        this.$store.commit('setSkuCurrentCount', this.$store.state.skuInfo.currentCount - 1)
      } else {
        this.$toast.showMessage('数量低于范围~')
      }
    },
    increaseGoodCount () {
      if (this.increasable) {
        this.$store.commit('setSkuCurrentCount', this.$store.state.skuInfo.currentCount + 1)
      } else {
        this.$toast.showMessage('数量超出范围~')
      }
    }
  }
}
  