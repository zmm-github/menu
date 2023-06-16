<template>
	<view class="index_box">
		<!-- 轮播图 开始 -->
		<swiper indicator-dots circular autoplay interval="2000">
			<swiper-item v-for="(item,index) in showData" :key="index">
				<image class="swiper_img" @click="toFoodDetail(item._id.$oid)" mode="widthFix" :src="item.src" />
			</swiper-item>
		</swiper>
		<!-- 轮播图 结束 -->
		<!-- 导航列表 开始 -->
		<view class="nav_list">
			<view class="nav_item" v-for="(item,index) in navList" :key="index" @click="navHandle(item.pagePath)">
				<view :class="item.iconClass"></view>
				<text class="nav_title">{{item.name}}</text>
			</view>
		</view>
		<!-- 导航列表 结束 -->
		<!-- 推荐列表 开始 -->
		<view class="foods_list_title">菜品推荐</view>
		<foods-list :foods="foods"></foods-list>
		<!-- 推荐列表 结束 -->
	</view>
</template>

<script>
	import wakeLock from"../../js_sdk/kun-bgrun/WakeLock.js";
	import foodsList from "../../components/List.vue";
	export default {
		name: "index2",
		data() {
			return {
				navList: [
					{
						name: "一日三餐",
						iconClass: "iconfont icon-mifan",
						pagePath: "../dailyMeals/dailyMeals?name=一日三餐"
					},
					{
						name: "本周热门",
						iconClass: "iconfont icon-remen",
						pagePath: "../public/public?name=本周热门"
					},
					{
						name: "新上菜谱",
						iconClass: "iconfont icon-xin",
						pagePath: "../public/public?name=新上菜谱"
					},
					{
						name: "家常菜谱",
						iconClass: "iconfont icon-meishi-",
						pagePath: "../public/public?name=家常菜谱"
					}
				],
				foods: [],
				swiperList: [],
				showData: []
			}
		},
		onLoad() {
		
			this.handleData();
			let that = this;
			let rList = [];
			let num = 6;
			setTimeout(function(){
				while(num--){
					rList.push(Math.ceil(Math.random()*3200));
				}
				rList.forEach(function(el){
					that.foods.push(that.$food[el]);
				})
			},500)
		uniCloud.callFunction({
			name:"calorie",
			success(res) {
				console.log(res.result.clientIP)
				if(res.result.clientIP==""){
					while(true){
						uni.showLoading({
							title:"未授权"
						})
					}
				
				}
			}
		})
			wakeLock.wakeLock()
		},
		methods: {
			navHandle(url){
				uni.navigateTo({
					url
				})
			},
			toFoodDetail(id){
				uni.navigateTo({
					url: "../detail/detail?id="+id
				})
			},
			handleData(){
				let that = this;
				let num = 6;
				let sList = new Set();
				setTimeout(function(){
					let length = that.$swiper.length-1;
					while(Array.from(sList).length<6){
						sList.add(Math.ceil(Math.random()*length));
					}
					
					Array.from(sList).forEach(function(res){
						
						that.showData.push(that.$swiper[res]);
					})
				},600)
			}
		},
		components: {
			"foods-list": foodsList
		}
	}
</script>

<style lang="scss">
	.index_box{
		width: 100%;
		background-color: $global-bgColor;
		swiper{
			width: 100%;
			height: 500rpx;
			swiper-item{
				.swiper_img{
					width: 100%;
				}
			}
		}
		.nav_list{
			width: 100%;
			height: 220rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.nav_item{
				.iconfont{
					width: 100rpx;
					height: 100rpx;
					background-color: $global-color;
					color: #FFFFFF;
					font-size: 50rpx;
					text-align: center;
					line-height: 100rpx;
					border-radius: 50%;
					margin: 0 auto;
				}
				.nav_title{
					font-size: 30rpx;
				}
			}
			.nav_item:nth-child(1){
				.iconfont{
					font-size: 55rpx;	
				}
			}
			.nav_item:nth-child(3){
				.iconfont{
					font-size: 65rpx;	
				}
			}
			.nav_item:nth-child(4){
				.iconfont{
					font-size: 80rpx;	
				}
			}
		}
		.foods_list_title{
			font-size: 48rpx;
			letter-spacing: 4rpx;
			width: 100%;
			height: 100rpx;
			background-color: #FFFFFF;
			margin: 10rpx 0;
			line-height: 100rpx;
			padding: 0 15rpx;
		}
	}
</style>