<template>
	<div>
		<div class="movie">
			<div class="search_title">
				<router-link class="location" to="/movie/location">
					<span class="iconfont icon-dingwei"></span>
					<span class="address">深圳</span>
				</router-link>
				
				<div class="title_name">电影</div>
				<router-view></router-view>
				
			</div>
			<div class="movie_content">
				
				
			</div>
		</div>
		<router-view></router-view>
	</div>

</template>

<script>
	import router from '../../router/index.js'
	export default{
		name : 'movie',
		data(){
			return {
				
			}
		}
	}
	
</script>

<style>
	.movie{
		font-size: 0.45rem;
	}
	.icon-dingwei{
		font-size: 0.45rem;
	}
	.movie .search_title{
		width: 100%;
		height: 1.34rem;
		line-height: 1.34rem;
		position: absolute;
		left: 0;
		top: 0;
		background: white;
		
	}
	.movie .search_title:after{
		content: '';
		position: absolute;
		left: 0;
		bottom: -0.01rem;
		width: 100%;
		height: 0.01rem;
		border-bottom: 0.01rem solid #a9a9a9;
		transform: scaleY(0.5);
	}
	.movie .movie_content{
		width: 100%;
		position: absolute;
		left: 0;
		top: 1.35rem;
		bottom: 1.48rem;
	}
</style>