<template>
	<view class="page">

	</view>
</template>

<script>
	import request from '../../common/request.js'
	export default {
		data() {
			return {

			}
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			// console.log(option); //打印出上个页面传递的参数。
			this.getDetail(option)
		},
		methods: {
			//获取数据
			getDetail(data) {
				var data = data;
				request.post('goods/detail', data).then(res => {
					console.log(res)
					// this.catrgory = res.data.data
					// 	this.makeup = false
					// this.catrgoryList = res.data
					// this.chooseGoods(res.data[0].id)
				})
			},
		}
	}
</script>

<style>

</style>
