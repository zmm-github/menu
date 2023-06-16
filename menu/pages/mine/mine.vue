<template>
	<view class="mine">
		<view class="mine_info">
			<image class="mine_img" src="../../static/image/user.png" mode="widthFix" />
			<view class="basic_info">
				<view class="name">start</view>
				<view class="userId">UID：124897</view>
			</view>
		</view>
		<view class="min-body">
			<view class="button">
				<navigator url="../history/history?name=0">
				<button>
					<p>搜索记录</p><span>&gt;</span>
				</button>
				</navigator>
				<navigator url="../history/history?name=1">
				<button>
					<p>浏览记录</p> <span>&gt;</span>
				</button>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.mine{
		background-color: #E1E1E1;
		height: 100vh;
		.min-body{
			.button{
				 navigator{
					margin: 10rpx 0;
					button{
						p{
							float: left;
						}
						span{
							float: right;
						}
					}
				}
			}
		}
		
		width: 100%;
		.mine_info{
			margin-bottom: 50rpx;
			display: flex;
			width: 100%;
			background-image: url(../../static/image/bg.png);
			background-size: cover;
			.mine_img{
				width: 10%;
				flex: 1;
				border-radius: 50%;
				margin: 30rpx;
				border: 10rpx solid #ffb4bc;
				box-sizing: border-box;
			}
			.basic_info{
				flex: 4;
				color: #FFFFFF;
				font-size: 30rpx;
				line-height: 50rpx;
				margin-left: 10rpx;
				.name{
					margin-top: 55rpx;
				}
			}
		}
	}
</style>
