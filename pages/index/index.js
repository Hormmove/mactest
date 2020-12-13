//Page Object
import { request } from '../../request/index.js'
Page({
  data: {
    newDate: [],
    cateList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function (options) {
    this.getNewDate()
    this.getCateList()
    this.getFloorList()

  },
  getNewDate(){
    request({ url: "/home/swiperdata" }).then(res => {
    this.setData({
      newDate: res.data.message
    })
  })
 },
  getCateList(){
    request({ url: "/home/catitems" }).then(res => {
    this.setData({
      cateList: res.data.message
    })
  })
 },
  getFloorList(){
    request({ url: "/home/floordata" }).then(res => {
    this.setData({
      floorList: res.data.message
    })
  })
 },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
