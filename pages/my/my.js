// pages/my/my.js
const { api } = require('../../utils/util.js')
import { Base64 } from 'js-base64'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: '',
    // 订单 待付款 退款订单
    item: [
      { content: '待付款', image: 'https://file.quhappy.com/images/img/icon3.png', orderType: '0', num: 0 },
      { content: '发货中', image: 'https://file.quhappy.com/images/img/icon14.png', orderType: '1', num: 0 },
      { content: '已发货', image: 'https://file.quhappy.com/images/img/icon2.png', orderType: '2', num: 0 },
      { content: '评价', image: 'https://file.quhappy.com/images/img/icon1.png', orderType: 3, num: 0 },
      // { content: '售后', image: 'https://file.quhappy.com/images/img/icon4.png', orderType: '4', num: 0 }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getInfo();
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
  bindGetUserInfo: function (e) {
    console.log(1)
    var that = this;
    var obj = {};
    obj.userInfoIV = e.detail.iv;
    obj.userInfoEncryptedData = e.detail.encryptedData;
    console.log(obj)
    // 用户拒绝授权
    if (e.detail.encryptedData == undefined || e.detail.iv == undefined) {
      return;
    }
    obj.userInfoIV = e.detail.iv;
    obj.userInfoEncryptedData = e.detail.encryptedData;
    console.log(obj)
  },
  getInfo: function(){
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        that.setData({ pic: avatarUrl})
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(res)
      }
    })
  },
  //去订单页
  goOrder(event){
    let type = event.currentTarget.dataset.type;
    console.log(event.currentTarget)
    wx.navigateTo({
      url: '/pages/orderList/orderList?type=' + type
    })
  },
  getpp: function(){
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })
  },
  //管理收货地址
  chooseAddress: function () {
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log(JSON.stringify(res));
          console.log(res);
          that.setData({
            "add_userName": res.userName,
            "add_telNumber": res.telNumber,
            "add_provinceName": res.provinceName,
            "add_cityName": res.cityName,
            "add_countyName": res.countyName,
            "add_detailInfo": res.detailInfo,
            "add_postalCode": res.postalCode,
            //具体收货地址显示
            flag: false,

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
})