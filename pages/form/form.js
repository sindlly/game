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
    wx.hideHomeButton()
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
    data.record_id = app.globalData.record_id
    data.reward = ""+app.globalData.reward
    
    let isMyreward = "level"+app.globalData.reward
    app.wxRequest('post','/orders',data,(res)=>{
        if(res.code == 0){
          let sorryText = isMyreward == res.data.data.level?'':'您申请的奖品已经被领完,'
          //提交成功，返回首页
          wx.showModal({
            title: '提交成功',
            showCancel:false,
            content: `${sorryText}恭喜你获得${res.data.data.name}`,
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }
            }
          }) 
        }else if(res.code == 12002){
          //表奖品已经被领完 可以选择下一级产品
          wx.showModal({
            title: '提交成功',
            showCancel:false,
            content: `很遗憾，奖品已发完`,
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }
            }
          }) 
        }else if(res.code == 12005){
          wx.showModal({
            title: '提交失败',
            showCancel:false,
            content: `您已经领过奖品，不能重复领奖`,
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }
            }
          }) 
        }
    })
  },
})