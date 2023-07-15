import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsFile',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsFile/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsFile',
    method: 'put',
    data
  })
}
