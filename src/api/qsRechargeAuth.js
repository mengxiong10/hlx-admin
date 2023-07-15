import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsRechargeAuth',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsRechargeAuth/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsRechargeAuth',
    method: 'put',
    data
  })
}
export function transferInfoDept(data) {
  return request({
    url: 'api/qsRechargeAuth/transferInfoDept',
    method: 'post',
    data
  })
}
export function addOrUpdateRecharge(data) {
  return request({
    url: 'api/qsRechargeAuth/addOrUpdateRecharge',
    method: 'post',
    data
  })
}
