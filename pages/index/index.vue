<template>
	<view>
		<view class="zuobian" :style="{width:zuobian}">
			<!-- ESOP -->
			<ESOP v-if="modeValue==1" :zuobian="zuobian"></ESOP>
			<!-- 检测 -->
			<testing v-if="modeValue==2"></testing>
			<!-- 数据大屏 -->
			<dapingWeb v-if="modeValue==3"></dapingWeb>
		</view>
		<popupVue></popupVue>
		<!-- 右边 -->
		<!-- #ifndef APP-PLUS -->
		<!-- <popupVue></popupVue> mask-background-color="rgba(0,0,0,0)"-->
		<!-- #endif -->
		<!-- <uni-popup ref="popup" type="right" :is-mask-click="false">	
			<popupVue></popupVue>
		</uni-popup> -->
		<!-- <dialog id="myModal" open ref="popup" style="width: 0; height: 0;padding: 0; border: none;">
		      <popupVue></popupVue>
		</dialog> -->
	</view>
	
</template>

<script>
	import ESOP from "./ESOP.vue"
	import testing from "./testing.vue"
	import dapingWeb from "./dapingWeb.vue"
	import popupVue from "./popup.nvue"
	import {mapState,mapGetters} from 'vuex' 
	export default {
		computed:{
			...mapState({
				zuobian:state => state.home.zuobian,
				modeValue:state => state.home.modeValue,
			})
		
		},
		components:{
			ESOP,
			testing,
			dapingWeb,
			popupVue
		},
		mounted() {
			// // #ifdef APP-PLUS
			//  const subNVue = uni.getSubNVueById('popup');
			//  subNVue.setStyle({
			//  	"position": "absolute", //除 popup 外，其他值域参考 5+ webview position 文档
			//  	"width": "50%",
			//  	"height": "50%",
			//  	"left":"20px",
			//  	"top":"100px"
			//  })
			//  subNVue.show()
			// // #endif
			// this.$refs.popup.showModal()
			// this.$refs.popup.oncancel = function(event) {
			//   return
			// };
		},
	}
</script>

<style lang="scss">
	body{overflow: hidden !important;}

</style>
