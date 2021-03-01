
import request from '@/utils/request'

export function getOgnztTreeDto(data) {
  return request({
    url: '/api-user/sys/ognzt/getOgnztTreeDto',
    method: 'get',
    data
  })
}

