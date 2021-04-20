// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },
  globalData: {
    url: 'http://reading.cqyir.com/api',
    token:'e72e2742-4c65-4b5e-b787-4c8afbe6fa40',
    record_id:'',  //问卷id
    reward:1, //领取的奖励 1 - 第一关，2 - 第二关，3 - 第三关
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
        'content-type': method == 'GET'?'application/json':'application/x-www-form-urlencoded',
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
