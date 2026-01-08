import request from '@/utils/request'

export function getAllWithdrawRecords(params) {
  return request({
    url: 'api/withdraw/getAllWithdrawRecords',
    method: 'get',
    params,
  })
}

export function updateWithdrawStatus(data) {
  return request({
    url: 'api/withdraw/updateStatus',
    method: 'put',
    data,
  })
}
