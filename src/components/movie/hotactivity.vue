<template>
	<div class="hotactivity">
		<banner></banner>
		<ul class="hot-logolist">
			<li v-for="(item,index) in listdata">
				<h2>{{item.title1}}</h2>
				<p>{{item.title2}}</p>
			</li>
		</ul>
		<ul class="hot-lists">
			<li>
				<img src="static/pic/pic1.png"/>
				<div class="now-item-mid">
					<h2>蛙蛙在线</h2>
					<p>免费领16张电影票</p>
					<p>活动时间:2017-05-24至12-31</p>
				</div>
			</li>
			<li>
				<img src="static/pic/pic2.png"/>
				<div class="now-item-mid">
					<h2>浙商银行</h2>
					<p>一元看电影</p>
					<p>活动时间:2017-05-24至12-31</p>
				</div>
			</li>
		</ul>

	</div>
</template>

<script>
	import Vue from 'vue'
	import banner from '@/components/common/banner.vue'
	
	export default{
		name:'hotactivity',
		data(){
			return {
				listdata : [
					{title1 : "卖座演出", title2 : "折扣特惠享不停"},
					{title1 : "周边·好货", title2 : "全程包邮￥9.9起"},
					{title1 : "电影实验室", title2 : "让你大开眼界"},
					{title1 : "福利大放送", title2 : "免费电影票天天领"}
				]

			}
		},
		created(){
		
		},
		components:{
			banner
		}
	}
</script>

<style>
	.hotactivity{
		width:100%;
		position:absolute;
		overflow:auto;
		left:0;
		top:0;
		bottom:0;
	}
	.hotactivity .hot-logolist{
		width:100%;
		margin-top: 0.2rem;
		overflow: hidden;
	}
	.hotactivity .hot-logolist li{
		width:50%;
		float:left;
		margin-bottom: 0.3rem;
	}
	.hotactivity .hot-logolist li h2{
		font-size:0.4rem;
		text-align: center;
		line-height:0.8rem;
	}
	.hotactivity .hot-logolist li p{
		font-size:0.34rem;
		color:#ccc;
		text-align: center;
		line-height: 0.6rem;
	}
	.hotactivity .hot-lists{
		width:100%;
	}
	.hotactivity .hot-lists li{
		margin:0.44rem 0.63rem 0.44rem 0.64rem;
		overflow: hidden;
		padding-bottom: 0.44rem;
		border-bottom: 1px solid #eee;
	}
	.hotactivity .hot-lists li img{
		display:inline-block;
		width:1.85rem;
		height:2.54rem;
		float:left;
	}
	.hotactivity .hot-lists li .now-item-mid{
		display: inline-block;
		float:left;
		width:5.41rem;
		margin-left: 0.56rem;
	}
	.hotactivity .hot-lists li .now-item-mid h2{
		font-size:0.48rem;
		color:#000;
	}
	.hotactivity .hot-lists li .now-item-mid p:nth-child(2){
		font-size:0.34rem;
		color:#787878;
		margin-top:0.32rem;
		margin-bottom: 0.48rem;
	}
	.hotactivity .hot-lists li .now-item-mid p:nth-child(3){
		font-size:0.34rem;
		color:#ff8764;
	}

</style>