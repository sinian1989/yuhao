import request from '@/utils/request'

export function findListByRoleId(data) {
  return request({
    url: '/api-user/sys/menus/findListByRoleId/b8185c774827e1cc16721b65c4631e76',
    method: 'get',
    data
  })
}

export function emissionStandardStatisticalList(data) {
  return request({
    url: '/sys/datamanager/emissionStandardStatisticalList',
    method: 'post',
    data
  })
}

export function carBrandStatisticalList(data) {
  return request({
    url: '/sys/datamanager/carBrandStatisticalList',
    method: 'post',
    data
  })
}

