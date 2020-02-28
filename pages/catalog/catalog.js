// pages/catalog/catalog.js
const { api } = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{ id: -1, name: '全部' },
    { id: 2, name: '数码音响' },
    { id: 3, name: '家用电器' },
    { id: 4, name: '首饰包包' },
    { id: 5, name: '电脑器材' },
    { id: 6, name: '手机平板' },
    { id: 7, name: '时尚手表' },
    { id: 8, name: '美食酒类' },
    { id: 9, name: '化妆护肤' },],
    categoryList: [],
    goodsList: [

    ],
    pageNum: 1,
    currentCategory: -1,
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
    this.getGoodsList();
  },
  //切换类型
  switchCate(event) {
    let id = event.target.dataset.id;
    this.setData({
      currentCategory: id
    })
    this.getGoodsList();
  },
  //获取列表
  getGoodsList() {
    var that = this;
    var data = {
      pageNum: this.data.pageNum,
      category: this.data.currentCategory
    }
    console.log(data)
    wx.request({
      url: api + "/mini/goods/catalogGoods",
      method: 'POST',
      data,
      success: (res) => {
        if (res.data.resultCode == 0) {
          that.setData({
            goodsList: res.data.data.rows
          })
        }
      },
    })
  }
})