import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsMessage',
    method: 'post',
    data,
  })
}

export function get(params) {
  return request({
    url: 'api/qsMessage',
    method: 'get',
    params,
  })
}

export function del(id) {
  return request({
    url: 'api/qsMessage/' + id,
    method: 'delete',
  })
}

export function edit(data) {
  return request({
    url: 'api/qsMessage',
    method: 'put',
    data,
  })
}

export function searchUser(name) {
  return request({
    url: 'api/qsStudent',
    method: 'get',
    params: {
      realName: name,
      page: 0,
      size: 100,
    },
  })
}
