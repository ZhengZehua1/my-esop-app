<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
				plus.navigator.hideSystemNavigation()
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	@import './font/iconfont.css';
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
		body{
			overflow: hidden !important;
		}	
	/* #endif */
	
</style>
