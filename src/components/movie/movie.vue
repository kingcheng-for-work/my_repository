<template>
	<div>
		<div class="movie">
			<div class="search_title">
				<router-link class="location_icon" to="/movie/location">
					<span class="iconfont icon-dingwei"></span>
					<span class="address">深圳</span>
				</router-link>
				
				<div class="title_name">电影</div>
				
				
			</div>
			
			<div class="movie_content">
				<div class="content_nav">
					<li v-for="(item,index) in title">
						<span style="display: inline-block;line-height: 1rem;"  @click="move($event, index)" key="index" ref="span" :class="{active: tabIndex==index}">
							{{item}}
						</span>
						
					</li>
					<span class="bar" :style="{'width': width + 'px', 'left': left + 'px'}"></span>
				</div>
				<div class="box">
				<swiper ref="mySwiper" :options="swiperOption">
					<swiper-slide><hotmovie></hotmovie></swiper-slide>
					<swiper-slide><comingmovie></comingmovie></swiper-slide>
					<swiper-slide><hotactivity></hotactivity></swiper-slide>
				</swiper>
				</div>
			
			</div>
		</div>
		<router-view></router-view>
	</div>

</template>

<script>
	import router from '../../router/index.js'
	import hotmovie from '@/components/movie/hotmovie.vue'
	import comingmovie from '@/components/movie/comingmovie.vue'
	import hotactivity from '@/components/movie/hotactivity.vue'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	
	export default{
		name : 'movie',
		data(){
			return {
				swiperOption:{
					notNextTick: true,
					autoplay: false
				},
				title:['热门电影','即将上映','热门活动'],
				width:0,
				left:0,
				tabIndex:0
				
			}
		},
		created(){
			setTimeout(()=>{
				this.initial();
			},20)
		},
		components:{
			hotmovie,
			comingmovie,
			hotactivity,
		    swiper,
		    "swiper-slide" : swiperSlide
		},
		computed:{
			swiper(){
				return this.$refs.mySwiper.swiper
			}
		},
		methods:{
			move(event, index){
				this.tabIndex = index;
				this.swiper.slideTo(index, 500, false);
				this.width = event.target.offsetWidth;
				this.left = event.target.offsetLeft;
			},
			initial(){
				this.width = this.$refs.span[0].offsetWidth;
				this.left = this.$refs.span[0].offsetLeft;
			}
		}
		
	}
	
</script>

<style>
	.movie{
		font-size: 0.45rem;
	}
	
	.location_icon{
		position: absolute;
		left: 0.78rem;
	}

	.icon-dingwei{
		font-size: 0.45rem;
		color: #2bb8d4;
	}
	.location .address{
		font-size: 0.35rem;
		color: #7f7f7f;
	}
	.box{
		position: absolute;
		left: 0;
		top: 1.08rem;
		bottom: 0;
		width: 100%;
	}
	.movie .search_title{
		width: 100%;
		height: 1.35rem;
		line-height: 1.35rem;
		position: absolute;
		left: 0;
		top: 0;
		background: white;
		text-align: center;
		color: #7f7f7f;
	}
	
	.movie .movie_content{
		width: 100%;
		position: absolute;
		left: 0;
		top: 1.35rem;
		bottom: 1.48rem;
	}
	
	.movie_content .content_nav{
		width: 100%;
		height: 1.08rem;
		display: flex;
		flex: 1;
		border-bottom: 0.02rem solid #e7e7e7;
		position: relative;
	}
	
	.movie_content .content_nav .bar{
		position: absolute;
		bottom: 0.02rem;
		display: block;
		height: 0.06rem;
		background: #ff6640;
		transition: all 0.5s;
	}
	
	.movie_content .content_nav li{
		width: 33.33%;
		height: 1.08rem;
		text-align: center;
		font-size: 0.38rem;
		color: #7f7f7f;
	}
	
	.movie_content .content_list{
		width: 100%;
		position: absolute;
		left: 0;
		top: 1.08rem;
		bottom: 0;
	}
	.swiper-container{
		height: 100%;
	}
	.active{
		color: #ff6640;
	}
</style>