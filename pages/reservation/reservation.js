// pages/reservation/reservation.js
Page({
  data: {
    onePrice: 156, // 单价
    allPrice: 156, // 总价
    finPrice: '', // 折扣总价
    memberOff: 0.8, // 会员折扣
    integralOff: 4, // 积分折扣
    selectMember: true, // 是否选中会员
    selectIntegral: false // 是否选中积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 如果会员
    if (this.data.selectMember) {
      this.data.finPrice = this.data.allPrice * this.data.memberOff;
      this.setData({
        allPrice: this.data.allPrice,
        finPrice: this.data.finPrice.toFixed(2)
      }); // 如果积分
    } else if (this.data.selectIntegral) {
      this.data.finPrice = this.data.allPrice - this.data.integralOff;
      this.setData({
        allPrice: this.data.allPrice,
        finPrice: this.data.finPrice.toFixed(2)
      });
    }
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

  },

  onMyAddStep(e) {
    var componentId = e.componentId;
    var stepper = e.detail;
    this.data.allPrice = this.data.onePrice * stepper;
    // 如果会员
    if (this.data.selectMember) {
      this.data.finPrice = this.data.allPrice * this.data.memberOff;
      this.setData({
        allPrice: this.data.allPrice,
        finPrice: this.data.finPrice.toFixed(2)
      }); // 如果积分
    } else if (this.data.selectIntegral) {
      this.data.finPrice = this.data.allPrice - this.data.integralOff;
      this.setData({
        allPrice: this.data.allPrice,
        finPrice: this.data.finPrice.toFixed(2)
      });
    }
  },

  onMySubtractStep(e) {
    var componentId = e.componentId;
    var stepper = e.detail;
    this.data.allPrice = this.data.onePrice * stepper;
    // 如果会员
    if (this.data.selectMember) {
      this.data.finPrice = this.data.allPrice * this.data.memberOff;
      this.setData({
        allPrice: this.data.allPrice,
        finPrice: this.data.finPrice.toFixed(2)
      }); // 如果积分
    } else if (this.data.selectIntegral) {
      this.data.finPrice = this.data.allPrice - this.data.integralOff;
      this.setData({
        allPrice: this.data.allPrice,
        finPrice: this.data.finPrice.toFixed(2)
      });
    }
  },

  // 会员折扣
  selectMember: function () {
    this.setData({
      selectMember: !this.data.selectMember,
      selectIntegral: false
    })
    // 如果选中 总价*折扣
    if (this.data.selectMember) {
      this.data.finPrice = this.data.allPrice * this.data.memberOff;
      this.setData({
        finPrice: this.data.finPrice.toFixed(2)
      })
    } else { // 没选中总价
      this.data.finPrice = this.data.allPrice;
      this.setData({
        finPrice: this.data.finPrice.toFixed(2)
      })
    }
  },
  // 积分折扣
  selectIntegral: function () {
    this.setData({
      selectIntegral: !this.data.selectIntegral,
      selectMember: false
    })
    // 如果选中 总价-积分
    if (this.data.selectIntegral) {
      this.data.finPrice = this.data.allPrice - this.data.integralOff;
      this.setData({
        finPrice: this.data.finPrice.toFixed(2)
      })
    } else {
      this.data.finPrice = this.data.allPrice;
      this.setData({
        finPrice: this.data.finPrice.toFixed(2)
      })
    }
  }
});