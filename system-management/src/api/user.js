import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'api-auth/oauth/user/token',
    method: 'post',
    data
  })
}
export function getInfo(data) {
  return request({
    url: 'api-user/sys/user/get-login-user',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
