<template>
	<view class="wrapper">
		<!-- 信息展示 -->
		<view class="top_view">
			产品过站
		</view>
		
		<view class="contentA" :style="{height:contentHeight}">
			<uni-section title="当前站点信息" type="line">
				<uni-group mode="card">
					<view class="CardItem">
						<text>线别：123456</text> 
						<text>区段：123456</text> 
					</view>
					<view class="CardItem"> 
						<text>制程：123456</text> 
						<text>站点：放板/插件1</text> 
					</view>
					<view class="CardItem btn">
						<button @click="onModify">修改信息</button>
					</view>
				</uni-group>
				
				<uni-group title="信息扫描" margin-top="10">
					<view class="contentB">
						<text>条码：<input class="inputCode" type="text" v-model="code" /> <button class="btnCode">确定</button></text>
					</view>
				</uni-group>
				
				<uni-group title="记录展示" margin-top="10">
					<uni-table border stripe emptyText="暂无更多数据" >
						<!-- 表头行 -->
						<uni-tr>
							<uni-th align="center">日期</uni-th>
							<uni-th align="center">姓名</uni-th>
							<uni-th align="left">地址</uni-th>
						</uni-tr>
						<!-- 表格数据行 -->
						<uni-tr>
							<uni-td>2020-10-20</uni-td>
							<uni-td>Jeson</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td>2020-10-21</uni-td>
							<uni-td>HanMeiMei</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td>2020-10-22</uni-td>
							<uni-td>LiLei</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td>2020-10-23</uni-td>
							<uni-td>Danner</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr><uni-tr>
							<uni-td>2020-10-23</uni-td>
							<uni-td>Danner</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr><uni-tr>
							<uni-td>2020-10-23</uni-td>
							<uni-td>Danner</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr><uni-tr>
							<uni-td>2020-10-23</uni-td>
							<uni-td>Danner</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr><uni-tr>
							<uni-td>2020-10-23</uni-td>
							<uni-td>Danner</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr>
					
					</uni-table>
				</uni-group>
			</uni-section>
			
		</view>
		
		<!-- 输入框弹窗 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog title="修改信息" before-close @close="onClose" @confirm="onConfirm" style="width: 400px;">
				<uni-forms ref="form" label-width="50px">
					<uni-forms-item label="线别:" >
						<!-- <uni-combox placeholder="请选择所在城市" v-model="formData.xian"></uni-combox> -->
						<uni-easyinput type="text" :clearable="false" v-model="formData.xian" placeholder="请输入线别" style="border:1px #ccc solid;width:220px;" />
						<!-- <input type="text" v-model="formData.xian" placeholder="请输入线别"  style="border:1px #ccc solid;background-color: #fff;margin-top: 7px;" /> -->
					</uni-forms-item>
					<uni-forms-item label="区段:" >
						<uni-easyinput type="text" :clearable="false" v-model="formData.xian" placeholder="请输入区段" style="border:1px #ccc solid;width:220px;" />
					</uni-forms-item>
					<uni-forms-item label="制程:" >
						<uni-easyinput type="text" :clearable="false" v-model="formData.xian" placeholder="请输入制程" style="border:1px #ccc solid;width:220px;" />
					</uni-forms-item>
					<uni-forms-item label="站点:" >
						<uni-easyinput type="text" :clearable="false" v-model="formData.xian" placeholder="请输入站点" style="border:1px #ccc solid;width:220px;" />
					</uni-forms-item>
				</uni-forms>
			</uni-popup-dialog> 
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				formData:{
					xian:""
				},
				code:"",
				contentHeight:0,
			}
		},
		methods:{
			onModify(){
				console.log('修改信息');
				this.$refs.inputDialog.open()
			},
			onClose(){
				this.$refs.inputDialog.close()
			},
			onConfirm(){
				console.log("确定");
			}
		},
			
		mounted(){
			uni.getSystemInfo({
				success: (res) => {
				  this.contentHeight = `${res.windowHeight-55}px`
				}
			 });
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .uni-section-header__decoration.line{
		height: 20px !important;
	}
	::v-deep .uni-section__content-title.distraction{
		font-size: 22px !important;
	}
	.contentA{
		overflow: auto;
	}
	.top_view{
		font-size: 26px;
		color: #fff;
		font-weight: 700;
		background-color: #168cdc;
		text-align: center;
		padding: 10px 0;
	}
	.CardItem{
		text{
			font-size: 18px;
			margin-right: 30px;
		}
	}
	.btn{
		button{
			width: 200px;
			margin: 20px 0 0 0px;
			background: #168cdc;
			color: #fff;
		}
	}
	.contentB{
		color: #000;
		font-size: 18px;
		font-weight: 700;
		.inputCode{
			display: inline-block;
			width: 260px;
			border: #168cdc 2px solid;
			vertical-align: middle;
		}
		.btnCode{
			display: inline-block;
			width: 120px;
			height: 28px;
			vertical-align: middle;
			margin: 0 0 0 15px;
			padding: 0;
			text-align: center;
			line-height: 28px;
		}
	}
</style>