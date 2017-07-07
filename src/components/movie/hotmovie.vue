<template>
	<div>
	<div class="hotmovie" ref="hotmovie">
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom">
			<div class="wrapper">
				<banner></banner>
			
				<div class="movie_list">
					
					<li v-for="item in filmArr" @click="goDeatail(item.id)" class="filmArr_map_li">
						<div class="movie_li_wrapper">
							<img class="poster" :src="item.poster.thumbnail" alt="" />
							
							<div class="film_detail">
								<li>
									<h4 class="name">{{item.name}}</h4>
									<span class="grade">{{item.grade}}</span>
								</li>
								<li class="intro">{{item.intro}}</li>
								<li class="cinemaCount">{{item.cinemaCount}}个影院上映</li>
								<li>
									<span>资讯</span>
									<span></span>
								</li>
							</div>
						</div>
		
					</li>
					
				</div>
			</div>
		</mt-loadmore>
		
	</div>
	<router-view></router-view>
	</div>
</template>

<script>
	import Vue from 'vue'
	import api from '../../../common/api.js'
	import router from '../../router/index.js'
 	import { Loadmore } from 'mint-ui';
 	import banner from '@/components/common/banner.vue'
 	
	Vue.component(Loadmore.name, Loadmore);
 	
	export default{
		name:'hotmovie',
		data(){
			return {
				filmArr:[],
				page:1,
				count:9,
				allLoaded:false
			}
		},
		
		created(){
			
			this.$http.get(`${api.hotmovieApi}&page=${this.page}&count=${this.count}`)
			.then((response)=>{
//				console.log(response)
				let filmArr = response.data.data.films;
				this.filmArr = filmArr;
				
			})
			.catch((error)=>{
				console.log(error)
			})
			
		},
		methods:{
			loadTop() {
			  // 加载更多数据
//			  this.$refs.loadmore.onTopLoaded();
				console.log('下拉刷新')
			},
			loadBottom(){
				console.log('上拉加载')
			},
			goDeatail(id){

				router.push('/movie/detail/'+ id)
			}
		},
		components:{
			banner
		}
	}
</script>

<style>
	.hotmovie{
		width: 100%;
		overflow: auto;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
	}
	
	.filmArr_map_li{
		width: 100%;
		position: relative;
		border-bottom: 0.01rem solid #e0e0e0;
	}

	div.movie_li_wrapper{
		padding: 0.6rem 0 0 0;
	}
	
	img.poster{
		float: left;
		width: 1.74rem;
		height: 2.4rem;
	}
	.film_detail{
		display: inline-block;
		width: 75.1%;
		margin-left: 0.32rem;
	}
	.film_detail li:nth-child(1) {
		display: flex;
		justify-content: space-between;
		line-height: 0.64rem;
	}
	.film_detail li:nth-child(1) h4{
		font-size: 0.47rem;
		color: black;
	}
	
	.film_detail li:nth-child(1) span.grade{
		color: #ff6640;
		font-size: 0.4rem;
	}
	
	.film_detail li:nth-child(2){
		line-height: 1.02rem;
		color: #b7b7b7;
		font-size: 0.33rem;
	}
	
	.film_detail li:nth-child(3){
		line-height: 0.49rem;
		color: #b7b7b7;
		font-size: 0.33rem;
		padding-bottom: 0.28rem;
		border-bottom: 0.03rem dashed #f2f2f2;
	}
	.film_detail li:nth-child(4){
		color: #ffb774;
		font-size: 0.26rem;

	}
	.film_detail li:nth-child(4)>span:nth-child(1){
		display: inline-block;
		padding: 0.08rem 0.15rem;
		border-radius: 0.05rem;
		border: 0.01rem solid #ffb774;
		margin: 0.35rem 0;
	}		
	
	
</style>