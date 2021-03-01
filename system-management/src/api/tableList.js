
import request from '@/utils/request'


//组织管理
export function getChildrenOgnztList(params) {
  return request({
    url: '/api-user/sys/ognzt/getChildrenOgnztList',
    method: 'get',
    params
  })
}

//用户管理
export function getUserPage(data) {
  return request({
    url: '/api-user/sys/user/getUserPage',
    method: 'post',
    data
  })
}

//组织管理编码
export function getChildArea(params) {
  return request({
    url: '/api-user/sys/area/getChildArea',
    method: 'get',
    params
  })
}

//组织管理添加
export function update(data) {
  return request({
    url: '/api-user/sys/ognzt/update',
    method: 'post',
    data
  })
}
//用户管理添加
export function ognztUpdate(data) {
  return request({
    url: '/api-user/sys/user/update',
    method: 'post',
    data
  })
}
//组织管理删除
export function drop(data) {
  return request({
    url: '/api-user/sys/ognzt/drop',
    method: 'post',
    data
  })
}
