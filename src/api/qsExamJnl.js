import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsExamJnl',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsExamJnl/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsExamJnl',
    method: 'put',
    data
  })
}
export function qsExamJnlByQsExam(data) {
  return request({
    url: 'api/qsExamJnlByQsExam',
    method: 'post',
    data
  })
}
