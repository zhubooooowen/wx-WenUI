Page({
  data: {
    imagePaths: [],
    compressImagePaths: [],
    newImagePaths: [],
    isShow: false,
    fileIDList: [],
    isShake: false,
  },
  onLoad() {
    const that = this;
    wx.cloud.callFunction({
      name: 'getOpenID',
      data: {},
      success(res) {
        if (res.result.openid === 'or_Jn5GCUUD3ckad9qXAVAPFTwrE') {
          that.setData({
            isShow: true
          })
        }
      },
      fail: console.error
    })
    this.getImageList();
  },
  getImageList() {
    const that = this;
    wx.showLoading({
      title: '图片加载中',
    })
    wx.cloud.callFunction({
      name: 'getImageFileID',
      data: {},
      success(res) {
        if (res.result) {
          res.result.data.forEach(item => {
            that.data.fileIDList.unshift(item);
          })
          that.setData({
            fileIDList: that.data.fileIDList,
          })
          let i = 0;
          // 递归依次按顺序加载图片
          (function downloadImage() {
            wx.cloud.downloadFile({
              fileID: res.result.data[i].fileID, // 文件 ID
              success: ress => {
                that.data.compressImagePaths.unshift(ress.tempFilePath);
                that.setData({
                  compressImagePaths: that.data.compressImagePaths
                })
                if (i === res.result.data.length - 1) {
                  wx.hideLoading()
                }
              },
              fail: console.error,
              complete: () => {
                if (i < res.result.data.length - 1) {
                  i++;
                  downloadImage();
                }
              }
            })
          })();
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
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res);
        wx.showLoading({
          title: '图片上传中',
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let i = 0;
        const length = res.tempFilePaths.length;
        // 递归按顺序上传
        (function uploadImage() {
          // 压缩
          wx.compressImage({
            src: res.tempFilePaths[i], // 图片路径
            quality: 0, // 压缩质量
            success: function(ress) {
              // 新图片展示 unshift 倒序展示
              that.data.compressImagePaths.unshift(ress.tempFilePath);
              // 新图片 push 按顺序上传
              that.data.newImagePaths.push(ress.tempFilePath);
              that.setData({
                compressImagePaths: that.data.compressImagePaths,
                newImagePaths: that.data.newImagePaths,
              }, () => {
                const date = new Date().getTime();
                const compressList = that.data.newImagePaths;
                const compressFilePath = compressList[i];
                const compressCloudPath = 'image' + date;
                wx.cloud.uploadFile({
                  cloudPath: compressCloudPath,
                  filePath: compressFilePath,
                  success: res => {
                    // 存到数据库
                    wx.cloud.callFunction({
                      name: 'saveImageFileID',
                      data: {
                        fileID: res.fileID,
                      },
                      complete: res => {
                        if (i < length - 1) {
                          i++;
                          uploadImage();
                        } else if (i === length - 1) {
                          wx.hideLoading();
                          wx.showToast({
                            title: '上传成功',
                            icon: 'none'
                          })
                          // 图片上传成功同步更新fileID列表
                          wx.cloud.callFunction({
                            name: 'getImageFileID',
                            data: {},
                            success(res) {
                              res.result.data.forEach(item => {
                                that.data.fileIDList.unshift(item);
                              })
                              that.setData({
                                fileIDList: that.data.fileIDList,
                              })
                            }
                          })
                        }
                      }
                    })
                  }
                })
              })
            },
            fail: (res) => {
              console.log(res)
            }
          })
        })()
      }
    })
  },
  handleImage(e) {
    if (!this.data.isShake) {
      wx.previewImage({
        current: e.currentTarget.dataset.url, // 当前显示图片的http链接
        urls: this.data.compressImagePaths // 需要预览的图片http链接列表
      })
    } else {
      console.log(e.currentTarget.dataset);
      wx.showLoading({
        title: '删除中',
      })
      this.data.compressImagePaths.splice(e.currentTarget.dataset.index, 1);
      this.data.fileIDList.splice(e.currentTarget.dataset.index, 1);
      this.setData({
        compressImagePaths: this.data.compressImagePaths,
        fileIDList: this.data.fileIDList
      }, () => {
        this.setData({
          isShake: false
        })
        wx.cloud.callFunction({
          name: 'deleteImageFileID',
          data: {
            _id: e.currentTarget.dataset.imagedata._id,
          },
          complete: res => {
            wx.cloud.deleteFile({
              fileList: [e.currentTarget.dataset.imagedata.fileID],
              success: res => {
                wx.hideLoading();
              },
              fail: console.error,
              complete() {
                wx.showToast({
                  title: '删除成功',
                  icon: 'none'
                })
              }
            })
          }
        })
      })
    }
  },
  handleDelete() {
    this.setData({
      isShake: !this.data.isShake
    })
  }
})