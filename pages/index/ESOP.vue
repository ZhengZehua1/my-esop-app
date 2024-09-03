<template>
	<view>
		<uni-notice-bar
			v-show="onShowCData"
			class="announcement" 
			scrollable 
			background-color="rgba(0,0,0,0)"
			color="#f00"
			text="欢迎领导莅临检查!"
		>
		</uni-notice-bar>
		<view class="top-touxiang" v-show="onShowAData" :style="{width:zuobian}">
			<image src="../../static/q.jpg" @click="showDrawer"></image>
			<view class="topItem">
				<text>站点：{{zhangdian}}</text>
			</view>
			<!-- <view class="topItem">
				<text>工单：12345682</text>
			</view> -->
			<view class="topItem">
				<text>产品料号：P5698</text>
			</view>
			<view class="topItem">
				<text>产品编码：A1234789/{{indexValue+1}}</text>
			</view>
			
			<view class="topItem" style="position: absolute;right: 20px;top: 50%; transform: translateY(-50%);">
				扫描条码：<input ref="inputBA"  v-model="tiaoma" readonly placeholder="扫描条码" style="background-color: #fff;border-radius: 6px;color: #000;"  />
			</view>
			<!-- <view class="topItem">
				<text>批次号：ABC528</text>
			</view>
			<view class="topItem">
				<text>良品：15</text>
			</view>
			<view class="topItem">
				<text>不良品：1</text>
			</view> -->
		</view>
		<uni-drawer ref="showRight" mode="left" :mask-click="true" :width="400"> 
			<button @click="closeDrawer" type="primary">关闭</button>
			<image src="../../static/q.jpg" class="imgT"></image>
			<view class="userCalss">
				<!-- <view>姓名：{{userInfo.username}}</view>
				<view>工号：{{userInfo.jobID}}</view>
				<view>部门：{{userInfo.department}}</view>
				<view>职位：{{userInfo.position}}</view>
				<view>入职时间：{{userInfo.time}}</view> -->
				<view>姓名：张三</view>
				<view>工号：001</view>
				<view>部门：行政部</view>
				<view>职位：行政经理</view>
				<view>入职时间：2024/08/12</view>
			</view>
			
			<hr />
			
			<view class="userCalss">
				<view>站点：{{zhangdian}}</view>
				<view>产品编码：A1234789/{{indexValue+1}}</view>
				
			</view>
		</uni-drawer>
		<view class="centent">
			<movable-area ref="refAAA"  v-show="onShowBData" style="width:100%;height: 70vh; position: absolute; left:-360px; top: 0; z-index: 2;" >
				<movable-view :x="x" :y="y" direction="all" @change="onChange">	
					<video loop muted  autoplay src="../../static/videoA.mp4" class="videoA" :enable-progress-gesture="false"></video>
				</movable-view>
			</movable-area>
			
			<view class="yulan" v-show="onShowDData" :style="{top:onShowAData? '45px' : 0}">
				<view class="yulanItem"  v-for="(item ,index) in info" :key="index" @click="onClickA(index)">
					<image style="height: 100px;width: 100%;" mode="scaleToFill" :src="item.url"></image>
					<text style="display: block;color: #fff;">{{item.content}}</text>
				</view>
			</view>
			<swiper class="swiper" circular  :autoplay="false" :interval="5000" :current="indexValue"
				:duration="duration"  @change="change" ref="swiperRefA">
				
				<swiper-item v-for="(item ,index) in info" :key="index" v-show="!onShowDData">
					<view class="swiper-item" :style="{height:heightItem,marginTop:onShowAData? '45px' : 0}">
						<image class="imageItemS" :style="{height:heightItem}" :mode="aspectFit" :src="item.url"></image>
						
					</view>
				</swiper-item>
			</swiper>
			
		</view>
		
		<view class="btn-bottom">
			<view class="yc_a" @click="onShowA">
				<i class="iconfont" :class="iconCaozuo"></i>
			</view>
			<view class="yc_b" @click="onShowE">
				<i class="iconfont" :class="iconSuofang"></i>
			</view>
			<view class="yc_b" @click="onShowB">
				<i class="iconfont" :class="iconShipin"></i>
			</view>
			<view class="yc_b" @click="onShowC">
				<i class="iconfont" :class="iconGonggao"></i>
			</view>
			<view class="yc_b" @click="onShowD">
				<i class="iconfont" :class="iconTupin"></i>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters} from 'vuex' 
	// #ifdef APP-PLUS
	// var scanCodeModule = uni.requireNativePlugin("zq-scancode-module")
	
	// #endif
	export default {
		data() {
			return {
				inputSS:true,
				duration:500,
				tiaoma:'',
				tiaoma2:'',
				resultValue:'',
				// zuobian:"100%",
				iconCaozuo:"icon-caozuo",
				iconShipin:'icon-shipin1',
				iconGonggao:'icon-gonggao1',
				iconTupin:'icon-tupian',
				iconSuofang:'icon-suofang',
				current:0,
				indexValue:0,
				heightItem:'100vh',
				myHegiht:null,
				x: 9999,
				y: 9999,
				onShowAData:true,
				onShowBData:true,
				onShowCData:true,
				onShowDData:false,
				aspectFit:'aspectFit',
				info: [
					{content: '冲压',url:'../../static/image/c.png'}, 
					{content: '切割',url:'../../static/image/k.png'}, 
					{content: '安装大功率',url:'../../static/image/a.png'}, 
					{content: '打卡点',url:'../../static/image/d.png'}, 
					{content: '折叠包装盒',url:'../../static/image/o.png'}, 
					{content: '插件1',url:'../../static/image/b.jpg'}, 
					{content: '点亮全检',url:'../../static/image/f.png'}, 
					{content: '点亮测试',url:'../../static/image/e.png'}, 
					{content: '焊接大功率',url:'../../static/image/g.png'}, 
					{content: '焊接电子红线',url:'../../static/image/i.png'}, 
					{content: '焊接电子黑线',url:'../../static/image/h.png'}, 
					{content: '组装透镜',url:'../../static/image/q.png'}, 
					{content: '老化',url:'../../static/image/j.png'}, 
					{content: '装箱封箱',url:'../../static/image/p.jpg'}, 
					{content: '装箱封箱',url:'../../static/image/p.png'}, 
					{content: '贴标签/盖章',url:'../../static/image/m.png'}, 
					{content: '锁上盖螺丝',url:'../../static/image/n.png'}, 
					{content: '锁大功率螺丝',url:'../../static/image/l.png'}, 
				],
			}
		},
		computed:{
			...mapState({
				userInfo:state => state.userInfo.userInfoValue,
			}),
			zhangdian(){
				return this.info[this.indexValue].content
			}
		},
		props:['zuobian'],
		methods: {
			// abc(e){
			// 	console.log(e,123);
			// 	this.tiaoma = ''
			// },
			// cba(e){
			// 	this.$nextTick(()=>{
			// 		this.duration = 1
			// 		this.indexValue = this.tiaoma.split("/")[1] && (this.tiaoma.split("/")[1] -1)
			// 		// #ifdef APP-PLUS
			// 			plus.nativeUI.toast("扫码内容：" + this.tiaoma) 	
			// 		// #endif
			// 		this.$nextTick(()=>{
			// 			this.duration = 500
			// 		})
			// 		// this.inputSS = true
			// 		  // console.dir(e.target);
			// 		  // e.target.focus()
			// 		  // this.$refs.inputBA._focus()
			// 		 // this.$refs.inputBA.$el.childNodes[0].childNodes[1].focus()
			// 		 // this.$refs.inputBA.$el.childNodes[0].childNodes[1].setSelectionRange(0, this.$refs.inputBA.$el.childNodes[0].childNodes[1].value.length);
			// 	})
			// },
			onShowA(){
				this.onShowAData = !this.onShowAData
				 uni.getSystemInfo({
					success: (res) => {
					  this.heightItem = this.onShowAData == true ? `${res.windowHeight-45}px` : '100vh'
					}
				  });
				this.iconCaozuo == 'icon-caozuopingtai' ? this.iconCaozuo = 'icon-caozuo' : this.iconCaozuo = 'icon-caozuopingtai'
			},
			onShowB(){
				this.onShowBData = !this.onShowBData
				this.iconShipin == 'icon-shipin1' ? this.iconShipin = 'icon-shipin' : this.iconShipin = 'icon-shipin1'
			},
			onShowC(){
				this.onShowCData = !this.onShowCData
				this.iconGonggao == 'icon-gonggao' ? this.iconGonggao = 'icon-gonggao1' : this.iconGonggao = 'icon-gonggao'
			},
			onShowD(){
				this.onShowDData = !this.onShowDData
				this.iconTupin == 'icon-tupian' ? this.iconTupin = 'icon-tupian1' : this.iconTupin = 'icon-tupian'
			},
			onShowE(){
				this.iconSuofang == 'icon-suofang' ? this.iconSuofang = 'icon-lujing-10' : this.iconSuofang = 'icon-suofang'
				this.aspectFit == 'aspectFit' ? this.aspectFit = 'scaleToFill' : this.aspectFit = 'aspectFit'
			},
			showDrawer() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			onChange: function(e) {
				this.x = e.detail.x
				this.y = e.detail.y
			},
			onClickA(e){
				this.duration = 1
				this.indexValue = e
				this.onShowDData = !this.onShowDData
				this.$nextTick(()=>{
					this.duration = 500
				})
			},
			change(e) {
				this.indexValue = e.detail.current;
				this.current = e.detail.current;
			},
			handleScanResult(result) {
			  this.tiaoma = result;
			  this.info.forEach((i,index)=>{
				  if(i.content == result){
					  this.duration = 1
					  this.indexValue = index
					  // this.onShowDData = !this.onShowDData
					  this.$nextTick(()=>{
					  	this.duration = 500
					  })
				  }
			  })
			  // 扫码完成后的业务逻辑处理
			}
		},
		watch:{
			tiaoma:{
				handler(newValue){
					// this.duration = 1
					this.indexValue = this.tiaoma.split("/")[1] && (this.tiaoma.split("/")[1] -1)
					
						this.resultValue = ""
						// this.duration = 500
					
				}
			}
		},
		async mounted() {
			
			// uni.getSystemInfo({
			// 	success: (res) => {
			// 	  this.heightItem = this.onShowAData == true ? `${res.windowHeight-45}px` : '100vh'
			// 	}
			//  });
			//  this.$nextTick(()=>{
			// 	  // console.dir( this.$refs.inputBA.$el.childNodes[0]);
			// 	 this.$refs.inputBA.$el.childNodes[0].childNodes[1].focus()
			//  })
			// let data = await JSON.parse(uni.getStorageSync('userInfo'))
			// this.userInfo = data
			// #ifdef APP-PLUS
				// uni.onKeyboardInput((res) => {
				//       if (res.replace) { // 如果是替换事件
				//         // 处理扫码枪输入，通常是连续输入文字
				//         this.handleScanResult(res.value);
				//       } else if (res.confirm) { // 如果是确认事件
				//         // 处理扫码结果，通常是扫码完成
				//         this.handleScanResult(res.value);
				//         // 可以在这里执行扫码后的退出键盘操作
				//         uni.hideKeyboard();
				//       }
				//     });
				
				 plus.key.addEventListener('keydown',(event)=>{
					if(event.keyCode == 29){
						this.resultValue += 'A'
					}
					if(event.keyCode == 8){
						this.resultValue += '1'
					}
					if(event.keyCode == 9){
						this.resultValue += '2'
					}
					if(event.keyCode == 10){
						this.resultValue += '3'
					}
					if(event.keyCode == 11){
						this.resultValue += '4'
					}
					if(event.keyCode == 12){
						this.resultValue += '5'
					}
					if(event.keyCode == 13){
						this.resultValue += '6'
					}
					if(event.keyCode == 14){
						this.resultValue += '7'
					}
					if(event.keyCode == 15){
						this.resultValue += '8'
					}
					if(event.keyCode == 16){
						this.resultValue += '9'
					}
					if(event.keyCode == 76){
						this.resultValue += '/'
					}
					if(event.keyCode == 66){
						this.tiaoma = this.resultValue
						plus.nativeUI.toast(this.tiaoma);
					}
					// plus.nativeUI.toast(event.key + "resultValue:" + event.keyCode + '按下了:'+ JSON.stringify(event));
				});
				// scanCodeModule.startScan({
				// 	'name': '扫码',
				// 	'showTip': true,
				// 	'showLoading': true,
				// 	'tip': "自定义扫码",
				// 	'tipSize': 20,
				// 	'tipColor': "#FF0000"
				// },
				// (ret) => {
				// 	plus.nativeUI.toast("扫码内容：" + ret) 	
				// });
				// plus.globalEvent.addEventListener('TestEvent', function(e) {
				// 	plus.nativeUI.toast("TestEvent收到：" + e.msg)
				// });
			// #endif
		},
	}
</script>

<style lang="scss">
	body{overflow: hidden !important;}
	
	.swiper {width: 100%;height: 100vh;}
	
	.swiper-item {display: block;width: 100%;}
	
	.top-touxiang{
		// width:100%;
		height:45px;
		position: fixed;
		top: 0;
		z-index: 99;
		display: flex;
		color: #fff;
		background-color: #168cdc;
	}
	
	.top-touxiang image{width: 50px;height: 60px;box-shadow: 1px 1px 3px #000;margin-left: 20px;}
	
	.top-touxiang view.topItem{margin-left: 20px;display: flex;align-items: center;font-size: 16px;}
	
	.top-touxiang view.topItem text{border-left: 2px #000 solid;padding-left: 15px;}
	
	.icon-abc{position: absolute;right: 20px;}
	
	.userCalss{display: flex;flex-direction: column;align-items: left;}
	
	.userCalss>view{margin: 15px 20px;}
	
	.imgT{
		width: 100px;
		height: 120px;
		position: absolute;
		right: 20px;
		top: 61px;
	}
	
	.yulan{
		height: 100%;
		width: 100%;
		padding: 0 10px;
		position: absolute;
		z-index: 2;
		padding: 10px 90px 10px 30px;
		background-color: rgba(90, 90,90, 0.6);
		text-align: center;
	}
	
	.yulanItem{width: 200px;height:132px;margin: 15px 15px;float: left;}
	
	.btn-bottom{position: fixed;left: 20px;bottom: 20px;z-index: 999;}
	
	.yc_a,.yc_b{
		width: 40px;
		text-align: center;
		height: 40px;
		line-height: 40px;
		float: left;
		font-size: 14px;
		color: #fff;
		margin-left: 15px;
		border-radius: 20px;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.announcement{
		height: 80px;
		position: absolute;
		top:80px;
		z-index: 999;
		font-weight: 700;
		// font-size: 44px;
		pointer-events: none;
	}
	
	.imageItemS{width: 100%;}
	
	::v-deep .uni-noticebar__content-wrapper.uni-noticebar__content-wrapper--scrollable{height:80px !important;}
	
	::v-deep .uni-noticebar__content-text.uni-noticebar__content-text--scrollable{
		// width: 600px;
		height:80px;
		// white-space: normal;
		// word-break: break-all;
		// overflow-wrap: break-word;
		// word-break: break-all;
		// -webkit-box-orient: vertical;
		//   -webkit-line-clamp: 3; /* 限制在3行内 */
		//   // overflow: hidden;
		//   text-overflow: ellipsis; /* 显示省略号 */
		//   line-height: 30px;
		  // display: -webkit-box;
	}
	
	::v-deep .uni-noticebar__content-text.uni-noticebar__content-text--scrollable span{
		// width: 600px;
		height: 80px;
		// display: -webkit-box;
		// white-space: normal;
		// word-break: break-all;
		// overflow-wrap: break-word;
		// word-break: break-all;
		// -webkit-box-orient: vertical;
		//   -webkit-line-clamp: 3; /* 限制在3行内 */
		//   // overflow: hidden;
		//   text-overflow: ellipsis; /* 显示省略号 */
		  font-size: 42px;
		  line-height: 80px;
	}

</style>