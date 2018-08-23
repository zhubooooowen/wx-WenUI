// components/SkidRemove/skidremove.js
Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  data: {
    // 这里是一些组件内部数据 
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  },
  ready: function() {

  },
  methods: {
    // 这里放置自定义方法 
    start(e) {
      this.setData({
        startX: e.touches[0].pageX,
        startY: e.touches[0].pageY
      })
    },
    move(e) {},
    end(e) {
      const {
        list
      } = this.data;
      this.setData({
        endX: e.changedTouches[0].pageX,
        endY: e.changedTouches[0].pageY
      });
      const direction = this.getSlideDirection(this.data.startX, this.data.startY, this.data.endX, this.data.endY);
      // 往左滑
      if (direction == 3) {
        list[e.currentTarget.dataset.index].active = true;
        this.setData({
          list
        })
      } else if (direction == 4) {
        list[e.currentTarget.dataset.index].active = false;
        this.setData({
          list
        })
      }
    },
    // 计算滑动角度
    // 方向的判断，以起点做平面坐标系，与终点连线做直线，直线与x正半轴计算角度；我们以45度角为方向分割线，如：只要滑动角度大于等于45度且小于135度，则判断它方向为向上滑。
    getSlideAngle(dx, dy) {
      return Math.atan2(dy, dx) * 180 / Math.PI;
    },
    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    getSlideDirection(startX, startY, endX, endY) {
      const dy = this.data.startY - this.data.endY;
      const dx = this.data.endX - this.data.startX;
      let result = 0;

      //如果滑动距离太短
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
      }

      const angle = this.getSlideAngle(dx, dy);
      if (angle >= -45 && angle < 45) {
        result = 4;
      } else if (angle >= 45 && angle < 135) {
        result = 1;
      } else if (angle >= -135 && angle < -45) {
        result = 2;
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
      }

      return result;
    },
    deleteItem(e) {
      const {
        list
      } = this.data;
      list.splice(e.currentTarget.dataset.index, 1);
      this.setData({
        list
      })
    }
  }
})