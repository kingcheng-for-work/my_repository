<template>
	<div class="banner">
		<mt-swipe :auto="4000">
		  <mt-swipe-item v-for="item in bannerImg">
		  	<img :src="item.imageUrl" alt="" />
		  </mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	import Vue from 'vue'
	import api from '../../../common/api.js'
	import { Swipe, SwipeItem } from 'mint-ui'
	
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	
	export default{
		name:'banner',
		data(){
			return{
				bannerImg:[]
			}
		},
		created(){
			//获取banner的图片数据
			this.$http.get(api.firstbannerApi)
			.then((response)=>{
			
				let imgArr = response.data.data.billboards;
				this.bannerImg = imgArr;
				
			})
			.catch((error)=>{
				console.log(error)
			})
		}
	}
</script>

<style>
	.banner{
		width: 100%;
		height: 3.37rem;
	}
	.mint-swipe{
		width: 100%;
		height: 3.37rem;
	}
	.mint-swipe-items-wrap{
		width: 100%;
		height: 100%;
	}
	.mint-swipe-item{
		background: red;
	}
	.mint-swipe-item img{
		width: 100%;
		height: 100%;
		
	}
	.mint-swipe-indicator{
		width: 20px;
		height: 20px;
	}
</style>