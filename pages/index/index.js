//index.js
//获取应用实例
import {test,user} from "../api/index"
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  test(){
    user().then(res=>{
      console.log(res.data.token['set-cookie'][0].split('; path=/')[0].split('csrfToken=')[1])
      wx.setStorageSync("csrfToken",res.data.token['set-cookie'][0].split('; path=/')[0].split('csrfToken=')[1])
    }).catch(err=>{
      console.log(err)
    })
  },
  test1(){
    test({
      userName1:'4664'
    }).then(res=>{
     console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  onLoad: function () {
    // test().then(res=>{
    //   console.log(res)
    // }).catch(err=>{
    //   console.log(err)
    // })
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo)
        test({
          userName1:'4664'
        })
        user({
          ...res.userInfo
        })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log()
    app.globalData.userInfo = e.detail.userInfo
   // user(JSON.parse(e.detail.rawData))
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
