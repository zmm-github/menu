<template>
	<view class="search">
		<!-- 搜索框 开始 -->
		<view class="searchInput">
			<input type="text" placeholder="请输入菜名..." v-model="searchName" />
		</view>
		<!-- 搜索框 结束 -->
		<!-- 热门菜谱 开始 -->
		<view class="hot_foods">
			<!-- 热门菜谱标题 -->
			<view class="hot_title">
				热门菜谱
			</view>
			<!-- 热门菜谱列表 通过组件显示-->
			<scroll-view class="hot_list" @scrolltolower="handleToButton" @scrolltoupper="handleToTop" scroll-y="true" >
				<foods-list :foods="showFoods"></foods-list>
			</scroll-view>
		</view>
		<!-- 热门菜谱 结束 -->
	</view>
</template>

<script>
	import foodsList from '../../components/List.vue'
	export default {
		data() {
			return {
				foods: [],
				showFoods: [],
				indexOne: 0,
				indexTwo: 12,
				searchName:"",
				searchList: []
			}
		},
		onLoad() {
			let that = this;
			let num = 100;
			let rList = [];
			while(num--){
				rList.push(Math.ceil(Math.random()*3200));
			}
			rList.forEach(function(el){
				that.foods.push(that.$food[el]);
				that.showFoods = that.foods.slice(that.indexOne,that.indexTwo);
			})
		},
		watch:{
			searchName:function(){
				this.search(this.searchName);
			}
		},
		methods: {
			search(name){
				if(name.trim()=="") return
					let timer=new Date();
						let isOK=true;
					let searchHistory=uni.getStorageSync("searchHistory") || []
						searchHistory.forEach(el=>{
							if(el.name==name){
								isOK=false
							}
						})
				if(isOK){
					searchHistory.unshift({name,
						time:`${timer.getFullYear()}-${timer.getMonth()+1}-${timer.getDate()}:${timer.getHours()}`
						})
					uni.setStorageSync("searchHistory",searchHistory)
				}
				let foodList=[];
				if(name.trim()!=""){
					var reg=RegExp(name);
					this.$food.forEach(function(result){
						if(result.title.match(reg)){
							foodList.push(result);
						}
					})
					this.showFoods = foodList.slice(this.indexOne,this.indexTwo);
					this.searchList = foodList;
				}
			},
			handleToTop(){
				if(this.searchName.trim() === ""){
					//定义变量
					let that = this;
					let num = 100;
					let rList = [];
					//显示刷新图标
					uni.showLoading({
						title: "刷新..."
					});
					//恢复初始值
					that.indexOne=0;
					that.indexTwo=12;
					//清楚之前的数据
					that.foods=[];
					//下拉刷新时，调用方法重新刷新
					setTimeout(function(){
						//产生随机数
						while(num--){
							rList.push(Math.ceil(Math.random()*3200));
						}
						rList.forEach(function(el){
							that.foods.push(that.$food[el]);
						})
						that.showFoods = that.foods.slice(that.indexOne,that.indexTwo);
						//关闭刷新图标
						uni.hideLoading();
					},400);
				}
			},
			handleToButton(){
				let that = this;
				//显示刷新图标
				uni.showLoading({
					title: "加载中..."
				});
				//上拉触底时，调用方法加载剩余数据
				setTimeout(function(){
					that.indexOne+=12;
					that.indexTwo+=12;
					// if(that.indexOne < that.num){
						
					// }
					if(that.searchName.trim() === ""){
						that.showFoods = [...that.showFoods,...that.foods.slice(that.indexOne,that.indexTwo)];
					} else{
						that.showFoods = [...that.showFoods,...that.searchList.slice(that.indexOne,that.indexTwo)];
					}
					uni.hideLoading();
				},400);
			}
		},
		components:{
			"foods-list": foodsList
		}
	}
</script>

<style lang="scss">
	.search{
		width: 100%;
		.searchInput{
			width: 100%;
			height: 70rpx;
			background-color: $global-color;
			padding: 10rpx 0;
			input{
				width: 96%;
				background-color: #F8F8F8;
				height: 70rpx;
				border-radius: 20rpx;
				padding: 0rpx 20rpx;
				box-sizing: border-box;
				margin: 0 auto;
				font-size: 34rpx;
			}
		}
		.hot_foods{
			width: 100%;
			.hot_title{
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				padding: 0 10rpx;
				font-size: 34rpx;
				letter-spacing: 6rpx;
			}
			.hot_list{
				width: 100%;
				height: calc(100vh - 200rpx);
			}
		}
	}
</style>
