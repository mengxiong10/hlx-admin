import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsStudy',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsStudy/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsStudy',
    method: 'put',
    data
  })
}
