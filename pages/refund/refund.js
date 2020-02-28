// pages/orderDetail/orderDetail.js
const { api } = require('../../utils/util.js')
import { Base64 } from 'js-base64'
import moment from 'moment';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordernum: '',
    goodsList: [],
    manname: '',
    phone: '',
    address: '',
    remark: '',
    created_at: '',
    pay_datetime: '',
    send_datetime: '',
    get_datetime: '',
    aftersale_remark: '',
    sum: 0,
    count: 0,
    aftersale_state: 0
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
  //申请退款
  refundOrder(){
    let that = this;
    wx.showModal({
      title: '确定申请退款？',
      content: '申请后，等待客服审核。',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: api + "/mini/order/refundOrder",
            method: 'post',
            data: {
              ordernum: that.data.ordernum,
              data:{
                aftersale_state: 1,
                aftersale_remark: that.data.aftersale_remark,
                aftersale_price: that.data.sum,
              }
            },
            success: (res) => {
              if (res.data.resultCode == 0) {
                wx.showToast({
                  title: '退款已经提交',
                });
                that.getOrderInfo()
              }
            },
            header: {
              Authorization: that._encode()
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  //申请取消
  cancelRefund() {
    console.log(123)
    let that = this;
    wx.showModal({
      title: '是否取消退款？',
      content: '取消后可再次申请。',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: api + "/mini/order/cancelRefund",
            method: 'post',
            data: {
              ordernum: that.data.ordernum
            },
            success: (res) => {
              if (res.data.resultCode == 0) {
                wx.showToast({
                  title: '退款已经取消',
                });
                that.getOrderInfo()
              }
            },
            header: {
              Authorization: that._encode()
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
          var list = [];
          let price = 0;
          let count = 0;
          let data = res.data.data[0];
          let address = data.address
          let manname = data.manname
          let aftersale_state = data.aftersale_state
          let aftersale_remark = data.aftersale_remark
          let phone = data.phone
          let created_at = moment(data.created_at).format('YYYY-MM-DD HH:mm:ss')
          let pay_datetime = moment(data.pay_datetime).format('YYYY-MM-DD HH:mm:ss')
          let send_datetime = moment(data.send_datetime).format('YYYY-MM-DD HH:mm:ss')
          let get_datetime = moment(data.get_datetime).format('YYYY-MM-DD HH:mm:ss')
          for (let item of res.data.data) {
            price += item.order_price * item.goods_number;
            count += item.goods_number
          }
          let express = 0;
          that.setData({
            goodsList: res.data.data,
            address,
            manname,
            phone,
            count,
            created_at,
            pay_datetime,
            send_datetime,
            get_datetime,
            aftersale_state,
            sum: price + express,
            aftersale_remark
          })
          console.log(that.data.goodsList)
        }
      },
      header: {
        Authorization: this._encode()
      }
    })
  },
  //输入理由
  inputRefund(e) {
    this.setData({
      aftersale_remark:e.detail.value
    })
  },
  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ":")
    return 'Basic ' + base64
  }
})