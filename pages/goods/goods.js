var app = getApp();
const { api } = require('../../utils/util.js')
import { Base64 } from 'js-base64'
import moment from 'moment';
var WxParse = require('../../lib/wxParse/wxParse.js');

Page({
  data: {
    id: 0,
    goods: {
      retail_price:120,
    },
    gallery: [
      { id: 1, img_url: 'https://img14.360buyimg.com/n0/jfs/t1/45124/13/10457/96407/5d780a64Ef57cfbc1/61f65ac6aae3146b.jpg' },
      { id: 2, img_url: 'https://img14.360buyimg.com/n0/jfs/t1/45124/13/10457/96407/5d780a64Ef57cfbc1/61f65ac6aae3146b.jpg' },
      { id: 3, img_url: 'https://img14.360buyimg.com/n0/jfs/t1/73969/13/9976/101936/5d780a5fE127a2ef3/9b639363bb247dad.jpg' },
    ],
    attribute: [],
    issueList: [],
    comment: [],
    evaluateList: [],
    brand: {},
    specificationList: [],
    productList: [],
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    sum:0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png",
    isDetail: 1
  },
  
  getGoodsRelated: function () {
    let that = this;
    util.request(api.GoodsRelated, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          relatedGoods: res.data.goodsList,
        });
      }
    });

  },
  clickSkuValue: function (event) {
    let that = this;
    let specNameId = event.currentTarget.dataset.nameId;
    let specValueId = event.currentTarget.dataset.valueId;

    //判断是否可以点击

    //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      if (_specificationList[i].specification_id == specNameId) {
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].id == specValueId) {
            //如果已经选中，则反选
            if (_specificationList[i].valueList[j].checked) {
              _specificationList[i].valueList[j].checked = false;
            } else {
              _specificationList[i].valueList[j].checked = true;
            }
          } else {
            _specificationList[i].valueList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      'specificationList': _specificationList
    });
    //重新计算spec改变后的信息
    this.changeSpecInfo();

    //重新计算哪些值不可以点击
  },

  //获取选中的规格信息
  getCheckedSpecValue: function () {
    let checkedValues = [];
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      let _checkedObj = {
        nameId: _specificationList[i].specification_id,
        valueId: 0,
        valueText: ''
      };
      for (let j = 0; j < _specificationList[i].valueList.length; j++) {
        if (_specificationList[i].valueList[j].checked) {
          _checkedObj.valueId = _specificationList[i].valueList[j].id;
          _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;

  },
  //根据已选的值，计算其它值的状态
  setSpecValueStatus: function () {

  },
  //判断规格是否选择完整
  isCheckedAllSpec: function () {
    return !this.getCheckedSpecValue().some(function (v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },
  getCheckedSpecKey: function () {
    let checkedValue = this.getCheckedSpecValue().map(function (v) {
      return v.valueId;
    });

    return checkedValue.join('_');
  },
  changeSpecInfo: function () {
    let checkedNameValue = this.getCheckedSpecValue();

    //设置选择的信息
    let checkedValue = checkedNameValue.filter(function (v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function (v) {
      return v.valueText;
    });
    if (checkedValue.length > 0) {
      this.setData({
        'checkedSpecText': checkedValue.join('　')
      });
    } else {
      this.setData({
        'checkedSpecText': '请选择规格数量'
      });
    }

  },
  getCheckedProductItem: function (key) {
    return this.data.productList.filter(function (v) {
      if (v.goods_specification_ids == key) {
        return true;
      } else {
        return false;
      }
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    this.setData({
      id: parseInt(options.id)
    });
    this.getGoodsInfo();
    this.getCartSum();
    this.getEvaluate();
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  getCartSum(){
    let that = this;
    wx.request({
      url: api + "/mini/cart/count",
      method: 'get',
      success: (res) => {
        if (res.data.resultCode == 0) {
          console.log(res.data.data.count)
          that.setData({
            cartGoodsCount: res.data.data.count
          })
        }
      },
      header: {
        Authorization: this._encode()
      }
    })
  },
  //获取评价
  getEvaluate(){
    var that = this;
    wx.request({
      url: api + "/mini/evaluate/list",
      method: 'POST',
      data: {
        goods_id: that.data.id,
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          let list = res.data.data.rows.map(item => {
            item.date = moment(item.created_at).format('YYYY-MM-DD')
            return item
          })
          console.log(list)
          that.setData({
            evaluateList: list,
          })
        }
      },
    })
  },
  //获取商品信息
  getGoodsInfo(){
    var that = this;
    wx.request({
      url: api + "/mini/goods/detail",
      method: 'POST',
      data: {
        id: that.data.id,
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          let data = res.data.data
          that.setData({
            gallery: [{url: data.url, id: 1}],
            goods:data
          })
          WxParse.wxParse('goodsDetail', 'html', res.data.data.detail, that);
          console.log(res.data)
        }
      },
    })
  },
  switchD(e) {
    let isDetail = e.currentTarget.dataset.st;
    console.log(isDetail)
    this.setData({
      isDetail
    })
  },
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
    this.getSum()
  },
  closeAttr: function () {
    this.setData({
      openAttr: false,
    });
  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },
  addToCart: function () {
    var that = this;
    this.getSum();
    if (this.data.openAttr === false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {

      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: '请选择规格',
          mask: true
        });
        return false;
      }

      // //根据选中的规格，判断是否有对应的sku信息
      // let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
      // if (!checkedProduct || checkedProduct.length <= 0) {
      //   //找不到对应的product信息，提示没有库存
      //   wx.showToast({
      //     image: '/static/images/icon_error.png',
      //     title: '库存不足',
      //     mask: true
      //   });
      //   return false;
      // }

      //验证库存
      console.log(this.data.goods.stock_number)
      if (this.data.goods.stock_number < this.data.number) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: '库存不足',
          mask: true
        });
        return false;
      }
      //添加到购物车
      let that = this;
      wx.request({
        url: api + "/mini/cart/add",
        method: 'post',
        data: {
          gid: that.data.id,
          number:that.data.number
        },
        success: (res) => {
          if (res.data.resultCode == 0) {
            wx.showToast({
              title: '加入购物车成功',
              mask: true
            });
          }
          that.getCartSum()
        },
        header: {
          Authorization: this._encode()
        }
      })
      
    }

  },
  buyGoods(){
    var that = this;
    this.getSum();
    if (this.data.openAttr === false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {
      wx.navigateTo({
        url: '/pages/booking/booking?goods=' + JSON.stringify([{id:that.data.id,num:that.data.number}])
      })
    }
  },
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
    this.getSum()
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
    this.getSum()
  },
  //获取总价
  getSum(){
    this.setData({
      sum: this.data.goods.price * this.data.number
    });
  },
  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ":")
    return 'Basic ' + base64
  }
})