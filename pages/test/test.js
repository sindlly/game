// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:0,
    timeValue:0,
    question:'1929年12月，中共中央制定了《中共中央秘密工作条例》，其中明确了各级党的秘密委员会的职责任务。其中包括____。',
    selection:[1,2,3,4],
    resoultId:1,
    showSuccessModal:false,
    showFailModal:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setTime()
  },

  setTime(){
    setInterval(()=>{
      let count = this.data.time
      if(count==30) return
      count++
      this.setData({
        time:count
      })
    },1000)
  },
  chiose(e){
    console.log(e)
    if(e.currentTarget.dataset.id == 1){
      this.setData({
        resoultId:1
      })
    }
  },
  showModal(){
    this.setData({
      showSuccessModal:true
    })
  },
  showFailModal(){
    this.setData({
      showFailModal:true
    })
  },
  //领取奖品
  getGrade(){
    wx.navigateTo({
      url: '/pages/form/form',
    })
  },
  //继续挑战
  goOn(){
    this.setData({
      showSuccessModal:false,
      showFailModal:false,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      timeValue:100
    })
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

  }
})