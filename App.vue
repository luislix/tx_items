<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch');
		},
		onShow: function() {
			// console.log('App Show');
		},
		onHide: function() {
			// console.log('App Hide');
		}
	};
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	/* 公共样式 */
	page {
		background: #F8F2F2;
		color: #4a4a4a;
	}

	page,
	textarea {
		font-size: 28rpx;
	}

	input[type="text"],
	input[type="number"],
	input[type="idcard"],
	input[type="digit"],
	textarea {
		-webkit-appearance: none;
		border-radius: 5px;
		box-sizing: border-box;
	}

	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		/* font-family: "Noto Sans CJK SC Thin"; */
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}


	/* #endif */
</style>
