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