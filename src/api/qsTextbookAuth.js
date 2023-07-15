import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsTextbookAuth',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsTextbookAuth/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsTextbookAuth',
    method: 'put',
    data
  })
}

export function addOrUpdateExamQs(data) {
  return request({
    url: 'api/qsTextbookAuth/addOrUpdateExamQs',
    method: 'post',
    data
  })
}

export function transferInfoQs(data) {
  return request({
    url: 'api/qsTextbookAuth/transferInfoQs',
    method: 'post',
    data
  })
}

