import config from '../config'

function request (url, method, data, header = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}
export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showLogin (text) {
  wx.showToast({
    title: text,
    icon: 'loading'
  })
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
