Page({
  data: {
    // 图片展示
    imagePaths: [],
    // 新图片上传
    newImagePaths: [],
    isShow: false,
    // fileId 列表 用于获取图片列表 
    fileIdList: [],
    // _id 和 fileId 列表 _id 用于删除数据库的内容 fileId 用于删除图片
    // 每次下载 上传 删除 都要更新 fileIdList 和 idList
    idList: [],
    // 是否抖动
    isShake: false,
  },
  onShareAppMessage: function() {},
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
            that.data.idList.unshift(item);
            that.data.fileIdList.unshift(item.fileID);
          })
          that.setData({
            idList: that.data.idList,
            fileIdList: that.data.fileIdList,
          }, () => {
            wx.cloud.getTempFileURL({
              fileList: that.data.fileIdList,
              success: res => {
                res.fileList.forEach(item => {
                  // 已经按倒序传参了 所以 push
                  that.data.imagePaths.push(item.tempFileURL);
                  that.setData({
                    imagePaths: that.data.imagePaths
                  }, () => {
                    wx.hideLoading();
                  })
                })
              },
              fail: err => {}
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
            quality: 80, // 压缩质量
            success: function(ress) {
              // 新图片展示 unshift 倒序展示
              that.data.imagePaths.unshift(ress.tempFilePath);
              // 新图片 push 按顺序上传
              that.data.newImagePaths.push(ress.tempFilePath);
              that.setData({
                imagePaths: that.data.imagePaths,
                newImagePaths: that.data.newImagePaths,
              }, () => {
                const date = new Date().getTime();
                const filePath = that.data.newImagePaths[i];
                const cloudPath = 'image' + date;
                wx.cloud.uploadFile({
                  cloudPath,
                  filePath,
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
                          // 上传成功清除新图片数组
                          that.setData({
                            newImagePaths: [],
                          })
                          // 图片上传成功同步更新fileID列表
                          wx.cloud.callFunction({
                            name: 'getImageFileID',
                            data: {},
                            success(res) {
                              res.result.data.forEach(item => {
                                that.data.idList.unshift(item);
                                that.data.fileIdList.unshift(item.fileID);
                              })
                              that.setData({
                                idList: that.data.idList,
                                fileIdList: that.data.fileIdList
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
    const {
      index
    } = e.currentTarget.dataset;
    const {
      _id,
      fileID
    } = e.currentTarget.dataset.imagedata;
    if (!this.data.isShake) {
      wx.previewImage({
        current: e.currentTarget.dataset.url, // 当前显示图片的http链接
        urls: this.data.imagePaths // 需要预览的图片http链接列表
      })
    } else {
      // console.log(e.currentTarget.dataset);
      wx.showLoading({
        title: '删除中',
      })
      this.data.imagePaths.splice(index, 1);
      this.data.fileIdList.splice(index, 1);
      this.data.idList.splice(index, 1);
      this.setData({
        imagePaths: this.data.imagePaths,
        fileIdList: this.data.fileIdList,
        idList: this.data.idList
      }, () => {
        this.setData({
          isShake: false,
          isShow: false
        })
        const that = this;
        wx.cloud.callFunction({
          name: 'deleteImageFileID',
          data: {
            _id,
          },
          complete: res => {
            wx.cloud.deleteFile({
              fileList: [fileID],
              success: res => {
                wx.hideLoading();
              },
              fail: console.error,
              complete() {
                wx.showToast({
                  title: '删除成功',
                  icon: 'none'
                })
                that.setData({
                  isShow: true
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