import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsStudent',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsStudent/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsStudent',
    method: 'put',
    data
  })
}

export function qsStuQstextbook(data) {
  return request({
    url: 'api/qsStudentQstextBook',
    method: 'post',
    data
  })
}
