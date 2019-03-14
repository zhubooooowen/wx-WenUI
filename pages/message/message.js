Page({
  data: {
    avatarUrl: '',
    userInfo: {},
    logged: false,
    message: '',
    messageList: [],
  },
  onShareAppMessage: function() {},
  onLoad: function(options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                logged: true,
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onShow() {
    this.getMessage();
  },
  getMessage() {
    const that = this;
    wx.showLoading();
    wx.cloud.callFunction({
      name: 'getMessage',
      data: {},
      success(res) {
        that.setData({
          messageList: res.result.data.reverse()
        })
        wx.hideLoading()
      },
      fail: console.error
    })
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  handleInput(e) {
    this.setData({
      message: e.detail.value
    })
  },
  leaveMessage() {
    const {
      logged,
      message,
      userInfo
    } = this.data;
    console.log(userInfo);
    if (logged && message) {
      wx.showLoading({
        title: '留言中',
      });
      wx.cloud.callFunction({
        name: 'leaveMessage',
        data: {
          message,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          gender: userInfo.gender
        },
        complete: res => {
          this.setData({
            message: ''
          })
          this.getMessage();
          wx.hideLoading();
        }
      })
    } else {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
      })
    }
  },
})