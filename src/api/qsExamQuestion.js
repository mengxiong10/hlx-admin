import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsExamQuestion',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsExamQuestion/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsExamQuestion',
    method: 'put',
    data
  })
}
