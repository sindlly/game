// pages/form/form.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradeLevel:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gradeLevel:app.globalData.reward
    })
    console.log(app.globalData.reward)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let data = e.detail.value
    data.record_id = app.globleData.record_id
    data.reward = app.globleData.reward
    app.wxRequest('post','/orders',data,(res)=>{
        if(res.code == 0){
          //提交成功，返回首页
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }else if(res.code == 12002){
          //表奖品已经被领完 可以选择下一级产品
        }
    })
  },
})