import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsWrongRecord',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsWrongRecord/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsWrongRecord',
    method: 'put',
    data
  })
}
