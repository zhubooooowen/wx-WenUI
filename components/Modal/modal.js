// components/Dialog/dialog.js
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false
    }, //这里定义了isShow属性，属性值可以在组件使用时指定.is-show  
    modalMsg: {
      type: String,
      value: ' ',
    }
  },
  data: {
    // 这里是一些组件内部数据  
    text: "text",
    is_toast_show: false
  },
  methods: {
    // 这里放置自定义方法  
    modal_click_Hidden: function() {
      this.setData({
        isShow: false,
        is_toast_show: true
      })
    },
    // 确定  
    Sure: function() {
      console.log(this.data.text);
      this.triggerEvent('ModalSure', 'modal组件传递的数据');
    }
  }
})