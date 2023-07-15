import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsExam',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsExam/' + id,
    method: 'delete'
  })
}

export function delCache(id) {
  return request({
    url: 'api/qsExam/cache/' + id,
    method: 'post'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsExam',
    method: 'put',
    data
  })
}
