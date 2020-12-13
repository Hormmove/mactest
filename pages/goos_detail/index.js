// 导入请求函数
import {request } from '../../request/index.js'
// 导入ES7的async的方法
import regeneratorRuntime from '../../lib/runtime/runtime';
// 这里导入ES7中封装的方法
import {showToast} from  '../../utils/asyncWx'
Page({
  data: {
    // 获取商品的详情数据 
    goodsDetail:{},
    // 设置收藏的样子
    isCollect:false

  },
//  需要的对象信息
goodsInfo:{},
goods_id:{},
  onLoad: function(options) {
    console.log(options,22);
    this.goods_id=options.goods_id;
    console.log(this.goods_id);
    this.getGoodsDetail()
    
  },
  // 发送请求
  async getGoodsDetail(){
    let res = await request({url:'/goods/detail',data:{goods_id:this.goods_id}});
    // console.log(res ,22);
    this.goodsInfo=res.data.message;
   
    console.log(this.goodsInfo,33);
    let goodsDetail = {
      pics:res.data.message.pics,
      // iphone 部分手机 不识别 webp格式图片
      // 最好找到后台 让他进行修改
      // 临时自己改 确保后台存在 1.webp =》 1.jpg  
      goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
      goods_price:res.data.message.goods_price,
      goods_name:res.data.message.goods_name
  }
    // 这里是做了一个判断   先获取缓存中的数据 如果没有那就是空数组
    let collect=wx.getStorageSync('collect')|| [];
    // 这里遍历出收藏中是否有提前选中
    let isCollect =collect.some(item=>item.goods_id=== this.goodsInfo.goods_id);
    this.setData({
      goodsDetail,
      isCollect
    })
    

      

  },

  // 这里是点击轮播图放大效果
  handlePreviewImage(e){
    console.log(e,11);
    let url = e.currentTarget.dataset.url;
    let urls = this.data.goodsDetail.pics.map(item=>item.pics_mid);
    console.log(urls,33);
    // 微信内置的图片放大方法
    wx.previewImage({
      current: url,
      urls: urls,
    });
      

  },

  // 添加到购物车
  handleCartAdd(){
    // console.log("点击");
    // 首先还是判断是否缓存中有数据 第一次肯定是没有的 所以是空数组
    let cart = wx.getStorageSync('cart')|| []; 
    // 确定找到元素的索引位置findIndex 返回的是索引值
    let index =cart.findIndex(item=>item.goods_id===this.goodsInfo.goods_id);
    if(index==-1){
      this.goodsInfo.num=1;
      this.goodsInfo.checked=true;
      // 把商品的数据增加到购物车中
      cart.push(this.goodsInfo);

    }else{
    // 如果已经存在了 就在原始基础上再加1
      cart[index].num++
    }
  console.log(this.goodsInfo,44);
    // 5、在这里 再把购物车数据重新添加回缓存中
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '添加成功',
      mask: true,
    });
      
      
      

  },
//  这是添加收藏和取消的部分
  handleCollect(){
    let isCollect =false;
    let collect = wx.getStorageSync('collect')|| [];
    let index = collect.findIndex(item=>item.goods_id===this.goodsInfo.goods_id);
    if(index!==-1){
      // 如果不能于-1 那就表面之前有收藏过 那就不能再收藏 移除出去
      collect.splice(index,1)
      // 这里取消选中
      isCollect =false;
      // 模态框的实现 显示取消成功
      wx.showToast({
        title: '取消收藏成功',
        icon:'success'
      });
        

    }else{
      // 再这里增加到收藏数组中存入
      collect.push(this.goodsInfo)
      // 显示选中状态
      isCollect =true;
      // 模态框显示成功收藏
      wx.showToast({
        title: '收藏成功',
        icon:'success'
      });
        
    }
    // 在这里再把已经修改后的数据存入到缓存中
    wx.setStorageSync('collect', collect);
    // 再给data中的数据赋值
    this.setData({
      isCollect
    })
    // 打印下索引值 查看是否是 0,-1 之间切换
    console.log(index);
      
      
  },
  // 这是点击购买的部分
  nowPay(){
    // 第一步 获取缓存中的和购物车数据 没有的话就是返回一个空数组
    let cart = wx.getStorageSync('cart')|| [];
    // 第二步  确定下数组中数据的索引位置
    let index =cart.findIndex(item=>item.goods_id===this.goodsInfo.goods_id);
    // 第三步 判断下是否存在
    if(index==-1){
      this.goodsInfo.num=1;
      this.goodsInfo.checked=true;
      cart.push(this.goodsInfo);
      // 还是把数据存入当前的缓存中
      wx.setStorageSync('cart',cart)
    }else{
      wx.switchTab({
        url: '/pages/cart/index',
       
      });
        
    }



  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  