import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsAudio',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsAudio/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsAudio',
    method: 'put',
    data
  })
}
