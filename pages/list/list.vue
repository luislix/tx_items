<template>
	<view class="category">
		<view class="category-wrapper" v-if="catrgoryList.length>0">
			<!-- 左边导航 -->
			<scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true">
				<view class="left-content">
					<view class="title-content" :class="select_index === index?'onSelected':''" v-for="(title,index) in catrgoryList"
					 :key="title.id" @tap="choose(index,title.id)">{{title.name}}</view>
				</view>
			</scroll-view>
			<!-- 右边内容 -->
			<scroll-view scroll-y="true" class="right-wrapper" scroll-with-animation="true" v-if="makeup">
				<view class="right-content">
					<!-- 产品区 美妆-->
					<view class="product-wrapper">
						<view class="category-content">
							<view class="product-item" v-for="(p_item,p_index) in product" :key="p_item.id" @tap="enterDetail(p_item.id)">
								<image class="product-img" :src="p_item.icon"></image>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>

			<scroll-view scroll-y="true" class="right-wrapper" scroll-with-animation="true" v-else>
				<view class="right-content">
					<!-- 产品区 非美妆-->
					<view class="product-wrapper">
						<view class="category-content">
							<view class="category-list" v-for="(c_item,c_index) in catrgory" :key="c_item.id" @tap="enterDetail(c_item.id)">
								<image class="category_img" :src="c_item.big_images" mode=""></image>
								<view class="category_txt">
									<text class="title">{{c_item.name}}</text>
									<text class="price"><text class="symbol">￥</text>价格<text class="earn">/赚<text>3.6</text></text></text>
									<image src="../../static/images/index/icon-fenxiang.png" @tap.stop="share"></image>
								</view>
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
				product: [], //美妆列表
				catrgory: [], //其他列表
				select_index: 0,
				makeup: true,
				page:1//分页数
			}
		},
		onLoad() {
			this.getClassification();
		},
		methods: {
			// 获取分类数据
			getClassification() {
				var data = {};
				request.post('goods/category', data).then(res => {
					this.catrgoryList = res.data
					this.chooseGoods(res.data[0].id)
				})
			},
			// 获取列表数据
			getList(data) {
				var data = data;
				request.post('search/index', data).then(res => {
					console.log(res)
					this.catrgory = res.data
						this.makeup = false
					// this.catrgoryList = res.data
					// this.chooseGoods(res.data[0].id)
				})
			},
			// 选择分类
			choose(index, id) {
				if (this.select_index === index) {
					return;
				}
				this.select_index = index;
				this.chooseGoods(id)
			},
			// 分类对应商品
			chooseGoods(id) {
				var that = this;
				var data = that.catrgoryList
				console.log(id)
				var arr = [];
				for (var i = 0; i < data.length; i++) {
					if (id == data[i].id) {
						var itemLength = data[i].items.length
						console.log(itemLength)
						arr = data[i].items
						if(itemLength != "11"){
							var postData={
								category_id:id,
								page:that.page
							}
							that.getList(postData)
						}else{
									that.product = arr
									that.makeup = true
						}
					}
				}
				// console.log(that.catrgory)
				// if (id == '1') {
				// 	that.product = arr
				// 	that.makeup = true
				// } else {
				// 	that.catrgory = arr
				// 	that.makeup = false
				// }
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
				border-top: 1rpx #F7F3F1 solid;
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
				border-top: 1rpx #F7F3F1 solid;
				flex: 1;
				background-color: #fff;

				.right-content {
					width: 100%;
					border-left: 1rpx solid #efefef;
					box-sizing: border-box;

					.product-wrapper {
						.category-content {
							display: flex;
							flex-wrap: wrap;
							justify-content: space-around;
							align-content: space-around;

							.product-item {
								margin-top: 98rpx;
								width: 260rpx;
								height: 86rpx;

								.product-img {
									width: 100%;
									height: 100%;
								}
							}
						}

						.category-list {
							width: 100%;
							padding: 26rpx 34rpx;
							background: #007AFF;
						}
					}
				}
			}
		}

	}
</style>
