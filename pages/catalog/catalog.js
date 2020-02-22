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
    goodsList: [
      { id: 1, list_pic_url: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg", name: '桌子', retail_price: 123, oldPrice: 299 },
      { id: 1, list_pic_url: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg", name: '桌子', retail_price: 123, oldPrice: 299 },
      { id: 1, list_pic_url: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg", name: '桌子', retail_price: 123, oldPrice: 299 },
      { id: 1, list_pic_url: "http://yanxuan.nosdn.127.net/e7b68189ef2f77a28110c3fc7ca5a697.png", name: '桌子', retail_price: 123, oldPrice: 299 },
    ],
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