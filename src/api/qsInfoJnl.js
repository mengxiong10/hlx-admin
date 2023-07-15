import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsInfoJnl',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsInfoJnl/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsInfoJnl',
    method: 'put',
    data
  })
}
export function qsInfoJnlByQinfoId(data) {
  return request({
    url: 'api/qsInfoJnlByQinfoId',
    method: 'post',
    data
  })
}
