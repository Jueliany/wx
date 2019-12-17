// pages/my/my.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: ''
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})