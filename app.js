// app.js
App({
  onLaunch() {
  },
  onShow: function () {
    //播放音乐
    wx.playBackgroundAudio({
      dataUrl: 'https://gv-sycdn.kuwo.cn/41ae2b1aa428c02bb5eb830fe4caabe0/60801791/resource/n2/43/38/2842262638.mp3',
      title: '',
      coverImgUrl: ''
    })
  },
    /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.stopBackgroundAudio()
  },
  globalData: {
    url: 'https://reading.cqyir.com/api',
    token:'ed76ce54-aa3e-40a6-8aa3-4983b6eac0ec',
    record_id:'',  //问卷id
    reward:2, //领取的奖励 1 - 第一关，2 - 第二关，3 - 第三关
  },
  /**
    * 封装wx.request请求
    * method： 请求方式
    * url: 请求地址
    * data： 要传递的参数
    * callback： 请求成功回调函数
    * errFun： 请求失败回调函数
    **/
   wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: this.globalData.url+url,
      method: method,
      data: data,
      header: {
        // 'content-type': method == 'GET'?'application/json':'application/x-www-form-urlencoded',
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Cookie':'access_token='+this.globalData.token
      },
      dataType: 'json',
      success: function (res) {
        callback(res.data);
      },
      fail: function (err) {
        errFun(res);
      }
    })
  }
})
