// pages/main/main.js
const { api } = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    goodsCount: 0,
    choicenessGoods: [],
    hotGoods: [{
      "id": 22,
      "productTitle": "Apple iPhone 7 Plus (A1661) 128G 黑色 移动联通电信4G手机",
      "productPicURL": "https://img14.360buyimg.com/n0/jfs/t1/18387/1/12727/161720/5c999df4E06720614/34ac75cc458efc46.jpg",
      "price": "3499.00",
      "isHot": 1
    }, {
      "id": 9,
        "productTitle": "Apple iPad 平板电脑 2019年新款10.2英寸（128G WLAN版/iPadOS系统/Retina显示屏/MW792CH/A）金色",
        "productPicURL": "https://img10.360buyimg.com/jdcms/s150x150_jfs/t1/45124/13/10457/96407/5d780a64Ef57cfbc1/61f65ac6aae3146b.jpg.webp",
      "productLabelAry": ["大澳体验", "快捷换票", "即订即用"],
      "price": "3299.00",
      "isHot": 0
    }, {
      "id": 10,
        "productTitle": "索尼（SONY）Alpha 7R III 机身 全画幅微单数码相机（约4240万有效像素 5轴防抖 a7RM3/a7r3/a73）",
        "productPicURL": "https://img14.360buyimg.com/n0/jfs/t19249/206/1908637936/308650/6fc8ef07/5add8fb8N72996f51.jpg",
      "price": "14999.00",
      "isHot": 0
    }, {
      "id": 11,
        "productTitle": "佳能（Canon）EOS 200D II 200D2 迷你单反相机 数码相机（EF-S18-55mm f/4-5.6 IS STM）黑色 Vlog相机视频",
        "productPicURL": "https://img13.360buyimg.com/n1/s450x450_jfs/t1/35828/26/5078/324781/5cbea100Eb22bb637/4d2d5e3bcd86fba4.jpg",
      "price": "12234.00",
      "isHot": 0
    }, {
      "id": 12,
        "productTitle": "联想ThinkPad 翼480（4VCD）英特尔酷睿i5 14英寸轻薄笔记本电脑(i5-8250U 8G 128GSSD+1T 2G独显 FHD)冰原银",
        "productPicURL": "https://img14.360buyimg.com/n0/jfs/t1/42514/11/1912/262553/5cc7e219Ee6a3fb7b/f7b38dfa82781d9b.jpg",
      "price": "4999.00",
      "isHot": 0
    }, {
      "id": 23,
        "productTitle": "荣耀V20 游戏手机 麒麟980芯片 魅眼全视屏 4800万深感相机 8GB+256GB 幻影红 移动联通电信4G全面屏手机",
        "productPicURL": "https://img14.360buyimg.com/n0/jfs/t1/18538/6/15338/313665/5cb0a8e0Ee9117074/878a30dad2f172f8.jpg",
      "price": "1999.00",
      "isHot": 0
    }, {
      "id": 25,
        "productTitle": "华为 HUAWEI P30 Pro 超感光徕卡四摄10倍混合变焦麒麟980芯片屏内指纹 8GB+128GB极光色全网通版双4G手机",
        "productPicURL": "https://img14.360buyimg.com/n0/jfs/t1/19261/13/12605/324178/5c98c7bcE63f668de/ca2762256ec6f931.jpg",
      "price": "4480.00",
      "isHot": 0
    }],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [
    ],
    channel: []
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
    this.getBanner();
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

  //获得总数
  getgoodsCount(){
    var that = this;
   
  },
  //跳转页面
  goGoods(event) {
    let id = event.currentTarget.dataset.id;
    console.log(event.currentTarget)
    wx.navigateTo({
      url: '/pages/goods/goods?id='+id
    })
  },
  //热门商品加载
  getGoodsList() {
    var that = this;
    wx.request({
      url: api + "/mini/goods/count",
      method: 'get',
      data: {
      },
      success: (res) => {
        console.log(1)
        if (res.data.resultCode == 0) {
          console.log(res.data)
          that.setData({
            goodsCount: res.data.data.count
          })
        }
      },
    })
    wx.request({
      url: api + "/mini/goods/hot",
      method: 'get',
      data: {
      },
      success: (res) => {
        console.log(1)
        if (res.data.resultCode == 0) {
          console.log(res.data)
          that.setData({
            hotGoods: res.data.data
          })
        }
      },
    })
    wx.request({
      url: api + "/mini/goods/choiceness",
      method: 'get',
      data: {
      },
      success: (res) => {
        console.log(1)
        if (res.data.resultCode == 0) {
          console.log(res.data)
          that.setData({
            choicenessGoods: res.data.data
          })
        }
      },
    })
  },
  //轮播图加载
  getBanner() {
    var that = this;
    wx.request({
      url: api + "/v1/banner/mini/list",
      method: 'get',
      data: {
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          that.setData({
            banner: res.data.data.rows
          })
        }
      },
      // header: {
      //   Authorization: this._encode()
      // }
    })
  },


})