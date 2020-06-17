import {request} from './request.js'

export function getMultiData () {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeData (type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

export function getFeatureData () {
  return request({
    url: '/subcategory',
    params: {
      maitKey: 3627
    }
  })
}