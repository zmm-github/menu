<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			uni.request({
				url: "./static/json/menus.json",
				success(res) {
					uni.setStorageSync("menus",JSON.stringify(res.data));
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/styles/iconfont.css");
</style>
