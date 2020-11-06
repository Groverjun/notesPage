import request from './request'
export function test (data) { 
  return new request().requestAll({
    url: '/test',
    method: 'post',
    data
  })
}
export function user (data) { 
  return new request().requestAll({
    url: '/user',
    method: 'post',
    data
  })
}