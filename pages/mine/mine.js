// pages/mine/mine.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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