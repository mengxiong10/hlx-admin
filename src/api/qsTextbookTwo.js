import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsTextbookTwo',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsTextbookTwo/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsTextbookTwo',
    method: 'put',
    data
  })
}

export function qsInfoUnits(data) {
  return request({
    url: 'api/qsTextbookTwoByQstbId',
    method: 'post',
    data
  })
}

export function delCache(qstbId) {
  return request({
    url: 'api/qsTextbookTwo/cache/' + qstbId,
    method: 'post'
  })
}
