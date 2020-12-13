// pages/goods_list/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 0,
        value: "价格",
        isActive: false
      }
    ],
    shopList: []
  },
  totalPgaes: 1,//总页数默认值

  //接口要的参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 11);
    this.QueryParams.cid = options.cid;
    this.getGoodslist()
  
    
  },

  getGoodslist() {
    request({ url: "/goods/search", data: this.QueryParams }).then(res => {
      const { total } = res.data.message
      this.totalPgaes = Math.ceil(total / this.QueryParams.pagesize);
      console.log(this.totalPgaes);
      this.setData({
        shopList: [...this.data.shopList,...res.data.message.goods]
      })
    })
    wx.stopPullDownRefresh()
      

  },

  handleItemChange(e) {
    console.log(e,'88');
    let { index } = e.detail;
    const { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
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
    //第一步 把数据清空
      this.setData({
       shopList: []
      })
         //第二步 把数据清空
        // 把页码置为1
        this.QueryParams.pagenum=1;
           //第三步 重新发起请求 
           this.getGoodslist()


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum>= this.totalPgaes){
       wx.showToast({
         title: '亲,没有下一页了',
         
       });
         

    }else{
      this.QueryParams.pagenum++;
      this.getGoodslist()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})