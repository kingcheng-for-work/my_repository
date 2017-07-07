<template>
	<transition name="slide">
	<div class="detail">
		<div>
			<header class="header">
				<img src="../../../static/pic/catalogue.png" class="left-btn" @click="goBack()">
				<h1 class="title">{{detailData.name}}</h1>
			</header>
			<div class="content">
				<div class="poster"><img :src="detailData.cover.origin" alt=""></div>
				<div class="introduce">影片介绍</div>
				<div class="info_all">
					<div class="info">导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演:{{detailData.director}}</div>
					<div class="info" >主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演:<span v-for="item in actors">{{item.name}}|</span></div>
					<div class="info">地区语言:{{detailData.language}}</div>
					<div class="info">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{detailData.category}}</div>
					<div class="info">上映日期:{{new Date(detailData.premiereAt).getMonth() + 1}}月{{new Date(detailData.premiereAt).getDate()}}日上映</div>
					<div class="story">{{detailData.synopsis}}</div>
				</div>
				<div class="tickets" @click="goCinema(detailData.id)">
					<span>立即购票</span>
			 		<!-- <router-link to="/home/detail/theater">立即购票</router-link>  -->
				</div>
				
			</div>
		</div>
		<router-view :data="detailData.name"></router-view>
	</div>
	
	</transition>
	

</template>

<script>
	import Vue from 'vue'
	import router from '../../router'
	
export default{
	name:'detail',
	data(){
		return{
			id: this.$route.params.id,
			detailData:{cover:''},
			actors:[]
		}
	},
	created(){
		this.$http.get(`api/film/${this.id}?__t=${new Date().getTime()}`)
		.then((response)=>{
			this.detailData = response.data.data.film;
			this.actors = response.data.data.film.actors;

		})
		.catch((error)=>{
			console.log(error);
		})
	},
	methods:{
		goBack(){
			router.go(-1);
		},
		goCinema(id){
			console.log(id);
			router.push('/movie/detail/'+id + '/theatre');
		}
	}
	
	
}
	
</script>

<style>
	.detail{
		width: 100%;
		height: 100%;
		z-index: 10;
		position: absolute;
		top: 0;
		left: 0;
		background: white;
	}
	.detail .header{
		top: 0;
		left: 0;
		z-index: 11;
		background: #0F0F0F;
		width: 100%;
		height: 1.2rem;
		position: absolute;
	}
	.detail .header .title{
		color: white;
		font-size: 0.4rem;
		line-height: 1.2rem;
		margin-left: 1.5rem;
	}
	.detail .header .left-btn{
		width: 0.4rem;
		height: 0.4rem;
		float: left;
		line-height: 1.2rem;
		margin: 0.4rem 0 0 0.4rem;
	}
	.detail .content{
		background: #EBEBEB;
		position: absolute;
		top: 1.2rem;
		bottom: 0;
		z-index: 11;
		width: 100%;
		overflow: auto;
	}
	.detail .content .poster{
		width: 100%;
		
	}
	.detail .content .poster img{
		width: 100%;
		height: 100%;
	}
	.detail .content .introduce{
		margin: 0.16rem auto;
		font-size: 0.4rem;
		border-left: 0.4rem solid RGB(228, 200, 156);
		padding-left: 0.04rem;
		height: 0.4rem;
	}

	.detail .content .info_all{
		padding: 0 0.4rem;
	}
	.detail .content .info_all .info{
		line-height: 0.7rem;
	}
	.detail .content .info_all .story{
		line-height: 0.5rem;
	}
	
	.detail .content .tickets{
		position: fixed;
		left: 0;
		bottom: 0.5rem;
		width: 100%;
		text-align: center;
		height: 0.8rem;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	
	.detail .content .tickets span{
		display: block;
		width: 2.5rem;
		height: 0.8rem;
		background: #FE8233;
		color: #fff;
		text-align: center;
		line-height: 0.8rem;
		border-radius: 0.14rem;
		font-size: 0.18rem;
	}
	@keyframes slide-enter{
		from{
			transform: translateX(100%);
		}
		to{
			transform: translateX(0%);
		}
	}
	@keyframes slide-leave{
		from{
			transform: translateX(0%);
		}
		to{
			transform: translateX(100%);
		}
	}
	.slide-enter-active{
		animation: slide-enter 400ms ease-in;
	}
	.slide-leave-active {
	  animation: slide-leave 400ms ease-in;
	}
	
	
</style>