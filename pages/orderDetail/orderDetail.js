// pages/orderDetail/orderDetail.js
const { api } = require('../../utils/util.js')
import { Base64 } from 'js-base64'
import  moment from 'moment';
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
    sum: 0,
    count: 0,
    order_state:0
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
  //评价
  goEvaluate(e) {
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?ordernum=' + e.currentTarget.dataset.ordernum
    })
  },

  //确认收货
  getGoods(e) {
    let ordernum = e.currentTarget.dataset.ordernum;
    let that = this;
    wx.showModal({
      title: '确定收货',
      content: '确定后货款将转给商家。',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: api + "/mini/order/confirm",
            method: 'post',
            data: {
              ordernum
            },
            success: (res) => {
              if (res.data.resultCode == 0) {
                wx.showToast({
                  title: '已经确定收货',
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
  //退款
  goRefund(e) {
    wx.navigateTo({
      url: '/pages/refund/refund?ordernum=' + e.currentTarget.dataset.ordernum
    })
  },
  //付款订单
  goPay(e) {
    wx.navigateTo({
      url: '/pages/pay/pay?ordernum=' + e.currentTarget.dataset.ordernum
    })
  },
  //取消订单e
  cancelOrder(e) {
    let ordernum = e.currentTarget.dataset.ordernum
    let that = this;
    wx.showModal({
      title: '是否取消订单？',
      content: '取消后不可恢复，如需购买请再次下单。',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: api + "/mini/order/cancel",
            method: 'post',
            data: {
              ordernum
            },
            success: (res) => {
              if (res.data.resultCode == 0) {
                wx.showToast({
                  title: '订单已经取消',
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
          let evaluate_id = data.evaluate_id
          let address = data.address
          let manname = data.manname
          let order_state = data.order_state
          let phone = data.phone
          let created_at = moment(data.created_at).format('YYYY-MM-DD HH:mm:ss')
          let pay_datetime = moment(data.pay_datetime).format('YYYY-MM-DD HH:mm:ss')
          let send_datetime = moment(data.send_datetime).format('YYYY-MM-DD HH:mm:ss')
          let get_datetime = moment(data.get_datetime).format('YYYY-MM-DD HH:mm:ss')
          for (let item of res.data.data){
            price += item.order_price * item.goods_number;
            count += item.goods_number
          }
          let express = 0;
          that.setData({
            goodsList: res.data.data,
            evaluate_id,
            address,
            manname,
            phone,
            count,
            created_at,
            pay_datetime,
            send_datetime,
            get_datetime,
            order_state,
            sum: price + express
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