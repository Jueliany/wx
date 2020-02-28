// pages/order/order.js
const { api } = require('../../utils/util.js')
import { Base64 } from 'js-base64'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: 0,
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    this.setData({
      orderStatus : options.type
    })
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
    this.getOrderList()
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
    // var that = this
    // if (that.data.isReachDown) {
    //   getOrderList(that.data.pageNum, that.data.pageSize, token, that.data.orderStatus, that.data.searchKey, this)
    // }
    // else {
    //   appInstance.getShowHintMsg('我是有底线的哦！')
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 搜素事件
   */
  onSearch: function () {
    var that = this
  },

  /**
 * 设置用户输入的搜索关键字
 */

  /**
   * 订单详情按钮事件
   */
  onOrderDetail: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../orderDetail/orderDetail?orderId=" + id,
    })
  },

  /**
   * 订单状态选择事件
   */
  onOrderStatusChoose: function (e) {
    let status = e.currentTarget.dataset.status
    var that = this
    this.setData({
      orderStatus: status
    })
    this.getOrderList()
  },

  //确认收货
  getGoods(e){
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
                that.getOrderList()
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
  //评价
  goEvaluate(e) {
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?ordernum=' + e.currentTarget.dataset.ordernum
    })
  },
  //退款
  goRefund(e){
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
                that.getOrderList()
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

  //获取订单列表
  getOrderList(){
    var that = this;
    wx.request({
      url: api + "/mini/order/list",
      method: 'post',
      data: {
        state: that.data.orderStatus,
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          var list = [];
          that.setData({
            orderList: res.data.data,
          })
        }
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  //跳转页面
  goOrder(event) {
    let ordernum = event.currentTarget.dataset.ordernum;
    console.log(event.currentTarget)
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?ordernum=' + ordernum
    })
  },

  copyTBL: function (e) {
    let data = e.currentTarget.dataset.expressnumber
    var self = this;
    wx.setClipboardData({
      data,
      success: function (res) {
        
      }
    });
  },

  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ":")
    return 'Basic ' + base64
  }
})