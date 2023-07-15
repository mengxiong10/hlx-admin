import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsInfo',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsInfo/' + id,
    method: 'delete'
  })
}

export function deleteBatch(data) {
  return request({
    url: 'api/qsInfo/deleteBatch',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'api/qsInfo',
    method: 'put',
    data
  })
}
