// components/Actionsheet/actionsheet.js
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: true,
    },
    title: {
      type: String,
      value: ''
    },
    list: {
      type: Array,
      value: []
    }
  },
  data: {
    // 这里是一些组件内部数据  
  },
  ready: function() {

  },
  methods: {
    // 这里放置自定义方法  
    actionsheetHidden() {
      this.setData({
        isShow: false
      })
    },
    onRedirect(e) {
      this.triggerEvent('Redirect',e.currentTarget.dataset);
    }
  }
})