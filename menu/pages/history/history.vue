<template>
	<view :class="name==0?'a':''">
		<history :foods="showFoods" v-if="name==1" />
		<view v-if="name==0" class="hs" v-for="(item,index) in historys" :key="index">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	import history from"../../components/List.vue"
	export default {
		name:"h",
		components:{
			history
		},
		data() {
			return {
				historys:[],
				showFoods:[],
				name:""
			}
		},
		onLoad(option){
			this.name=option.name
			if(option.name==0){
				uni.setNavigationBarTitle({
					title:"搜索历史"
				})
				this.historys=uni.getStorageSync('searchHistory')
			}else{
				uni.setNavigationBarTitle({
					title:"浏览历史"
				})
				this.showFoods=uni.getStorageSync('history')
				let lists=[]
				this.showFoods.forEach(el=>{
					this.$food.forEach(res=>{
						if(res._id.$oid==el.id){
							lists.push(res)
						}
					})
				})
				this.showFoods=lists
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.a{
		margin: 0;
		padding: 5rpx;
		box-sizing: border-box;
		height: 100vh;
		background-color: #E1E1E1;
	}
.hs{
	margin-top: 10rpx;
	width: 100%;
	background-color: white;
	height: 5vw;
}
</style>
