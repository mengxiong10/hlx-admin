import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/payment/product',
    method: 'post',
    data,
  })
}

export function del(id) {
  return request({
    url: 'api/payment/product/1' + id,
    method: 'delete',
  })
}

export function edit(data) {
  return request({
    url: 'api/payment/product',
    method: 'put',
    data,
  })
}

export function getProductList(params) {
  return request({
    url: 'api/payment/product',
    method: 'get',
    params,
  })
}

export function getPaymentList(params) {
  return request({
    url: 'api/payment/order',
    method: 'get',
    params,
  })
}

export function refreshOrderStatus(orderNo) {
  return request({
    url: 'api/payment/order-info/refresh-order-status/' + orderNo,
    method: 'post',
  })
}

export function searchTextbook(name) {
  return request({
    url: 'api/qsTextbook',
    method: 'get',
    params: {
      qsName: name,
      page: 0,
      size: 100,
    },
  })
}
