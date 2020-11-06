import {
	baseURL
} from './config';
class request {
	constructor() {
	  this._header = {
		"contentType": "application/json; charset=utf-8"
	  }
	  this.baseURL= baseURL.dev
	}
  /**
   * 设置统一的异常处理
   */
	setErrorHandler(handler) {
	  this._errorHandler = handler;
	}
	getCookie(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	}
	/**
	 * 网络请求
	 */
	requestAll({url, data, header, method}) {
	  return new Promise((resolve, reject) => {
		  console.log(this.baseURL +url)
		wx.request({
		  url: this.baseURL+url,
		  data: data,
		  header: {
			
		  },
		  method: method,
		  success: (res => {
			if (res.statusCode === 200) {
			  //200: 服务端业务处理正常结束
			  resolve(res)
			} else {
				if(res.statusCode){
					console.error('参数错误')
				}
			  //其它错误，提示用户错误信息
			  if (this._errorHandler != null) {
			  //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
				this._errorHandler(res)
			  }
			  reject(res)
			}
		  }),
		  fail: (res => {
			if (this._errorHandler != null) {
			  this._errorHandler(res)
			}
			reject(res)
		  })
		})
	  })
	}
}
  
export default request