

var app = getApp();
const { api } = require('../../utils/util.js')
import { Base64 } from 'js-base64'

Page({
  data: {
    cartGoods: [],
    checkedGoodsCount:0,
    checkedGoodsAmount:0,
    count:100,
    isEditCart: false,
    checkedAllStatus: false,
    editCartList: []
  },

  onLoad: function (options) {
    
  },
  onReady: function () {
    // 页面渲染完成
    

  },
  onShow: function () {
    // 页面显示
    this.getCartList();
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  getCartList: function () {
    let that = this;
    wx.request({
      url: api + "/mini/cart/list",
      method: 'post',
      data: {
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          let list = res.data.data.map(item =>{
            item.checked = 0;
            return item 
          });

          that.setData({
            cartGoods: list
          })
        }
        console.log(res.data)

      },
      header: {
        Authorization: this._encode()
      }
    })
  },
  isCheckedAll: function () {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  //获得选中 总数
  getCheckedGoodsAmount: function () {
    let checkedGoodsAmount = 0;
    this.data.cartGoods.forEach(function (v) {
      if (v.checked == true) {
        console.log
        checkedGoodsAmount += v.number * 100 * parseFloat(v.goods.price)/100;
      }
    });
    return checkedGoodsAmount;
  },
  //获得选中总额
  getCheckedGoodsCount: function () {
    let checkedGoodsCount = 0;
    this.data.cartGoods.forEach(function (v) {
      if (v.checked == true) {
        checkedGoodsCount += v.number;
      }
    });
    return checkedGoodsCount;
  },
  checkedItem: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let that = this;
    if (!this.data.isEditCart) {
      var cartLists = that.data.cartGoods;
      cartLists[itemIndex].checked = that.data.cartGoods[itemIndex].checked ? 0 : 1;
      that.setData({
        cartGoods: cartLists,
        checkedAllStatus: that.isCheckedAll(), 
        checkedGoodsCount: that.getCheckedGoodsCount(),
        checkedGoodsAmount: that.getCheckedGoodsAmount()
      });
      console.log(110)
    } else {
      //编辑状态
      let tmpCartData = this.data.cartGoods.map(function (element, index, array) {
        if (index == itemIndex) {
          element.checked = !element.checked;
        }
        return element;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        checkedGoodsCount: that.getCheckedGoodsCount()
      });
    }
  },
  //全选
  checkedAll: function () {
    let that = this;
    if (!this.data.isEditCart) {
      let list = this.data.cartGoods.map(item =>{
        if (this.data.checkedAllStatus){
          item.checked = 0
        }else{
          item.checked = 1
        }
        return item;
      })
      
      that.setData({
        cartGoods: list,
        checkedAllStatus: that.isCheckedAll(),
        checkedGoodsCount: that.getCheckedGoodsCount(),
        checkedGoodsAmount: that.getCheckedGoodsAmount()
      });
    } else {
      //编辑状态
      let checkedAllStatus = that.isCheckedAll();
      let tmpCartData = this.data.cartGoods.map(function (v) {
        v.checked = !checkedAllStatus;
        return v;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        checkedGoodsCount: that.getCheckedGoodsCount()
      });
    }

  },
  //编辑购物车
  editCart: function () {
    var that = this;
    if (this.data.isEditCart) {
      // this.getCartList();
      this.setData({
        isEditCart: !this.data.isEditCart
      });
    } else {
      //编辑状态
      let tmpCartList = this.data.cartGoods.map(function (v) {
        v.checked = false;
        return v;
      });
      this.setData({
        editCartList: this.data.cartGoods,
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus: that.isCheckedAll(),
        checkedGoodsCount: that.getCheckedGoodsCount()
      });
    }

  },
  updateCart: function (gid,number) {
    let that = this;
    wx.request({
      url: api + "/mini/cart/update",
      method: 'post',
      data: {
        id:gid,
        num: { number}
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          that.setData({
            checkedAllStatus: that.isCheckedAll()
          });
        }
      },
      header: {
        Authorization: this._encode()
      }
    })

      

  },
  cutNumber: function (event) {

    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = (cartItem.number - 1 > 1) ? cartItem.number - 1 : 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.id, number);
  },
  addNumber: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = cartItem.number + 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.id, number);

  },
  checkoutOrder: function () {
    //获取已选择的商品
    let that = this;

    var checkedGoods = this.data.cartGoods.map(item=>{
      if(item.checked){
        return { id: item.goods.id, num:item.number, cartId:item.id}
      }
    }).filter( item => {return item});

    if (checkedGoods.length <= 0) {
      return false;
    }


    wx.navigateTo({
      url: '/pages/booking/booking?goods=' + JSON.stringify(checkedGoods)
    })
  },
  deleteCart: function () {
    //获取已选择的商品
    let that = this;

    let ids = this.data.cartGoods.map(item=>{
      if(item.checked){
        return item.id
      }
    })

    if (ids.length <= 0) {
      return false;
    }

    wx.request({
      url: api + "/mini/cart/delete",
      method: 'post',
      data: {
        ids
      },
      success: (res) => {
        if (res.data.resultCode == 0) {
          let list = res.data.data.map(item => {
            item.checked = 0;
            return item
          });
          that.setData({
            cartGoods: list
          })
        }
      },
      header: {
        Authorization: this._encode()
      }
    })
  },
  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ":")
    return 'Basic ' + base64
  }
})