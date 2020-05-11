<template>
	<view class="category">
		<view class="category-wrapper" v-if="catrgoryList.length>0">
			<!-- 左边导航 -->
			<scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true">
				<view class="left-content">
					<view class="title-content" :class="select_index === index?'onSelected':''" v-for="(title,index) in catrgoryList"
					 :key="title.id" @tap="choose(index)">{{title.name}}</view>
				</view>
			</scroll-view>
			<!-- 右边内容 -->
			<scroll-view scroll-y="true" class="right-wrapper" scroll-with-animation="true">
				<view class="right-content">
					<!-- 产品区 -->
					<view class="product-wrapper">
						<view class="category-content">
							<view class="product-item" v-for="(p_item,p_index) in catrgoryList[select_index].items" :key="p_item.id" @tap="enterDetail(p_item.id)">
								<image class="product-img" :src="p_item.icon"></image>
								<text class="product-title">{{p_item.name}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import request from '../../common/request.js'
	export default {
		data() {
			return {
				// data:[],//全部数据
				catrgoryList: [],
				select_index: 0,
			}
		},
		onLoad() {
			this.res();
		},
		methods: {
			// 获取数据
			res() {
				var data = {};
				request.post('goods/category', data).then(res => {
					this.catrgoryList = res.data
					console.log(res.data)
				})
			},
			// 选择分类
			choose(index) {
				if (this.select_index === index) {
					return;
				}
				this.select_index = index;
			},
			// 进入详情
			enterDetail(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="less">
	.category {
		.category-wrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			position: absolute;
			top: 0;
			bottom: 0;
			.left-wrapper {
				width: 161rpx;
				flex: 0 0 161rpx;
				.left-content {
					.title-content {
						width: 100%;
						height: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						cursor: pointer;
						font-size: 26rpx;
						font-weight: 400;
						line-height: 36rpx;
						&.onSelected {
							position: relative;
							color: #FFA68F;
							&::before {
								content: '';
								position: absolute;
								left: 0;
								top: 0;
								margin-top: 26rpx;
								width: 4rpx;
								height: 52rpx;
								background: linear-gradient(124deg, #FFA68F 0%, #fb7c22 100%);
							}
						}
					}
				}
			}

			.right-wrapper {
				flex: 1;
				background-color: #fff;
				.right-content {
					width: 100%;
					border-left: 1rpx solid #efefef;
					box-sizing: border-box;
					.product-wrapper {
						.category-content {
							display: flex;
							flex-direction: row;
							flex-flow: wrap;
							padding: 20rpx 20rpx 0;
							.product-item {
								width: 33%;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								margin-bottom: 20rpx;
								.product-img {
									width: 120rpx;
									height: 140rpx;
									margin-bottom: 10rpx;
								}
								.product-title {
									font-size: 23rpx;
								}
							}
						}
					}
				}
			}
		}

	}
</style>
