const app = getApp()

Page({
  data: {
    userInfo: {},
    showBig: {
      big: true,
      big2: false,
      big3: false
    },
    location: '个人组件库',
    imgUrl: '',
    business: false,
    basis: true,
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
        name: 'Uploader 图片上传',
        path: 'uploader'
      }
    ],
    businessComponentsList: [{
        name: '健身课程预约-日历组件',
        url: '../course/course'
      },
      {
        name: 'wx-charts-图表组件',
        url: '../data/data'
      },
      {
        name: 'skidRemove-侧滑删除',
        url: '../skidRemove/skidremove'
      }
    ]
  },
  onLoad: function() {},
  onShareAppMessage: function() {},
  showBigImg: function(e) {
    if (e.target.dataset.img == 2) {
      this.setData({
        showBig: {
          big: false,
          big2: true,
          big3: false
        },
        location: '轻量级',
        imgUrl: ''
      })
    } else if (e.target.dataset.img == 1) {
      this.setData({
        showBig: {
          big: true,
          big2: false,
          big3: false
        },
        location: '个人组件库',
        imgUrl: ''
      })
    } else if (e.target.dataset.img == 3) {
      this.setData({
        showBig: {
          big: false,
          big2: false,
          big3: true
        },
        location: '简洁易用',
        imgUrl: ''
      })
    }
  },
  business: function(e) {
    this.setData({
      basis: false,
      business: true
    })
  },
  basis: function(e) {
    this.setData({
      business: false,
      basis: true
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
  },
  tobusinessComponent(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  toMessage() {
    wx.navigateTo({
      url: '../message/message'
    })
  },
  toAlbum() {
    wx.navigateTo({
      url: '../album/album'
    })
  }
})