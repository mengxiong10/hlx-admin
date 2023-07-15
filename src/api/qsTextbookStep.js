import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsTextbookStep',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsTextbookStep/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsTextbookStep',
    method: 'put',
    data
  })
}

export function qsTextbookStepByqsTbid(data) {
  return request({
    url: 'api/qsTextbookStepByqsTbid',
    method: 'post',
    data
  })
}
