// pages/evaluate/evaluate.js
const { api } = require('../../utils/util.js')
import { Base64 } from 'js-base64'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordernum: '',
    goodsList: [],
    evaluate: '',
    order_id:0,
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
  //提交评价
  creatEvaluate(){
    if(this.data.evaluate == ''){
      wx.showToast({
        title: '评价内容不能为空！',
      });
    }
    var that = this;
    wx.request({
      url: api + "/mini/evaluate/creat",
      method: 'post',
      data: {
        evaluate: that.data.evaluate,
        point: 1,
        goods_id: that.data.goodsList[0].goods_id,
        order_id: that.data.goodsList[0].id,
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          wx.showToast({
            title: '评价已提交',
          });
        }
        wx.navigateTo({
          url: "/pages/orderList/orderList?type=-1",
        })
      },
      header: {
        Authorization: this._encode()
      }
    })
  },
  //获取评价内容
  inputEv(e){
    this.setData({
      evaluate:e.detail.value
    })
  },
  //获取订单
  getOrderInfo() {
    var that = this;
    wx.request({
      url: api + "/mini/order/info",
      method: 'post',
      data: {
        ordernum: that.data.ordernum,
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          that.setData({
            goodsList: res.data.data,
          })
          console.log(that.data.goodsList)
        }
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