<template>
	<viwe class="foods_list">
		<view class="foods_item" @click="foodsDetail(item._id.$oid)" v-for="(item,index) in foods" :key="index">
			<image mode="widthFix" class="foods_image" :src="item.src" />
			<view class="foods_name">{{item.title}}</view>
		</view>
	</viwe>
</template>

<script>
	export default {
		name:"foods-list",
		data() {
			return {
				
			};
		},
		props: ["foods"],
		methods: {
			foodsDetail(id){
				let timer=new Date()
				let isOK=true;
				let history=uni.getStorageSync("history") || []
				history.forEach(el=>{
					if(el.id==id){
						isOK=false
					}
				})
				if(isOK){
					history.unshift({
						id,
						time:`${timer.getFullYear()}-${timer.getMonth()+1}-${timer.getDate()}:${timer.getHours()}`
						})
					uni.setStorageSync("history",history)
				}
				uni.navigateTo({
					url: "/pages/detail/detail?id="+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.foods_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 10rpx;
		.foods_item{
			width: 46vw;
			padding: 10rpx;
			box-sizing: border-box;
			border: 2rpx solid #e1e1e1;
			border-radius: 10rpx;
			margin: 10rpx 6rpx;
			.foods_image{
				width: 100%;
			}
			.foods_name{
				display: -webkit-box;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				font-size: 3vw;
				padding: 10rpx 10rpx 8rpx 10rpx;
			}
		}
	}
</style>
