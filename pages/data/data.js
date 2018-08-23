// pages/data/data.js
//获取应用实例
var wxCharts = require('../../utils/wxcharts.js');
const app = getApp();
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    showSmallCircle: {
      showWeekSmallCircle: true,
      showMonthSmallCircle: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      background: '#383941',
      categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      animation: true,
      series: [{
        name: '卡路里',
        data: [32, 45, 8, 56, 33, 34, 22],
        color: '#d6f046'
      }],
      legend:false,
      yAxis: {
        title: '',
        min: 0,
        fontColor: '#7d848e',
        gridColor: '#7d848e',
        titleFontColor: '#7d848e'
      },
      xAxis: {
        fontColor: '#7d848e',
        gridColor: '#7d848e',
        disableGrid: true
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });

    new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['体力', '智力', '耐力', '魔力', '视力', '肌力'],
      series: [{
        name: '身体素质雷达',
        data: [108, 110, 125, 95, 144, 122],
        color: '#d6f046'
      }],
      legend: false,
      width: windowWidth,
      height: 200,
      extra: {
        radar: {
          max: 150,
          labelColor:'#7d848e',
          gridColor: '#7d848e'
        }
      }
    });
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

  showSmallCircle(e) {
    // 先把对象所有的值设置为false,然后点击的那个设置为true
    for (var key in this.data.showSmallCircle) {
      this.data.showSmallCircle[key] = false;
    }
    this.setData({
      showSmallCircle: this.data.showSmallCircle
    });
    if (e.currentTarget.dataset.name == 'week') {
      this.data.showSmallCircle.showWeekSmallCircle = true;
      this.setData({
        showSmallCircle: this.data.showSmallCircle
      });
    }
    if (e.currentTarget.dataset.name == 'month') {
      this.data.showSmallCircle.showMonthSmallCircle = true;
      this.setData({
        showSmallCircle: this.data.showSmallCircle
      });
    }
  }
})