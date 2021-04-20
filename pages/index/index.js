// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    showIntro:false,
    showRecord:false,
    animationData:{},
  },
  //动画
  animation(){
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease'
    })

    this.animation = animation

    // animation.translateX(1000).step()

    // this.setData({
    //   animationData:animation.export()
    // })

    let next = true;
    let count = 0;
    //连续动画关键步骤
    setInterval(function () {
      count++
      if (next) {
        animation.translateX(200).step({duration:3000})
        // animation.translateY(5)
        // this.animation.scale(0.95).step()   
        next = !next;
      } else {
        animation.translateX(-400).step({duration:1})
        // animation.translateY(0)
        // this.animation.scale(1).step()
        next = !next;
      }
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 2000)
  },

  onLoad() {
    this.animation()
  },
  togglleRule(){
    this.setData({
      showIntro:!this.data.showIntro
    })
  },
  togglleRecord(){
    this.setData({
      showRecord:!this.data.showRecord
    })
  },
  startTest(){
    //todo 判断登录
     // 登录
     wx.login({
      success: res => {
        console.log(res)
        app.wxRequest('post','/auth/login',{code:res.code},(res)=>{
          app.globalData.token=res.data.data.token
          console.log(app.globalData.token)
          wx.navigateTo({
            url: '/pages/test/test',
          })
        })
      }
    })
    //todo 判断今日答题次数
    //todo 跳转到答题页

   
  },



  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
