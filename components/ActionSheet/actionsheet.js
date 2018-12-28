// components/Actionsheet/actionsheet.js
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
        if (newVal === true) {
          this.setData({
            isRender: true
          })
        }
      }
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
    isRender: false
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
      this.triggerEvent('Redirect', e.currentTarget.dataset);
    }
  }
})