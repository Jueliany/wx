//index.js
import { Base64 } from 'js-base64'
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onGetToken() {
    wx.login({
      success: (res) => {
        wx.request({
          url: "http://127.0.0.1:3000/v1/token",
          method: 'POST',
          data: {
            account: res.code,
            type: 100
          },
          success: (res) => {
            console.log(res)
            const code = res.statusCode.toString();
            if (code.startsWith(2)) {
              wx.setStorageSync('token', res.data.token)
            }
          }
        })
      }
    })
  },
  onVerifyToken() {
    wx.request({
      url: "http://127.0.0.1:3000/v1/token/verify",
      method: 'POST',
      data: {
        token: wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(res)

      }
    })
  },
  onGetData() {
    wx.request({
      url: "http://127.0.0.1:3000/v1/goods/list",
      method: 'get',
      data: {
        token: wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(res)

      },
      header: {
        Authorization: this._encode()
      }
    })
  },
  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ":")
    return 'Basic ' + base64
  }
})
