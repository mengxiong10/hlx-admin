import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsNews',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsNews/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsNews',
    method: 'put',
    data
  })
}
export function findById(data) {
  return request({
    url: 'api/qsNews/findById',
    method: 'post',
    data
  })
}
export function qsNewsComment(data) {
  return request({
    url: 'api/qsNewsCommentPage?id=' + data.id,
    method: 'get'
  })
}
