// pages/category/index.js
import { request } from '../../request/index.js'
Page({
  data: {
    leftMenuList:[],
    rightComtent:[],
    currentIndex:0,
    cates:[],
    scrollTop:0
  },
  

  onLoad: function (options) {
    const Cates =wx.getStorageSync("cates");
    if(!Cates){
      this.getCates()
    }else{
      if(Date.now()-Cates.time>1000*10){
        this.getCates()
      }else{
          this.cates=Cates.data;
          let leftMenuList =this.cates.map(v=>{ return v.cat_name});
          let rightComtent=this.cates[0].children;
          this.setData({
           leftMenuList,
           rightComtent
          })
      }
    }
      

  },
  getCates() {
    request({ url: "/categories" }).then(res => {
       console.log(res);
       this.cates=res.data.message;
       wx.setStorageSync("cates", {time:new Date(),data:this.cates});
        //  这里是存下 当前强求后设置本地存储
       let leftMenuList =this.cates.map(v=>{ return v.cat_name});
       let rightComtent=this.cates[0].children;
       this.setData({
        leftMenuList,
        rightComtent
       })

    })
  },
  handleTap(e){
    console.log(e);
    const {index} =e.currentTarget.dataset;
    console.log(index,11)
    let rightComtent=this.cates[index].children;
    this.setData({
      currentIndex:index,
      rightComtent,
      scrollTop:0
    })

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

  }
})