import {request} from './request.js'

export function getDetailData (iid) {
  return request({
    url: '/detail',
    params: {
      iid: iid
    }
  })
}

export function getRecommend () {
  return request({
    url: '/recommend'
  })
}

export class Goods {
  constructor (itemInfo, columns, services) {
    this.title = itemInfo.title
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discountBgColor = itemInfo.discountBgColor
    this.discountDesc = itemInfo.discountDesc

    this.columns = columns

    this.services = services
  }
}

export class Shop {
  constructor (shopInfo) {
    this.name = shopInfo.name
    this.shopLogo = shopInfo.shopLogo
    this.cGoods = shopInfo.cGoods
    this.cSells = shopInfo.cSells
    this.score = shopInfo.score
  }
}

export class Params {
  constructor (itemParams) {
    this.infos = itemParams.info.set
    this.sizes = itemParams.rule.tables[0]
  }
}

export class Sku {
  constructor (skuInfo, itemInfo, shopInfo) {
    this.iid = itemInfo.iid
    this.title = itemInfo.title
    this.price = skuInfo.defaultPrice
    this.totalStock = skuInfo.totalStock
    this.props = skuInfo.props
    this.skus = skuInfo.skus
    this.shopInfo = {
      shopId: shopInfo.shopId,
      shopName: shopInfo.name
    }
  }
}