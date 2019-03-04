Component({
  properties: {
    num: {
      type: Number,
      value: 9
    }
  },
  data: {
    // 这里是一些组件内部数据  
    tempFilePaths: [],
    isShowBtn: true
  },
  ready: function() {

  },
  methods: {
    // 这里放置自定义方法 
    uploadImg() {
      const that = this;
      wx.chooseImage({
        count: that.data.num, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            num: that.data.num - res.tempFilePaths.length
          }, () => {
            if (that.data.num === 0) {
              that.setData({
                isShowBtn: false
              })
            }
          })

          res.tempFilePaths.forEach(item => {
            that.data.tempFilePaths.push(item);
          })

          that.setData({
            tempFilePaths: that.data.tempFilePaths
          })

          that.triggerEvent('Upload', that.data.tempFilePaths);
        }
      })
    },
    previewImage(e) {
      wx.previewImage({
        current: e.currentTarget.dataset.url, // 当前显示图片的http链接
        urls: this.data.tempFilePaths // 需要预览的图片http链接列表
      })
    }
  }
})