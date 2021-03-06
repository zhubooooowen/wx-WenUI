//获取应用实例
const app = getApp()
Page({
  data: {
    course: [{
        time: 'PM6:00',
        isEnd: true,
        list: [{
            title: '普拉提训练',
            coach: 'Alice',
            price: '$69',
            isEnd: true,
            img: '/imgs/4.png',
            btn: '结束'
          },
          {
            title: '普拉提训练',
            coach: 'Alice',
            price: '$69',
            isEnd: true,
            img: '/imgs/4.png',
            btn: '结束'
          },
          {
            title: '普拉提训练',
            coach: 'Alice',
            price: '$69',
            isEnd: true,
            img: '/imgs/4.png',
            btn: '结束'
          },
          {
            title: '普拉提训练',
            coach: 'Alice',
            price: '$69',
            isEnd: true,
            img: '/imgs/4.png',
            btn: '结束'
          }
        ]
      },
      {
        time: 'PM8:00',
        isEnd: false,
        list: [{
            title: '普拉提训练',
            coach: 'Alice',
            price: '$69',
            isEnd: false,
            img: '/imgs/4.png',
            btn: '预约'
          },
          {
            title: '普拉提训练',
            coach: 'Alice',
            price: '$69',
            isEnd: false,
            img: '/imgs/4.png',
            btn: '预约'
          }
        ]
      },
      {
        time: 'PM9:00',
        isEnd: false,
        list: [{
            title: '普拉提训练',
            coach: 'Alice',
            price: '$69',
            isEnd: false,
            img: '/imgs/4.png',
            btn: '预约'
          },
          {
            title: '普拉提训练',
            coach: 'Alice',
            price: '$69',
            isEnd: false,
            img: '/imgs/4.png',
            btn: '预约'
          },
          {
            title: '普拉提训练',
            coach: 'Alice',
            price: '$69',
            isEnd: false,
            img: '/imgs/4.png',
            btn: '预约'
          },
          {
            title: '普拉提训练',
            coach: 'Alice',
            price: '$69',
            isEnd: false,
            img: '/imgs/4.png',
            btn: '预约'
          }
        ]
      }
    ],
    isShow: false,
  },
  onLoad: function(options) {
    // console.log(app.globalData.userInfo);
  },
  toCourseDetails: function(e) {
    if (!e.currentTarget.dataset.end) {
      wx.navigateTo({
        url: '../courseDetails/courseDetails'
      })
    } else {
      this.setData({
        isShow: true
      })
    }
  },

  toReservation: function(e) {
    if (!e.target.dataset.isend) {
      wx.navigateTo({
        url: '../reservation/reservation'
      })
    } else {
      this.setData({
        isShow: true
      })
    }
  },

  selectDate: function(data) {
    console.log(data.detail.id, data.detail.dataset.month);
  },

  // 下拉框
  selectVenue: function() {
    this.setData({
      showVenue: !this.data.showVenue,
      showCourse: false
    })
  },

  selectCourse: function() {
    this.setData({
      showVenue: false,
      showCourse: !this.data.showCourse
    })
  },

  // 下拉框选择
  selectVenueName: function(e) {
    console.log(e.target.dataset.index);
    for (var key in this.data.venueList) {
      this.data.venueList[key].isSelect = false;
    }
    this.data.venueList[e.target.dataset.index].isSelect = true;
    this.setData({
      venueList: this.data.venueList,
      showVenue: false,
      venueTitle: this.data.venueList[e.target.dataset.index].name
    })
  },

  selectCourseName: function(e) {
    console.log(e.target.dataset.index);
    for (var key in this.data.courseList) {
      this.data.courseList[key].isSelect = false;
    }
    this.data.courseList[e.target.dataset.index].isSelect = true;
    this.setData({
      courseList: this.data.courseList,
      showCourse: false,
      courseTitle: this.data.courseList[e.target.dataset.index].name
    })
  }
})