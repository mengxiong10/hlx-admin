import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsUploadLog',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsUploadLog/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsUploadLog',
    method: 'put',
    data
  })
}
