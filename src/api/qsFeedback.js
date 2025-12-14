import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsFeedback',
    method: 'post',
    data,
  })
}

export function del(id) {
  return request({
    url: 'api/qsFeedback/' + id,
    method: 'delete',
  })
}

export function edit(data) {
  return request({
    url: 'api/qsFeedback',
    method: 'put',
    data,
  })
}

export function searchStudent(name) {
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
