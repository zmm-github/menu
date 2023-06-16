<template>
	<view class="dailyMeals">
		<view class="recommend" v-for="(foods,index) in foodList" :key="index">
			<view class="recommend_title title1">{{foods==foodList[0]?'早餐推荐':foods==foodList[1]?'午餐推荐':'晚餐推荐'}}</view>
			<foods-list :foods="foods"></foods-list>
		</view>
	</view>
</template>

<script>
	import foodsList from '../../components/List.vue';
	export default {
		data() {
			return {
				foodList: []
			}
		},
		onLoad() {
			this.handleData();
		},
		methods: {
			handleData(){
				let num = 4;
				let rList = [];
				let length = this.$food.length;
				let that = this;
				let showFood = [];
				for(var i=0;i<3;i++){
					num = 4;
					rList = [];
					showFood = [];
					while(num--){
						rList.push(Math.ceil(Math.random()*length));
					}
					rList.forEach(function(res){
						showFood.push(that.$food[res]);
					})
					that.foodList.push(showFood);
				}
				console.log(that.foodList);
			}
		},
		components: {
			"foods-list": foodsList
		}
	}
</script>

<style lang="scss">
	.dailyMeals{
		width: 100vw;
		.recommend{
			margin: 20rpx 0;
			.recommend_title{
				width: 20vw;
				height: 5vh;
				line-height: 5vh;
				background-color: #f3a200;
				color: #FFFFFF;
				font-size: 4vw;
				padding: 0 20rpx;
				border-radius: 0 50% 50% 0;
			}
		}
	}
</style>
