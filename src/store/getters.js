const getters = {
  // 购物车商品是否全选，是返回true，否返回false
  allChecked (state) {
    if (!state.cartInfo.length) return false 
    return state.cartInfo.find(obj => !obj.checked) ? false : true
  },
  // 购物车商铺号shopId底下商品是否全选，是返回true，否返回false
  shopChecked (state) {
    return (shopId) => {
      return state.cartInfo.find(obj => !obj.checked && obj.shopInfo.shopId === shopId) ? false : true
    }
  },
  // 购物车商品总数
  goodCount (state) {
    return state.cartInfo.length
  },
  // 购物车已选择商品总数
  goodCheckedCount (state) {
    return state.cartInfo.filter(obj => obj.checked).length
  },
  // 购物车已选择商品总价格
  goodPriceTotal (state) {
    return state.cartInfo.filter(({checked}) => checked)
      .reduce((previousValue, {selectedItem, currentCount}) => {
        return previousValue + (selectedItem.nowprice * currentCount / 100)
      }, 0)
      .toFixed(2)
  },
  // 商品参数已选择列表
  skuSelected (state) {
    return state.skuInfo.selects.filter(obj => obj.index !== -1)
  },
  // 商品参数未选择列表
  skuUnselected (state) {
    return state.skuInfo.selects.filter(obj => obj.index === -1)
  },
  // 商品参数是否已选择完毕
  isSkuSelectFulfill (state, getters) {
    return getters.skuSelected.length >= state.skuInfo.selects.length
  },
  //过滤掉结尾的冒号
  filterColon () {
    return (val) => {
      let reg = /(.+):$/
      return reg.test(val) ? RegExp.$1 : val
    }
  },
  // 选中的商品
  skuSelectedItem (state) {
    if (!state.skuInfo.skus) return []
    return state.skuInfo.skus.find(obj => {
      let flag = true
      for (let item of state.skuInfo.selects) {
        if (obj[item.type+'Id'] !== item.index) {
          flag = false
          break
        }
      }
      return flag
    })
  },
  skuImage (state, getters) {
    if (getters.isSkuSelectFulfill) {
      return getters.skuSelectedItem && getters.skuSelectedItem.img
    } else {
      return state.skuInfo.skus[0].img
    }
  },
  skuPrice (state, getters) {
    let sel = getters.skuSelectedItem
    if (getters.isSkuSelectFulfill && sel) {
      return sel && sel.currency + (sel.nowprice / 100).toFixed(2)
    } else {
      return state.skuInfo.price
    }
  },
  skuStock (state, getters) {
    let sel = getters.skuSelectedItem
    if (getters.isSkuSelectFulfill && sel) {
      return sel.stock
    } else {
      return state.skuInfo.totalStock
    }
  },
  // 商品参数提示信息
  skuHint (state, getters) {
    if (!getters.isSkuSelectFulfill && getters.skuUnselected) {
      return '请选择:'+getters.skuUnselected.reduce((total, val) => total+' '+getters.filterColon(val.label), '')
    } else {
      return '已选:'+getters.skuSelected.reduce((total, val) => total+' "'+val.name+'" ', '')
    }
  },
  // 获取商品参数类型下标
  skuTypeIndex (state) {
    return (type) => {
      let obj = state.skuInfo.selects.find(obj => obj.type === type)
      return obj ? obj.index : -1
    }
  },
}

export default getters