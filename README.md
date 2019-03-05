## 朱博文小程序UI组件

#### Progress 进度条

```html
<progress percentage="{{percentage}}"></progress>
```

#### Toast 轻提示

```html
// 基础用法 2s
<toast text='提示' isShow="{{is_toast_Show}}"></toast>

// 5s后消失
<toast text='提示(5s)' isShow="{{is_toast_Show_5s}}" interval='5000'></toast>

// 展示icon
<toast text='这是一个成功提示' isShow="{{is_toast_Show_success}}" status="success"></toast>
```

#### Modal 弹框

```html
// bindModalSure 点击确定的回调
<modal is-show="{{is_modal_show}}" modal-msg="弹框内容" bindModalSure="onMyEvent">
  <view class='slot'>这是插入到slot中的内容</view>
</modal>
```

#### Actionsheet 上拉菜单

```html
// bindModalSure 点击列表每一项的回调
<actionsheet 
  isShow="{{is_actionsheet_Show}}" 
  title="退出后不会删除任何历史数据,下次登录依然可以使用本帐号" 
  list="{{actionsheetList}}" 
  bindRedirect="onMyRedirect">
```

#### Stepper 步进器

```html
// 基础用法(step为1,最小值为1,最大值为10)
<stepper 
  bindMyAddStep="onMyAddStep"
  bindMySubtractStep="onMySubtractStep">
</stepper>

// 进阶用法(step为5,最小值为5,最大值为100,初始值为20)
<stepper 
  bindMyAddStep="onMyAddStep"
  bindMySubtractStep="onMySubtractStep" 
  min="5" 
  max="100" 
  step="5" 
  initialValue="20">
</stepper>
```

#### 日历组件

```html
// 滑动展示最近四周日期 bindSelectDate 点击每一天的回调
<calendar bindSelectDate='selectDate'></calendar>
```

![小程序码](https://github.com/KyrieZbw/wx-WenUI/blob/master/date.jpg?raw=true)

#### 新增云开发留言和相册   持续更新中...

#### 预览地址:



![小程序码](https://github.com/KyrieZbw/wx-WenUI/blob/master/wx.jpg?raw=true)









