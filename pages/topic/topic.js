// pages/topic/topic.js
const { api } = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [
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
    this.getNewGoodsList();
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

  //获取列表
  getNewGoodsList() {
    var that = this;
    var data = {
    }
    console.log(data)
    wx.request({
      url: api + "/mini/goods/new",
      method: 'get',
      success: (res) => {
        if (res.data.resultCode == 0) {
          that.setData({
            goodsList: res.data.data
          })
          console
        }
      },
    })
  }
  
})