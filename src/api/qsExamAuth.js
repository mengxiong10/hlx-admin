import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsExamAuth',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsExamAuth/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsExamAuth',
    method: 'put',
    data
  })
}

export function addOrUpdateExamTest(data) {
  return request({
    url: 'api/qsExamAuth/addOrUpdateExamTest',
    method: 'post',
    data
  })
}

export function transferInfoTest(data) {
  return request({
    url: 'api/qsExamAuth/transferInfoTest',
    method: 'post',
    data
  })
}
