// components/calendar/calendar.js
Component({
  properties: {

  },
  data: {
    // 这里是一些组件内部数据  
    week: ['日', '一', '二', '三', '四', '五', '六'],
    month: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    thisWeek: {
      week: [],
      month: []
    },
    thisDay: '',
    nextWeek: {
      week: [],
      month: []
    },
    thirdWeek: {
      week: [],
      month: []
    },
    fourthWeek: {
      week: [],
      month: []
    },
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 300,
  },
  ready: function () {
    var Nowdate = new Date();
    // 获取这周一的日期和所在的月份
    var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
    var M = Number(WeekFirstDay.getMonth()) + 1
    console.log(M, WeekFirstDay.getDate() - 1);
    // 获取当前日期的月份
    var thisMonth = Nowdate.getMonth() + 1;
    console.log(thisMonth);
    // 获取这周末的日期
    var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
    console.log(WeekFirstDay, WeekLastDay);
    var nextFourWeekDays = [];
    // 获取上周日开始未来28天的月份
    for (let i = -1; i < 27; i++) {
      nextFourWeekDays.push(new Date((WeekFirstDay / 1000 + i * 86400) * 1000).getMonth() + 1)
    }
    console.log(nextFourWeekDays);
    // 获取这个月的最后一天
    var currentMonth = Nowdate.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(Nowdate.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    var monthLastDay = new Date(nextMonthFirstDay - oneDay).getDate();
    console.log(monthLastDay);
    // 获取上个月的天数
    var getLastMonthDays = function () {
      var now = new Date;
      now.setMonth(now.getMonth() - 1);
      now.setDate(1);
      var next = new Date;
      next.setDate(1);
      var arr = [];
      while (now < next) {
        arr.push(now.getDate());
        now.setDate(now.getDate() + 1);
      }
      return arr;
    }
    var lastMonthDays = getLastMonthDays().length;
    console.log(lastMonthDays);
    // 获取这个月的天数
    function getThisMonthDays() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var d = new Date(year, month, 0);
      return d.getDate();
    }
    console.log(getThisMonthDays());
    var thisMonthDays = getThisMonthDays();
    // 这一周的日期和月份
    for (let i = -1; i < 6; i++) {
      // 判断这周第一天(周一)加上i是否大于这个月的天数,大于就减去这个月的天数
      var day;
      if (WeekFirstDay.getDate() + i > thisMonthDays) {
        day = WeekFirstDay.getDate() + i - thisMonthDays;
      } else {
        day = WeekFirstDay.getDate() + i;
      }
      this.data.thisWeek.week.push(day);
    }
    for (let i = 0; i < 7; i++) {
      this.data.thisWeek.month.push(this.data.month[nextFourWeekDays[i] - 1])
    }
    // 下一周的日期和月份
    for (let i = 6; i < 13; i++) {
      var day;
      if (WeekFirstDay.getDate() + i > thisMonthDays) {
        day = WeekFirstDay.getDate() + i - thisMonthDays;
      } else {
        day = WeekFirstDay.getDate() + i;
      }
      this.data.nextWeek.week.push(day);
    }
    for (let i = 7; i < 14; i++) {
      this.data.nextWeek.month.push(this.data.month[nextFourWeekDays[i] - 1])
    }
    // 下下一周的日期和月份
    for (let i = 13; i < 20; i++) {
      var day;
      if (WeekFirstDay.getDate() + i > thisMonthDays) {
        day = WeekFirstDay.getDate() + i - thisMonthDays;
      } else {
        day = WeekFirstDay.getDate() + i;
      }
      this.data.thirdWeek.week.push(day);
    }
    for (let i = 14; i < 21; i++) {
      this.data.thirdWeek.month.push(this.data.month[nextFourWeekDays[i] - 1])
    }
    // 下下下一周的日期和月份
    for (let i = 20; i < 27; i++) {
      var day;
      if (WeekFirstDay.getDate() + i > thisMonthDays) {
        day = WeekFirstDay.getDate() + i - thisMonthDays;
      } else {
        day = WeekFirstDay.getDate() + i;
      }
      this.data.fourthWeek.week.push(day);
    }
    for (let i = 21; i < 28; i++) {
      this.data.fourthWeek.month.push(this.data.month[nextFourWeekDays[i] - 1])
    }
    this.setData({
      month: this.data.month[M - 1],
      thisWeek: this.data.thisWeek,
      thisDay: Nowdate.getDate(),
      nextWeek: this.data.nextWeek,
      thirdWeek: this.data.thirdWeek,
      fourthWeek: this.data.fourthWeek
    })
    console.log(this.data.thisWeek, this.data.thisDay, this.data.nextWeek,
      this.data.thirdWeek, this.data.fourthWeek);
  },
  methods: {
    // 这里放置自定义方法 
    chooseDay: function (e) {
      // 是否添加圆形背景是通过判断thisDay==对应日期的,把每一项的id设为日期,这样点击谁就把thisDay设置为谁的id
      // console.log(e.target);
      this.setData({
        thisDay: e.target.id,
        month: e.target.dataset.month
      })
      this.triggerEvent('SelectDate', e.target);
    },
  }
})  