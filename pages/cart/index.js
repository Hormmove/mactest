// 导入请求函数
import {
  request
} from '../../request/index.js'
// 导入ES7的async的方法
import regeneratorRuntime from '../../lib/runtime/runtime';
// 这里导入ES7中封装的方法
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 1,设置地址变量
    address: {},
    // 2:设置全选
    allChecked: true,
    // 3:设置购物车数组
    cart: [],
    // 4:设置总价格
    totalPrice: 0,
    // 5:设置总数量
    totalNum: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 在这里因为要多次操作 其实也是可以放在onLoad里的
    // 首先获取缓存中有没有地址
    let address = wx.getStorageSync('address');
    this.setData({
      address
    })
    // 获取缓存中有没有购物车数据
    let cart = wx.getStorageSync('cart') || [];
    console.log(cart,33);
    this.setData({
      cart
    })
    this.setCart(cart);



  },
  // 第一步是获取收货地址的
  async handelChooseAddress() {
    try {
      let res1 = await getSetting();
      console.log(res1, 22);
      let ScopeAddress = res1.authSetting['scope.address'];
      if (ScopeAddress == false) {
        // 如果没有默认存储的地址 那就调用授权获取
        await openSetting()
      }
      // 如果有默认收货地址 就调用api获取
      let res2 = await chooseAddress();

      wx.setStorageSync('address', res2)
      console.log(res2, 66);
    } catch (error) {
      console.log(error);

    }






  },

  // 第二步 全选框 选中与否的部分
  checkedChange(e) {
    console.log(e, 22);
    let goods_id = e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;
    let index = cart.findIndex(item => item.goods_id == goods_id);
    cart[index].checked = !cart[index].checked;
    this.setData({
      cart
    })
    this.setCart(cart);
  },

  // 第三步 
  allCheckedChange(){
    let {cart,allChecked}= this.data;
    console.log(cart,22);
    allChecked=!allChecked
    cart.forEach(item=>item.checked=allChecked);
    this.setData({
      allChecked
    })
    this.setCart(cart);
  },
  //  第四部
  async operationGoods(e){
    let {cart} =this.data;
    console.log(cart,22);
    let {id,operation} =e.currentTarget.dataset;
   let index = cart.findIndex(item=>item.goods_id==id);
   if(cart[index].num==1&&operation==-1){
     let res = await wx.showModal({ title: '您确定要删除此商品吗?',});
     if(res.confirm){
       cart.splice(index,1);
       this.setCart(cart);

     }else{
       cart[index].num+=operation;
       this.setCart(cart);
     }
      
      
  
       
   }

  },
  // 第五部分 点击结算部分
  handlePay(){
    let {cart,address}=this.data;
    if(cart.length===0){
      wx.showToast({title:"您还没听添加商品"})
    }

    if(!address.userName){
      wx.showToast({title:"清先添加地址"})
    }

    wx.navigateTo({
      url: '/pages/pay/index',
    
    });
      

  },

  // 第六部分结算
  setCart(cart){
    let allChecked=cart.length>0?cart.every(item=>item.checked):false;

    let totallNum=0;
    let totalPrice=0;
    cart.forEach(item=>{
        if(item.checked){
          totallNum+=item.num;
          totalPrice+=item.num*item.goods_price;
        }
    })
    this.setData({
      allChecked,
      totallNum,
      totalPrice,
      cart
    })
    wx.setStorageSync('cart',cart)
    console.log(totalPrice,88)

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