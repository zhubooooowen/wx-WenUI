// components/Stepper/stepper.js
Component({
  properties: {
    initialValue: {
      type: Number,
      value: 1
    },
    min: {
      type: Number,
      value: 1
    },
    max: {
      type: Number,
      value: 10
    },
    step: {
      type: Number,
      value: 1
    }
  },
  data: {
    // 这里是一些组件内部数据  
  },
  ready: function() {

  },
  methods: {
    // 这里放置自定义方法  
    addStep(e) {
      if (!e.currentTarget.dataset.disabled) {
        let initialValue = this.properties.initialValue + this.properties.step;
        this.setData({
          initialValue
        })
        this.triggerEvent('MyAddStep', initialValue);
      }
    },
    subtractStep(e) {
      if (!e.currentTarget.dataset.disabled) {
        let initialValue = this.properties.initialValue - this.properties.step;
        this.setData({
          initialValue
        })
        this.triggerEvent('MySubtractStep', initialValue);
      }
    },
    inputBlur(e) {
      if (e.detail.value < this.properties.min) {
        let initialValue = this.properties.min;
        this.setData({
          initialValue
        })
      } else if (e.detail.value > this.properties.max) {
        let initialValue = this.properties.max;
        this.setData({
          initialValue
        })
      }
    }
  }
})