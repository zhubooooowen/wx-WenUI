// components/Toast/toast.js
Component({
  properties: {
    text: {
      type: String,
      value: ' ',
    },
    status :{
      type: String,
      value: ' ',
    },
    interval: {
      type: Number,
      value: 2000,
    },
    isShow: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) {
        // 两秒之后消失
        var that = this;
        if (this.data.isShow) {
          setTimeout(function () {
            that.setData({
              isShow: false
            })
          }, that.data.interval)
        }
      }
    }
  },
  data: {
    // 这里是一些组件内部数据  
  },
  ready: function () {

  },
  methods: {
    // 这里放置自定义方法  
  }
})  