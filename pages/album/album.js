Page({
  data: {
    imagePaths: [],
    showBtn: false
  },
  onLoad() {
    const that = this;
    wx.cloud.callFunction({
      name: 'getOpenID',
      data: {},
      success(res) {
        if (res.result.openid === 'or_Jn5GCUUD3ckad9qXAVAPFTwrE') {
          that.setData({
            showBtn: true
          })
        }
      },
      fail: console.error
    })
    this.getImageList();
  },
  getImageList() {
    const that = this;
    wx.showLoading();
    wx.cloud.callFunction({
      name: 'getImageFileID',
      data: {},
      success(res) {
        if (res.result) {
          res.result.data.forEach((item, i) => {
            wx.cloud.downloadFile({
              fileID: item.fileID, // 文件 ID
              success: ress => {
                that.data.imagePaths.push(ress.tempFilePath);
                that.setData({
                  imagePaths: that.data.imagePaths
                })
                if (i === res.result.data.length - 1) {
                  wx.hideLoading()
                }
              },
              fail: console.error
            })
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '暂无照片',
          })
        }
      },
      fail: console.error
    })
  },
  uploadImg() {
    const that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        wx.showLoading({
          title: '上传中',
        });
        res.tempFilePaths.forEach(item => {
          that.data.imagePaths.push(item);
          that.setData({
            imagePaths: that.data.imagePaths
          })
          const filePath = item;
          const date = new Date().getTime();
          // 上传图片
          const cloudPath = 'image' + date;
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log('[上传文件] 成功：', res)
              wx.cloud.callFunction({
                name: 'saveImageFileID',
                data: {
                  fileID: res.fileID,
                  cloudPath,
                },
                complete: res => {
                  console.log(res);
                }
              })
            },
            fail: e => {
              console.error('[上传文件] 失败：', e)
              wx.showToast({
                icon: 'none',
                title: '上传失败',
              })
            },
            complete: () => {
              wx.hideLoading()
            }
          })
        })
      }
    })
  },
  previewImage(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.imagePaths // 需要预览的图片http链接列表
    })
  }
})