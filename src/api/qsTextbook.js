import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsTextbook',
    method: 'post',
    data,
  })
}

export function del(id) {
  return request({
    url: 'api/qsTextbook/' + id,
    method: 'delete',
  })
}

export function edit(data) {
  return request({
    url: 'api/qsTextbook',
    method: 'put',
    data,
  })
}

export function getByUrlParams(url, params) {
  return request({
    url: url,
    method: 'get',
    params,
  })
}

export function getAllTeachs() {
  return request({
    url: '/api/getCourseTeachInfos',
  })
}
