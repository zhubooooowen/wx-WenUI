// pages/courseDatiles/courseDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    people: [
      '上班族', '体型偏瘦', '体型偏胖', '运动员', '养生者', '学生', '男士'
    ],
    items: [
      { name: '2018-04-04 PM 6:00 曼宁国际中心', value: '2018-04-04 PM 6:00 曼宁国际中心', checked: 'true', disabled :'true' },
      { name: '2018-04-07 PM 6:00 曼宁国际中心', value: '2018-04-07 PM 6:00 曼宁国际中心' },
      { name: '2018-04-10 PM 6:00 曼宁国际中心', value: '2018-04-10 PM 6:00 曼宁国际中心' },
      { name: '2018-04-13 PM 6:00 曼宁国际中心', value: '2018-04-13 PM 6:00 曼宁国际中心' },
      { name: '2018-04-16 PM 6:00 曼宁国际中心', value: '2018-04-16 PM 6:00 曼宁国际中心' },
      { name: '2018-04-19 PM 6:00 曼宁国际中心', value: '2018-04-19 PM 6:00 曼宁国际中心' },
    ],
    is_modal_show: false,
    is_modal_Msg: '确定预约课程?',
    is_toast_show: false
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

  toReservation: function () {
    this.setData({
      is_modal_show:true
    })
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  onMyEvent: function (e) {
    console.log(e.detail); // 自定义组件触发事件时提供的detail对象
    this.setData({
      is_toast_show: true,
      is_modal_show: false
    })
    wx.navigateTo({
      url: '../reservation/reservation'
    })
  }
})