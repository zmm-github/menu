<template>
	<view class="cates">
		<!-- 左侧菜单 开始 -->
		<scroll-view class="left_menu" scroll-y>
			<view @click="handleCateList(index,item.name)" :class="currentIndex === index?'active':''" v-for="(item,index) in cateList" :key="index">{{item.name}}</view>
		</scroll-view>
		<!-- 左侧菜单 结束 -->
		<!-- 右侧内容 开始 -->
		<scroll-view @scrolltolower="reachButton" :scroll-top="location" class="right_content" scroll-y>
			<foods-list :foods="rightContent"></foods-list>
		</scroll-view>
		<!-- 右侧内容 结束 -->
	</view>
</template>

<script>
	import foodsList from "../../components/foodsList.vue";
	export default {
		name: "category",
		data() {
			return {
				location: 0,
				cateList: [],
				rightContent: [],
				currentIndex: 0,
				foodAll: [],
				indexOne: 0,
				indexTwo: 16
			}
		},
		onLoad() {
			this.cateList = this.$menu
			let that = this;
			let foodsList = [];
			this.$food.forEach(function(item){
				if(item.type === "川菜"){
					foodsList.push(item);
					that.rightContent = foodsList.slice(0,16);
				}
				that.foodAll = foodsList;
			})
		},
		methods: {
			handleCateList(index,foodName){
				this.indexOne=0;
				this.indexTwo=16;
				this.location = Math.random();
				this.currentIndex = index;
				let that = this;
				let foodsList = [];
				this.$food.forEach(function(item){
					if(item.type === foodName){
						foodsList.push(item);
						that.rightContent = foodsList.slice(that.indexOne,that.indexTwo);
					}
					that.foodAll = foodsList;
				})
			},
			reachButton(){
				let that = this;
				uni.showLoading({
					title: "加载中..."
				});
				setTimeout(function(){
					that.indexOne+=16;
					that.indexTwo+=16;
					that.rightContent = [...that.rightContent,...that.foodAll.slice(that.indexOne,that.indexTwo)];
					uni.hideLoading();
				},400)
			}
		},
		components: {
			"foods-list": foodsList
		}
	}
</script>

<style lang="scss">
	*{
		margin: 0;
		padding: 0;
	}
	.cates{
		width: 100%;
		height:100vh;
		overflow: hidden;
		display: flex;
		.left_menu{
			width: 26vw;
			view{
				background-color: #F1F1F1;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				font-size: 3vw;
				border-bottom: 2rpx solid $global-bgColor;
				color: #666666;
			}
			.active{
				background-color: #FFFFFF;
				border-left: 5rpx solid $global-color;
			}	
		}
		.right_content{
			.foods_group{
				.foods_title{
					width: 100%;
					height: 90rpx;
					line-height: 90rpx;
					text-align: center;
					.delimiter{
						color: #E1E1E1;
					}
					.title{
						font-size: 34rpx;
						padding: 0 10rpx;
					}
				}
			}
		}
	}
</style>
