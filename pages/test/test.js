// pages/test/test.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:0,
    timeValue:0,
    title:'',   //题目
    options:[], //选项
    showSuccessModal:false,
    showFailModal:false,
    
    questionSet:{},//问题总集
    CurrenId:'',//问卷id
    level_type:['level1', 'level2', 'level3'], //问题等级，
    question_id:"607ce84f744d7123848de58d", //问题id
    question_value:"A",  //问题答案选项
    currentPageCount:0, // 当前题目,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //todo 1、获取题目
    //todo 2、开始计时
    this.setTime()
    this.getQuestions()
  },
  getQuestions(){
    //todo 请求获取题目
    app.wxRequest('get','/questions',null,(res)=>{
      console.log(res)
      this.setData({
        CurrenId:res.data.data.id,
        questionSet:res.data.data
      },()=>{
        this.setQuestion()
      })
    })
  },
  setQuestion(){
    this.setData({
      title:this.questionSet[this.data.level_type[0]][this.data.currentPageCount],
      currentPageCount:this.data.currentPageCount+1
    })
  },
  resetData(){
    this.setData({
      time:0,
      timeValue:100,
    })
  },
  setTime(){
    setInterval(()=>{
      let count = this.data.time
      if(count==30){
        // this.showFailModal()
        return
      } 
      count++
      this.setData({
        time:count
      })
    },1000)
  },
  chiose(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    let temp = this.data.options
    // let isRight = false
    //校验答案
    app.wxRequest('post', `/questions/${this.data.CurrenId}/answer`,{
      level_type:this.data.level_type, 
      question_id:this.data.question_id, //问题id
      question_value:e.currentTarget.dataset.id,  //问题答案选项
    },(res)=>{
      if(res.code==0){
        // isRight = true
        //处理正确答案
        temp[index].class = 'selection-right'
        this.setData({
          options:temp
        })
        // 判断当前level是否答对10题
        if(this.data.currentPageCount==9){
          //判断当前是否为第三关
          if(this.data.level_type.length ==1){
            //直接弹窗提示领取一等奖
          }
          else{
            // todo 弹窗询问领奖还是继续

            //todo 继续答题，则level 升级 currentPageCount置0
            let temp = this.data.level_type
            temp.shift()
            this.setData({
              level_type:temp,
              currentPageCount:0
            },()=>{
              this.setQuestion()
            })
          }
        }else{
          //下一题
          this.setQuestion()
        }
      }else{
        // isRight = false
        //处理错误答案
        temp[index].class = 'selection-false'
        this.setData({
          options:temp
        })
        //答案错误弹窗
        this.showFailModal()
      }
    })
  },
  showModal(){
    this.setData({
      showSuccessModal:true,
      timeValue:0,
    })
  },
  showFailModal(){
    this.setData({
      showFailModal:true,
      timeValue:0,
    })
  },
  //领取奖品
  getGrade(){
    wx.navigateTo({
      url: '/pages/form/form',
    })
  },
  goHome(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  //继续挑战
  goOn(){
    this.setData({
      showSuccessModal:false,
      showFailModal:false,
    })
    this.resetData()
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