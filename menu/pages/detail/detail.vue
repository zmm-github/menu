<template>
	<view class="detail">
		<!-- 菜品视频 开始 -->
		<block v-if="foodList.video">
			<video class="foods_video" :direction=direction :danmu-list="danmu" page-gesture :src="foodList.video"></video>
		</block>
		<block v-if="!foodList.video">
			<image class="foods_video" mode="widthFix" :src="foodList.src" />
		</block>
		<!-- 菜品视频 结束 -->
		<!-- 菜品详情介绍 开始 -->
		<view class="detail_introduce">
			<view class="foods_title">{{foodList.title}}</view>
			<view class="foods_des">{{foodList.text}}
			<br/>
			适宜人群：{{foodList.crowd || "所有人群"}}
			</view>
		</view>
		<!-- 菜品详情介绍 结束 -->
		<!-- 菜品用料 开始 -->
		<view class="foods_material">
		
				<view class="material" v-if="nutrition">营养成分</view>
				<view class="material_content" v-for="(item,index) in nutrition" :key="item._id">
					
					<view class="material_name">{{item.name}}</view>
					<view class="material_amount">{{item.count}}</view>
				</view>
				<br v-if="nutrition"/>
		
			
			<view class="material">用料</view>
			<view class="material_content" v-for="(item,index) in materialList" :key="index">
				<view class="material_name">{{item.name}}</view>
				<view class="material_amount">{{item.count}}</view>
			</view>
			
		</view>
		<!-- 菜品用料 结束 -->
		<!-- 步骤 开始 -->
		<view class="foods_step">
			<view class="step">步骤</view>
			<view class="step_item" v-for="(item,index) in foodList.step" :key="index">
				<image @click="previewImg(item.img)" mode="widthFix" class="step_img" :src="item.img" />
				<view class="step_name">{{item.step}}</view>
			</view>
		</view>
		<!-- 步骤 结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				danmu: ["你可真帅啊","啊！太帅了"],
				foodsId: 0,
				//全屏时视频的方向
				direction: -90,
				foodList: [],
				materialList: [],
				nutrition:[]
			}
		},
		methods: {
			previewImg(current_img){
							const urls = this.foodList.step.map(function(item){
								return item.img;
							});
							uni.previewImage({
								current: current_img,
								urls,
								loop: true
							})
						}
			
		},
		onLoad(e) {
			let that = this;
			this.$food.forEach(function(item){
				if(item._id.$oid === e.id){
					that.foodList = item;
					that.materialList = [...item.foodList,...item.seasoning];
					that.nutrition=item.nutrition
				}
			})
		}
	}
</script>

<style lang="scss">
	.detail{
		width: 100%;
		background-color: $global-bgColor;
		.foods_video{
			width: 100%;
		}
		.detail_introduce{
			padding: 30rpx;
			box-sizing: border-box;
			width: 100%;
			background-color: #FFFFFF;
			.foods_title{
				font-size: 40rpx;
				font-weight: 600;
			}
			.foods_des{
				letter-spacing: 4rpx;
				font-size: 32rpx;
				font-weight: 200;
				margin-top: 40rpx;
			}
		}
		.foods_material{
			width: 100%;
			padding: 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			margin: 25rpx 0;
			.material{
				color: $global-color;
				font-size: 36rpx;
				letter-spacing: 10rpx;
			}
			.material_content{
				display: flex;
				width: 100%;
				padding: 40rpx 0;
				border-bottom: 2rpx solid $global-bgColor;
				font-size: 32rpx;
				.material_name{
					flex: 1;
				}
				.material_amount{
					flex: 1;
				}
			}
		}
		.foods_step{
				font-size: 60rpx !important;
			width: 100%;
			background-color: #FFFFFF;
			padding: 40rpx;
			box-sizing: border-box;
			.step{
				color: $global-color;
				letter-spacing: 10rpx;
				margin-bottom: 20rpx;
			}
			.step_item{
				width: 100%;
				.step_img{
					width: 100%;
					border-radius: 16rpx;
				}
				.step_name{
					font-size: 40rpx !important;
					margin: 20rpx 0;
					padding: 0 10rpx;
				}
			}
		}
	}
	
</style>
