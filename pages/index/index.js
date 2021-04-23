// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    showIntro:false,
    showRecord:false,
    animationData:{},
    animationData2:{},
    animationData3:{},
    animationDataBtn:{},
    records:[],
    intervalId:null,
  },
  //动画
  animation(){
    clearInterval(this.data.intervalId)
    let animation = wx.createAnimation({
      duration: 5000,
      timingFunction: 'linaer'
    })
    // this.animation = animation
    let next = true;
    //连续动画关键步骤
    this.data.intervalId = setInterval(function(){
      if (next) {
        animation.translateY(-20).step()
        // animation.translateY(0).step()
        next = !next;
      } else {
        animation.translateY(20).step()
        // animation.translateY(20).step()
        next = !next;
      }
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 5000)
    
    animation.translateY(20).step()
    // animation.translateY(20).step()
    this.setData({
      animationData:animation.export()
    })
  },
  

  onLoad() {
    this.animation()
    this.scaleBtn()
    // wx.playBackgroundAudio({
    //   dataUrl: 'https://gv-sycdn.kuwo.cn/41ae2b1aa428c02bb5eb830fe4caabe0/60801791/resource/n2/43/38/2842262638.mp3',
    //   title: '',
    //   coverImgUrl: ''
    // })
    
  },
  
  togglleRule(){
    this.setData({
      showIntro:!this.data.showIntro
    })
  },
  togglleRecord(){
    this.setData({
      showRecord:!this.data.showRecord
    },()=>{
      if(this.data.showRecord){
        //获取答题记录
        wx.showLoading({
          title: '请稍等',
        })
        wx.login({
          success: res => {
            // console.log(res)
            app.wxRequest('post','/auth/login',{code:res.code},(res)=>{
              app.globalData.token=res.data.data.token
                app.wxRequest("get","/users/statistics",'',(res)=>{
                  let temp = res.data.data.records
                  temp.map((item,index)=>{
                    temp[index].time =item.time.replace(/T|Z/g," ")
                    temp[index].reward = item.reward == '1'?"三等奖":item.reward == '2'?'二等奖':item.reward == '3'?'一等奖':'无'
                  })
                  this.setData({
                    records:temp
                  },()=>{
                    wx.hideLoading({
                      success: (res) => {},
                    })
                    // console.log(this.data.records)
                  })
                })
            })
          }
        })
      }
    })
    
  },
  scaleBtn(){
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })
    animation.scale(1.2,1.2).step()
    this.setData({
      animationDataBtn:animation.export()
    })
    let next = true
    //连续动画关键步骤
    setInterval(function(){
      if (next) {
        animation.scale(1,1).step()
        // animation.translateY(0).step()
        next = !next;
      } else {
        animation.scale(1.2,1.2).step()
        // animation.translateY(20).step()
        next = !next;
      }
      this.setData({
        animationDataBtn: animation.export()
      })
    }.bind(this), 1000)
  },
  startTest(){
    //todo 判断登录
     // 登录
     this.scaleBtn()
     wx.showLoading({
      title: '请稍等',
    })
     wx.login({
      success: res => {
        // console.log(res)
        app.wxRequest('post','/auth/login',{code:res.code},(res)=>{
          app.globalData.token=res.data.data.token
          app.wxRequest('get',"/questions/chance",'',(res)=>{
              wx.hideLoading({
                success: (res) => {},
              })
            if(res.data.data.chance == 0){
                wx.showModal({
                  title: '提示',
                  showCancel:false,
                  content: `您今日的答题次数已用完，请明天再来`,
                }) 
            }else{
              wx.redirectTo({
                url: '/pages/test/test',
              })
            }
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
        // console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    // console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
