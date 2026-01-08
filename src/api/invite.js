import request from '@/utils/request'

export function getInviteRelations(params) {
  return request({
    url: 'api/invite/getInviteRelations',
    method: 'get',
    params,
  })
}

export function createInviteRelation(data) {
  return request({
    url: 'api/invite/createInviteRelation',
    method: 'post',
    data,
  })
}

export function deleteInviteRelation(id) {
  return request({
    url: 'api/invite/deleteInviteRelation/' + id,
    method: 'delete',
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
