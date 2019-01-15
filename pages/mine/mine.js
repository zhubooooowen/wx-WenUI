//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    record: false,
    mall: true,
    componentsList: [{
        name: 'Progress 进度条',
        path: 'progress'
      },
      {
        name: 'Toast 轻提示',
        path: 'toast'
      },
      {
        name: 'Modal 弹框',
        path: 'modal'
      },
      {
        name: 'Actionsheet 上拉菜单',
        path: 'actionsheet'
      },
      {
        name: 'Stepper 步进器',
        path: 'stepper'
      },
      {
        name: 'SkidRemove 侧滑删除',
        path: 'skid'
      },
    ]
  },
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },
  onGotUserInfo: function(e) {
    console.log(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo
    })
    app.globalData.userInfo = e.detail.userInfo;
  },

  record: function(e) {
    this.setData({
      mall: false,
      record: true
    })
  },
  mall: function(e) {
    this.setData({
      record: false,
      mall: true
    })
  },
  selectDate(data) {
    console.log(data.detail);
  },
  toComponent(e) {
    console.log(e);
    wx.navigateTo({
      url: '../comsPage/comsPage?path=' + e.currentTarget.dataset.path
    })
  }
})