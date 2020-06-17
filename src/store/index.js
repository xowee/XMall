import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /**
     * 回到顶部按钮状态信息
     */
    backTopStatus: {
      visible: false,
      listening: true,
    },
    /**
     * 购物车商品信息
     */
    cartInfo: [],
    cartHasNew: false,
    /**
     * 加入购物车/购买前商品信息
     */
    skuInfo: {
      selects: [],
      currentCount: 1,
      skus: [],
      props: [],
    },
    loading: false,
  },
  mutations,
  actions,
  getters,
})

export default store