//index.js
//获取应用实例
import {login} from "../api/index"
const app = getApp()

Page({
	globalData:{
        AppID:"wx9f934ab7b992f5bd",
        AppSecret:"a952391d93b639f2f9290d41a9afedf4",
    },
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	/*
	let url='https://api.weixin.qq.com/sns/jscode2session?appid='+d.AppID+'&secret='+d.AppSecret+'&js_code='+res.code+'&grant_type=authorization_code';
	wx.request({  
		url: url,  
		method: 'GET',
		success: res=>{ 
			console.log(res.data.openid)
		}  
	});
	*/ 
	onLoad: function () {
		const d=this.globalData;
		wx.login({ 
			success:res=>{
				console.log(res);
				login({
					code:res.code
				}).then(res=>{
					console.log(res)
				}).catch(()=>{

				})
			}
		})
	}
})
