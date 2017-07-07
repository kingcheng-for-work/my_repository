<template>
	<div class="comingmovie">
		<banner></banner>
		<div class="co_movie_list">
					
			<li v-for="item in comingmovieData">
				<div class="date_title">{{new Date(item.time).getMonth()+1}}月{{new Date(item.time).getDate()}}日</div>
				<div v-for="i in item.data" class="co_movie_li movie_li_wrapper  filmArr_map_li" @click="goDeatail(i.id)" >
					<img class="poster" :src="i.poster.thumbnail" alt="" />
					
					<div class="film_detail">
						<li>
							<h4 class="name">{{i.name}}</h4>
						</li>
						<li class="intro">{{i.intro}}</li>
						<li class="playDate">上映日期：{{new Date(i.premiereAt).getFullYear()}}-{{new Date(i.premiereAt).getMonth()+1}}-{{new Date(i.premiereAt).getDate()}}</li>
						<li>
							<span>资讯</span>
							<span></span>
						</li>
					</div>
				</div>

			</li>
		</div>	
	
	</div>
	
</template>

<script>
	import Vue from 'vue'
	import api from '../../../common/api.js'
	import banner from '@/components/common/banner.vue'
	import {Loadmore } from 'mint-ui'
	import router from '../../router/index.js'
	
	export default{
		name:'comingmovie',
		data(){
			return {
				id: this.$route.params.id,
				page:1,
				comingmovieData:null
			}
		},
		created(){
			
			//获取影片的数据
			this.$http.get(api.comingmovieApi)
			.then((response)=>{
//				console.log(response);
				
				let filmsArr = response.data.data.films;
				let obj={};
				let arr=[];
				
				filmsArr.map((item1, i)=>{
					if(obj[item1.premiereAt] == undefined){
						obj[item1.premiereAt] = 1;
						let objNew = {};
						objNew.time = item1.premiereAt;
						objNew.data = [];
						objNew.data.push(item1);
						arr.push(objNew);
					}else{
						arr.map((i, index)=>{
							if(i.time == item1.premiereAt){
								arr[index].data.push(item1);
							}
						})
					}
				})
				
				this.comingmovieData = arr;

			})
			.catch((error)=>{
				console.log(error);
			})
		},
		methods:{
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
	.comingmovie{
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		overflow: auto;
		
	}
	li.playDate{
		color: orange !important;
	}
	.co_movie_list .date_title{
		width: 100%;
		height: 0.8rem;
		background: #f9f9f9;
		line-height: 0.8rem;
		font-size: 0.32rem;
		color: #767676;
	}
</style>