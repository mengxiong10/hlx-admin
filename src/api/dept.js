import request from '@/utils/request'

export function getDepts(params) {
  return request({
    url: 'api/dept',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/dept',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/dept/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/dept',
    method: 'put',
    data
  })
}

export function searchAddress(data) {
  return request({
    url: 'api/dept/address/search',
    method: 'post',
    data
  })
}

export function getAllDept(data) {
  return request({
    url: 'api/dept/getAllDept',
    method: 'post',
    data
  })
}
