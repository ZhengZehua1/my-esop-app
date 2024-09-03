<template>
	<view class="wrapper">
		<view class="fromWrap">
			<uni-forms ref="formData" :modelValue="formData" :rules="rules">
				<uni-forms-item :style="styles" name="name">
					<uni-easyinput prefixIcon="auth" type="text" v-model="formData.name" placeholder="请输入工号" :styles="stylesA" />
				</uni-forms-item>
				<uni-forms-item :style="styles" name="password">
					<uni-easyinput prefixIcon="locked" type="password" v-model="formData.password" placeholder="请输入密码" :styles="stylesA" />
				</uni-forms-item>
				<uni-forms-item >
					<uni-data-checkbox multiple v-model="formData.isShow" :localdata="[{value: 1,text: '记住密码'}]" class="textB"></uni-data-checkbox>
					<text class="textA" @click="onShowDiolag">服务器设置</text>
				</uni-forms-item>
			</uni-forms>
			<button @click="submitForm">登录</button>
		</view>
		
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content">
				<view class="top_view">
					服务器连接设置
				</view>
				<view class="centent_view">
					
					<uni-forms ref="formDataB" :modelValue="formDataB" :rules="rulesB">
						<uni-forms-item label="服务器IP地址:" label-width="220" :style="stylesB" name="IpAddress">
							<!-- <uni-easyinput type="text" v-model="formDataB.Ipaddress" placeholder="请输入IP地址" /> -->
							<input type="text"  v-model="formDataB.IpAddress" style="border:1px #ccc solid;background-color: #fff;margin-top: 7px;" />
						</uni-forms-item>
						<uni-forms-item label="服务器端口号:" label-width="220" :style="stylesB" name="port">
							<!-- <uni-easyinput type="text" v-model="formData.password" placeholder="请输入端口号"/> -->
							<input type="text" v-model="formDataB.port" style="border:1px #ccc solid;background-color: #fff;margin-top: 7px;" />
						</uni-forms-item>
					</uni-forms>
					<text class="btn_dialog btn_dialogA" @click="onConfirm">确认</text>
					<text class="btn_dialog btn_dialogB" @click="onCancel">取消</text>
				</view>
				<view class="top_view">
					E-SOP电子作业指导书系统
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		
		data() {
			return {
				styles:{
					"border-bottom":"1px #1a73e8 solid !important",
					"margin": "15px !important",
				},
				stylesA:{
					"borderColor":"transparent",
					'color':'#fff'
				},
				stylesB:{
					"margin":"20px"
				},
				formData:{
					name:'',
					password:'',
					isShow:[1],
				},
				formDataB:{
					IpAddress:"",
					port:"",
				},
				// 表单校验
				rules:{
					name:{
						rules:[{required: true,errorMessage: '请输入工号'}]
					},
					password:{
						rules:[{required: true,errorMessage: '请输入密码'}]
					}
				},
				rulesB:{
					IpAddress:{
						rules:[
							{required: true,errorMessage: '请输入服务器IP'},
							{
								pattern:/^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/,
								errorMessage:"请输入正确的服务器地址"
							}
						]
					},
					port:{
						rules:[{required: true,errorMessage: '请输入端口号'}]
					}
				}
			}
		},
		methods: {
			...mapMutations(['setUserInfo']),
			submitForm(){
				this.$refs.formData.validate()
				.then(()=>{
					let data = {
						username:'李四',
						jobID:"20240806A",
						department:'生产部',
						position:'操机员',
						time:"2024/08/11 10:32:00"
					}
					console.log(this.formData)
					uni.setStorageSync('userInfo',JSON.stringify(data))
					this.setUserInfo(data)
					uni.navigateTo({
						url:'/pages/index/index',
					})
				})
				
			},
			onShowDiolag(){
				let localData = JSON.parse(uni.getStorageSync('formDataB'))
				localData && (this.formDataB = localData)
				this.$refs.popup.open()
			},
			async onConfirm(){
				this.$refs.formDataB.validate()
				.then(()=>{
					uni.setStorageSync('formDataB',JSON.stringify(this.formDataB))
					this.$refs.popup.close()
				})
				
			},
			onCancel(){
				this.$refs.popup.close()
			}
		}
	}
</script>

<style scoped>
	.wrapper{
		width: 100vw;
		height: 100vh;
		background: linear-gradient(320deg,#e5225c 50%,#65c1b4 50%);
	}
	.fromWrap{
		width: 26%;
		padding:40px;
		background-color: rgba(0, 0, 0, 0.6);
		position: absolute;
		border-radius: 25px;
		right: 90px;
		color: #fff;
		bottom: 60px;
	}
	.textA{
		position: absolute;
		right: 0;
	}
	.textB{
		position: absolute;
		left: 0;
	}
		
	.top_view{
		background-color: #1085e5;
		color: #fff;
		padding: 10px 0 10px 20px;
	}
	.centent_view{
		padding: 50px 100px;
		background-color: #ecf6ff;
	}
	.btn_dialog{
		display: inline-block;
		padding: 5px 40px;
		color: #fff;
	}
		
	.btn_dialogA{
		background-color: #015eac;
	}
	.btn_dialogB{
		background-color: #ccc;
		position: absolute;
		right: 100px;
	}
</style>
