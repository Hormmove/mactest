let httpTimes =0
export const request = (params) => {
    httpTimes++;
    wx.showLoading({
        title: '加载中',
        mask:true
      })
    const baseURL="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            // url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
            ...params,
            url:baseURL+params.url,
            success: (result) => {
                resolve(result)
                // console.log(result);
            },
            fail: (err) => {
                reject(err)
            },
            complete:()=>{
                httpTimes--;
                if(httpTimes===0){
                    wx.hideLoading()
                }
               
            }


        });
    })
}