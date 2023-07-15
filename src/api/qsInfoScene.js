import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsInfoScene',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsInfoScene/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsInfoScene',
    method: 'put',
    data
  })
}
