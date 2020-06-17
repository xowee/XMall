const actions = {
  /**
   * 同步localStorge信息到vueX
   * @param {*} context 
   */
  synLocalStorgeItem (context) {
    for (let state in context.state) {
      let item = localStorage.getItem(state)
      if (item === null) continue
      context.commit('updateState', {
        stateName: state,
        item: JSON.parse(item)
      })
    }
  },
  /**
   * 添加商品至购物车
   * @param {*} context 
   * @param {Object} val 
   */
  addToCart (context) {
    let val = context.state.skuInfo
    val.selectedItem = context.getters.skuSelectedItem

    let item = context.state.cartInfo.find(obj => {
      return obj.iid === val.iid && obj.selectedItem.xdSkuId === val.selectedItem.xdSkuId
    })
    if (item) {
      context.commit('changeGoodCount', {good: item, currentCount: val.currentCount})
    } else {
      val.checked = false
      context.commit('addToCart', val)
    }
    // console.log(context.state.cartInfo)
    localStorage.setItem('cartInfo', JSON.stringify(context.state.cartInfo))
    //
  },
  changeToCart (context, goodInfo) {
    let val = context.state.skuInfo
    val.selectedItem = context.getters.skuSelectedItem
    val.selects = context.state.skuInfo.selects

    let item = context.state.cartInfo.find(obj => {
      return obj.iid === val.iid && obj.selectedItem.xdSkuId === val.selectedItem.xdSkuId
    })

    if (item) {
      context.commit('deleteGood', goodInfo)
      context.commit('changeGoodCount', {good: item, currentCount: val.currentCount})
    } else {
      context.commit('changeGood', {val, goodInfo})
    }
    
    localStorage.setItem('cartInfo', JSON.stringify(context.state.cartInfo))
  },
  /**
   * 购物车全选商品
   * @param {*} context 
   */
  checkAllGood (context) {
    const checked = !context.getters.allChecked
    context.commit('checkAllGood', checked)
    context.commit('deepCopyReplace', 'cartInfo')
  },
  /**
   * 购物车选择shopId为shopId的商品
   * @param {*} context 
   * @param {Object} {shopId}
   */
  checkShopGood (context, {shopId}) {
    const checked = !context.getters.shopChecked(shopId)
    context.commit('checkShopGood', {checked, shopId})
    context.commit('deepCopyReplace', 'cartInfo')
  },
  /**
   * 购物车删除选择的商品
   * @param {*} context 
   */
  deleteCheckedGood (context) {
    context.commit('deleteCheckedGood')
    localStorage.setItem('cartInfo', JSON.stringify(context.state.cartInfo))
  },
  /**
   * 设置sku参数选择状态列表以及可能会带来的数量变化
   */
  setSkuSelects (context, item) {
    let resetOK = context.getters.isSkuSelectFulfill
    context.commit('setSkuSelects', item)
    if (!resetOK && !context.getters.isSkuSelectFulfill) return
    context.commit('setSkuCurrentCount', 1)
  },
}

export default actions