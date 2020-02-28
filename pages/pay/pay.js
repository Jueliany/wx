// pages/booking/booking.js
const { api } = require('../../utils/util.js')
import { Base64 } from 'js-base64'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordernum: '',
    isAddress: false,
    goodsList: [],
    manname: '',
    phone: '',
    address: '',
    remark: '',
    price: 0,
    express: 0,
    sum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ordernum: options.ordernum
    })
    this.getOrderInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  getOrderInfo() {
    var that = this;
    wx.request({
      url: api + "/mini/order/bookingInfo",
      method: 'post',
      data: {
        ordernum: that.data.ordernum,
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          var list = [];
          let price = 0;
          let address = res.data.data[0].address
          let manname = res.data.data[0].manname
          let phone = res.data.data[0].phone
          for (var goods of res.data.data) {
            let data = goods.goods
            data.price = goods.order_price;
            data.num = goods.goods_number;
            price += data.num * data.price;
            list.push(data)
          }
          let express = 0;
          that.setData({
            goodsList: list,
            address,
            manname,
            phone,
            express,
            price,
            sum: price + express
          })
        }
      },
      header: {
        Authorization: this._encode()
      }
    })
  },


  //支付订单
  payOrder() {
    var that = this;
    let ordernum = this.data.ordernum
    wx.request({
      url: api + "/mini/order/pay",
      method: 'post',
      data: {
        ordernum
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          wx.showToast({
            title: '付款成功',
          });
          wx.reLaunch({
            url: '/pages/my/my'
          })
        }
      },
      header: {
        Authorization: this._encode()
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ":")
    return 'Basic ' + base64
  }
})