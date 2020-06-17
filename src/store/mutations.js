import {deepCopy} from '@/common/utils.js'

const mutations = {
  /**
   * 将state的属性替换为自身的深拷贝
   * @param {*} state 
   * @param {String} target 
   */
  deepCopyReplace(state, target) {
    state[target] = deepCopy(state[target])
  },
  /**
   * 设置回到顶部按钮是否可见
   * @param {*} state 
   * @param {Boolean} val 
   */
  setBackTopVisible (state, val) {
    state.backTopStatus.visible = val
  },
  /**
   * 设置回到顶部按钮监听状态
   * @param {*} state 
   * @param {*} val 
   */
  setBackTopListening (state, val) {
    state.backTopStatus.listening = val
  },
  /**
   * 添加商品信息至购物车
   * @param {*} state 
   * @param {Object} val 
   */
  addToCart (state, val) {
    state.cartInfo.push(val)
  },
  /**
   * 更改购物车从商品数量
   * @param {*} state 
   * @param {Object} payload 
   */
  changeGoodCount (state, payload) {
    payload.good.currentCount += payload.currentCount
  },
  changeGood (state, payload) {
    let good = state.cartInfo.find((obj) => {
      return obj.iid === payload.goodInfo.iid && obj.selectedItem.xdSkuId === payload.goodInfo.xdSkuId
    })
    good.selectedItem = payload.val.selectedItem
    good.currentCount = payload.goodInfo.currentCount ? payload.goodInfo.currentCount : payload.val.currentCount
    good.selects = payload.val.selects
  },
  updateState(state, payload) {
    state[payload.stateName] = payload.item
  },
  /**
   * 购物车全选商品
   * @param {*} state 
   * @param {*} checked 
   */
  checkAllGood (state, checked) {
    state.cartInfo.map(obj => obj.checked = checked)
  },
  /**
   * 购物车选择商品号为shopId的商品
   * @param {*} state 
   * @param {String} shopId 
   */
  checkShopGood (state, {checked, shopId}) {
    state.cartInfo.filter(obj => obj.shopInfo.shopId === shopId).map(obj => obj.checked = checked)
  },
  /**
   * 购物车根据iid和skuid选择对应商品
   * @param {*} state 
   * @param {Object} {iid, skuid}
   */
  checkGood (state, {iid, selectedItem}) {
    let good = state.cartInfo.find(obj => obj.iid === iid && obj.selectedItem.xdSkuId === selectedItem.xdSkuId)
    good.checked = !good.checked

    let tmpCartInfo = JSON.parse(JSON.stringify(state.cartInfo))
    state.cartInfo = tmpCartInfo
  },
  /**
   * 购物车删除选中商品
   * @param {*} state 
   */
  deleteCheckedGood (state) {
    state.cartInfo = state.cartInfo.filter(obj => !obj.checked)
  },
  /**
   * 购物车删除指定商品
   * @param {*} state 
   * @param {Object} goodInfo 
   */
  deleteGood (state, goodInfo) {
    state.cartInfo = state.cartInfo.filter((obj) => {
      // console.log(obj.iid !== goodInfo.iid, obj.selectedItem.xdSkuId !== goodInfo.xdSkuId, '===')
      return obj.iid !== goodInfo.iid || obj.selectedItem.xdSkuId !== goodInfo.xdSkuId
    })
  },
  /**
   * 初始化skuInfo
   */
  initSkuInfo (state, skuInfo) {
    state.skuInfo = skuInfo

    state.skuInfo.currentCount = 1
    state.skuInfo.selects = []
    for (let prop of skuInfo.props) {
      state.skuInfo.selects.push({
        index: -1,
        name: '',
        label: prop.label,
        type: prop.list[0].type
      })
    }
  },
  /**
   * 设置sku参数选择状态列表
   * @param {*} state 
   * @param {Object} item
   */
  setSkuSelects (state, item) {
    let tmpSkuInfo = JSON.parse(JSON.stringify(state.skuInfo))
    let obj = tmpSkuInfo.selects.find(obj => obj.type === item.type)
    obj.index = item.index
    obj.name = item.name
    state.skuInfo = tmpSkuInfo
  },
  /**
   * 设置sku数量
   */
  setSkuCurrentCount (state, currentCount) {
    let tmpSkuInfo = JSON.parse(JSON.stringify(state.skuInfo))
    tmpSkuInfo.currentCount = currentCount
    state.skuInfo = tmpSkuInfo
  },
  /**
   * 是否显示加载样式
   * @param {*} state 
   * @param {Boolean} val 
   */
  setLoading (state, val) {
    state.loading = val
  },
  /**
   * 购物车是否有新项目
   */
  setCartHasNew (state, val) {
    state.cartHasNew = val
  },
}

export default mutations