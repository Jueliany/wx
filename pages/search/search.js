// pages/search/search.js
const { api } = require('../../utils/util.js')
import { Base64 } from 'js-base64'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywrod: '',
    searchStatus: true,
    goodsList: [
      { id: 1, list_pic_url: "https://img14.360buyimg.com/n7/jfs/t1/32578/25/6630/199318/5c9086cbE7ec1f26a/8c50d6ea71d17ee9.jpg", name: 'Apple iPad Air 3 2019年新款平板电脑 10.5英寸（64G WLAN版/A12芯片/Retina', retail_price: 123 },
      { id: 1, list_pic_url: "https://img14.360buyimg.com/n7/jfs/t1/32578/25/6630/199318/5c9086cbE7ec1f26a/8c50d6ea71d17ee9.jpg", name: 'Apple iPad Air 3 2019年新款平板电脑 10.5英寸（64G WLAN版/A12芯片/Retina', retail_price: 123 },
      { id: 1, list_pic_url: "https://img14.360buyimg.com/n7/jfs/t1/32578/25/6630/199318/5c9086cbE7ec1f26a/8c50d6ea71d17ee9.jpg", name: 'Apple iPad Air 3 2019年新款平板电脑 10.5英寸（64G WLAN版/A12芯片/Retina', retail_price: 123 },
      { id: 1, list_pic_url: "https://img14.360buyimg.com/n7/jfs/t1/32578/25/6630/199318/5c9086cbE7ec1f26a/8c50d6ea71d17ee9.jpg", name: 'Apple iPad Air 3 2019年新款平板电脑 10.5英寸（64G WLAN版/A12芯片/Retina', retail_price: 123 },
      { id: 1, list_pic_url: "https://img14.360buyimg.com/n7/jfs/t1/32578/25/6630/199318/5c9086cbE7ec1f26a/8c50d6ea71d17ee9.jpg", name: 'Apple iPad Air 3 2019年新款平板电脑 10.5英寸（64G WLAN版/A12芯片/Retina', retail_price: 123 },
      { id: 1, list_pic_url: "https://img14.360buyimg.com/n7/jfs/t1/32578/25/6630/199318/5c9086cbE7ec1f26a/8c50d6ea71d17ee9.jpg", name: 'Apple iPad Air 3 2019年新款平板电脑 10.5英寸（64G WLAN版/A12芯片/Retina', retail_price: 123 },
      { id: 1, list_pic_url: "https://img14.360buyimg.com/n7/jfs/t1/32578/25/6630/199318/5c9086cbE7ec1f26a/8c50d6ea71d17ee9.jpg", name: 'Apple iPad Air 3 2019年新款平板电脑 10.5英寸（64G WLAN版/A12芯片/Retina', retail_price: 123 },
    ],
    helpKeyword: [],
    historyKeyword: [],
    categoryFilter: false,
    currentSortType: 'default',
    currentSortOrder: '',
    filterCategory: [
      { id: -1, name: '全部' },
      { id: 2, name: '数码音响' },
      { id: 3, name: '家用电器' },
      { id: 4, name: '首饰包包' },
      { id: 5, name: '电脑器材' },
      { id: 6, name: '手机平板' },
      { id: 7, name: '时尚手表' },
      { id: 8, name: '美食酒类' },
      { id: 9, name: '化妆护肤' },
    ],
    defaultKeyword: {},
    page: 1,
    size: 20,
    currentSortType: 'id',
    currentSortOrder: 'desc',
    categoryId: 0
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
    this.getGoodsList();
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

  //搜索输入
  inputChange(e){
    let value = e.detail.value
    this.setData({ keywrod: value})
  },
  //获得商品
  getGoodsList(){
    var that = this;
    wx.request({
      url: api + "/mini/goods/list",
      method: 'post',
      data: {
        order: that.data.currentSortType == "default" ? that.data.currentSortType : that.data.currentSortOrder,
        category: that.data.categoryId,
        keyWord: that.data.keywrod
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          console.log(res.data)
          that.setData({
            goodsList: res.data.data
          })
        }
      },
    })
  },
  // 点击分类
  openSortFilter: function (event) {
    let currentId = event.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          'categoryFilter': !this.data.categoryFilter,
          'currentSortOrder': 'asc'
        });
        break;
      case 'priceSort':
        let tmpSortOrder = 'asc';
        if (this.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc';
        }
        this.setData({
          'currentSortType': 'price',
          'currentSortOrder': tmpSortOrder,
          'categoryFilter': false
        });

        this.getGoodsList();
        break;
      default:
        //综合排序
        this.setData({
          'currentSortType': 'default',
          'currentSortOrder': 'desc',
          'categoryFilter': false
        });
    }
    this.getGoodsList();
  },
  // 选择分类
  selectCategory: function (event) {
    let currentIndex = event.target.dataset.categoryIndex;
    let filterCategory = this.data.filterCategory;
    let currentCategory = null;
    for (let key in filterCategory) {
      if (key == currentIndex) {
        filterCategory[key].selected = true;
        currentCategory = filterCategory[key];
      } else {
        filterCategory[key].selected = false;
      }
    }
    this.setData({
      'filterCategory': filterCategory,
      'categoryFilter': false,
      categoryId: currentCategory.id,
      page: 1,
      goodsList: []
    });
    this.getGoodsList();
  },
  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ":")
    return 'Basic ' + base64
  }
})