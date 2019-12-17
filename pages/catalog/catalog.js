// pages/catalog/catalog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [
      { id: 1, name: '全部' },
      { id: 2, name: '数码音响' },
      { id: 3, name: '家用电器' },
      { id: 4, name: '首饰宝宝' },
      { id: 5, name: '电脑器材' },
      { id: 6, name: '手机平板' }
    ],
    categoryList: [],
    currentCategory: {id: 1},
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})