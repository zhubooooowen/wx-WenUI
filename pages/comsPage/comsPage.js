Page({
  data: {
    path: '',
    percentage: 0,
    percentage2: 0,
    percentage3: 0,
    percentage4: 0,
    is_toast_Show: false,
    is_toast_Show_5s: false,
    is_toast_Show_success: false,
    is_toast_Show_warn: false,
    is_modal_show: false,
    modal_data: '',
    is_toast_Show_modal: false,
    is_actionsheet_Show: false,
    actionsheetList: [{
        name: '首页',
        url: '../index/index',
        tab: false
      },
      {
        name: '结算页',
        url: '../reservation/reservation',
        tab: false
      }
    ]
  },
  onLoad: function(options) {
    this.setData({
      path: options.path
    })
    setTimeout(() => {
      this.setData({
        percentage: 90,
        percentage2: 80,
        percentage3: 100,
        percentage4: 60,
      })
    }, 100)
  },
  // 进度条
  changeProgress() {
    const randam = Math.floor(Math.random() * 80) + 20;
    this.setData({
      percentage: randam
    })
  },
  // toast
  showToast() {
    this.setData({
      is_toast_Show: true
    })
  },
  showToast5s() {
    this.setData({
      is_toast_Show_5s: true
    })
  },
  showToastSuccess() {
    this.setData({
      is_toast_Show_success: true
    })
  },
  showToastWarn() {
    this.setData({
      is_toast_Show_warn: true
    })
  },
  // modal
  showModal() {
    this.setData({
      is_modal_show: true
    })
  },
  onMyEvent(e) {
    this.setData({
      is_modal_show: false,
      modal_data: e.detail,
      is_toast_Show_modal: true
    })
  },
  // actionsheet
  showActionsheet() {
    this.setData({
      is_actionsheet_Show: true
    })
  },
  onMyRedirect(e) {
    console.log(e.detail.url);
    this.setData({
      is_actionsheet_Show: false
    })
    // 跳转到tab页
    if (e.detail.tab) {
      wx.switchTab({
        url: e.detail.url
      })
    } else {
      // 跳转到非tab页
      wx.navigateTo({
        url: e.detail.url
      })
    }
  },
  // stepper
  onMyAddStep(e) {
    console.log(e.detail);
  },
  onMySubtractStep(e) {
    console.log(e.detail);
  },
  // uploader
  onMyUpload(e) {
    console.log(e.detail);
  }
})