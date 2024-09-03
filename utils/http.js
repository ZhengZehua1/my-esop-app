//配置基地址
// const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const interceptors = {
    invoke(args) {
      // 加载中 弹框
      uni.showLoading({ title: "加载中" });
      // request 触发前拼接 url  ，判断是否https 开头
      if (!args.url.startsWith('https')) {
          args.url = baseURL+args.url
      }
      // 添加请求头
      args.header= {
        // 保留原本的字段
          ...args.header,
		  'Content-Type': 'application/json'
      }
    },
    complete(res) {
      // 不管请求成功失败都调用该函数
      uni.hideLoading();
    }
  }
  // 请求事件
uni.addInterceptor('request', interceptors)
// 文件上传事件
uni.addInterceptor('uploadFile', interceptors)
export const http = async(data)=>{
    const res = await uni.request(data)
    if (res.statusCode >=200 && res.statusCode <300) {
        return res.data
    }
    // token 处理
    if (res.statusCode === 401) {
        uni.navigateTo({url:'/pages/login/login'})
        return
    }
}