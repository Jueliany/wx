// pages/booking/booking.js
const { api } = require('../../utils/util.js')
import { Base64 } from 'js-base64'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idListL: [],
    isAddress:false,
    goodsList: [],
    manname:'',
    phone:'',
    address:'',
    remark:'',
    price:0,
    express:0,
    sum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      idListL: JSON.parse(options.goods)
    }) 
    console.log(this.data.idListL)
    this.getBookingGoodsList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  getBookingGoodsList(){
    var that = this;
    wx.request({
      url: api + "/mini/goods/bookingGoods",
      method: 'post',
      data: {
        ids: that.data.idListL,
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          var list = [];
          let price = 0;
          for (var goods of res.data.data){
            for(var num of that.data.idListL){
              if(goods.id == num.id){
                var data = goods;
                data.num = num.num;
                list.push(data)
                price += parseInt(data.num) * parseFloat(data.price)
              }
            }
          }
          let express = 0;
          that.setData({
            goodsList: list,
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

  //选择收货地址
  chooseAddress: function () {
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          that.setData({
            manname: res.userName,
            phone: res.telNumber,
            address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
            //具体收货地址显示
            isAddress: true,
          })
        },
        fail: function (err) {
          console.log(JSON.stringify(err));
          console.info("收货地址授权失败");
          // wx.showToast({
          //   title: '授权失败，您将无法进行下单支付;重新授权请删除小程序后再次进入',
          //   icon: 'success',
          //   duration: 2000
          // })
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },

  //创建订单
  bookingOrder() {
    var that = this;
    if (!that.data.isAddress){
      wx.showToast({
        image: '/static/images/icon_error.png',
        title: '请选择收货地址',
        mask: true
      });
      return false;
    }
    let data = {
      address: that.data.address,
      manname: that.data.manname,
      phone: that.data.phone,
      order_state: 0,
      express_price: 0,
      order_remark: that.data.remark,
      aftersale_state: 0,
    };
    wx.request({
      url: api + "/mini/order/creat",
      method: 'post',
      data:{
        info:data,
        goodsList: that.data.goodsList,
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          that.removeCart()
          wx.navigateTo({
            url: '/pages/pay/pay?ordernum=' + res.data.order_number
          })
        }
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  removeCart(){
    let that = this;
    let ids = this.data.idListL.map(item =>{
      return item.cartId
    })
    wx.request({
      url: api + "/mini/cart/delete",
      method: 'post',
      data: {
        ids,
      },
      success: (res) => {
        if (res.data.resultCode == 0) {

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