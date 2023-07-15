import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/qsExamQuestionJnl',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qsExamQuestionJnl/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qsExamQuestionJnl',
    method: 'put',
    data
  })
}

export function getByQseqId(data) {
  return request({
    url: 'api/qsExamQuestionJnl/getByQseqId',
    method: 'post',
    data
  })
}
