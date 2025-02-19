// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './userInfo.js';
import home from './home.js';
Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	modules:{
		userInfo,
		home
	}
})
export default store