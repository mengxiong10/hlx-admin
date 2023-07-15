import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsStudentAuth',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsStudentAuth/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsStudentAuth',
    method: 'put',
    data
  })
}

export function stuAuths(data) {
  return request({
    url: 'api/stuAuths',
    method: 'post',
    data
  })
}

export function transferInfoQsToStu(data) {
  return request({
    url: 'api/qsStudentAuth/transferInfoQsToStu',
    method: 'post',
    data
  })
}

export function addOrUpdateStuQs(data) {
  return request({
    url: 'api/qsStudentAuth/addOrUpdateStuQs',
    method: 'post',
    data
  })
}
