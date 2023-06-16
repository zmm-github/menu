<template>
	<foods-list :foods="showFoods"></foods-list>
</template>

<script>
	import List from '../../components/List.vue';
	export default {
		data() {
			return {
				foods: [],
				showFoods: [],
				indexOne: 0,
				indexTwo: 16
			}
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: option.name
			})
			let num = 100;
			let rList = [];
			let length = this.$food.length;
			let that = this;
			while(num--){
				rList.push(Math.ceil(Math.random()*length));
			}
			rList.forEach(function(el){
				that.foods.push(that.$food[el]);
				that.showFoods = that.foods.slice(that.indexOne,that.indexTwo);
			})
		},
		onPullDownRefresh() {
			console.log("下拉刷新了");
			this.handleToTop();
		},
		onReachBottom() {
			this.handleToButton();
		},
		methods: {
			handleToTop(){
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
					that.showFoods = [...that.showFoods,...that.foods.slice(that.indexOne,that.indexTwo)];
					uni.hideLoading();
				},400);
			}
		},
		components: {
			"foods-list": List
		}
	}
</script>

<style>

</style>
