<template>
	<transition name="slide">
		<div class="location">

				<div class="location_title">
					<div class="back" @click="backAction()"><</div>
					<div>城市列表</div>
				</div>
				<div class="location_content" ref="wrapper">
					
					<ul class="location_nav">
						<li v-for="(item,index) in arr" @click="liAction(index)">{{item}}</li>
					</ul>
					
					<ul class="city">
						<li class="title"><span>GDP定位您所在的城市</span></li>
						<li><span style="border: none;color: #e88b49;">{{location}}</span></li>
					</ul>			
					<ul class="city" v-for="item in listData">
						<li class="title"><span>{{item.title}}</span></li>
						<li v-for="name in item.cityData" @click="locationAction(name)"><span>{{name}}</span></li>
					</ul>
	
				</div>

		</div>

	</transition>
</template>

<script>
	import Vue from 'vue'
	import api from '../../common/api.js'
	import router from '../router'
//	import BScroll from 'better-scroll'

	export default {
		name:'location',
		data(){
			return{
				location: '深圳',
				arr:['GPS','热','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
				listData:[
					{title:"热门城市", cityData:['深圳','上海','北京','广州']},
					{title:"A", cityData:[]},{title:"B", cityData:[]},{title:"C", cityData:[]},{title:"D", cityData:[]},
					{title:"E", cityData:[]},{title:"F", cityData:[]},{title:"G", cityData:[]},{title:"H", cityData:[]},
					{title:"J", cityData:[]},{title:"K", cityData:[]},{title:"L", cityData:[]},
					{title:"M", cityData:[]},{title:"N", cityData:[]},{title:"P", cityData:[]},
					{title:"Q", cityData:[]},{title:"R", cityData:[]},{title:"S", cityData:[]},{title:"T", cityData:[]},
					{title:"W", cityData:[]},{title:"X", cityData:[]},
					{title:"Y", cityData:[]},{title:"Z", cityData:[]}
				]
			}
		},
		computed : {
			test () {
				let arr = [];
				for (let i = 0; i < 200; i++) {
					arr.push(i);
				}
				return arr;
			}
		},
		created(){
			this.$http.get(api.locationApi)
			.then((response)=>{
//				console.log(response);
				var cityArr = response.data.data.cities;
				this.listData.map((i, index)=>{
					var letter = i.title;
					var cityData = i.cityData;
					cityArr.map((j, index)=>{
						if(j.pinyin.startsWith(letter)){
							cityData.push(j.name);
						}
					})
				})
				
			})
			.catch((error)=>{
				console.log(error);
			})
//			
//			let scroll = new BScroll(this.$refs.wrapper, {
//			  	probeType:3,
//				click:true
//			})
		},
		methods:{
			liAction(index){
				var cityDoms =  document.getElementsByClassName('city');
				var dom = cityDoms[index].getElementsByClassName('title')[0];
				var content  = document.getElementsByClassName("location_content")[0];
				var oBox = document.querySelector(".box")
				var distance = cityDoms[index].offsetTop
				
				console.log(oBox.scrollTop)

				console.log(content)
				console.log(cityDoms[index].offsetTop);
				console.log(content.scrollTop);
			},
			backAction(){
				router.go(-1);
			},
			locationAction(name){
				this.location = name
				
			}
		}
		
		
	}
	
</script>

<style>
	.location{
		font-size: 0.45rem;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
	}
	.location .location_title{
		height:1.34rem;
		text-align: center;
		line-height: 1.34rem;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: white;
	}
	.location_title .back{
		color: #56b1ce;
		position: absolute;
		left: 0.78rem;
		font-size: 0.4rem;
	}
	.location .location_title:after{
		content: '';
		position: absolute;
		left: 0;
		bottom: -0.01rem;
		width: 100%;
		height: 0.01rem;
		border-bottom: 0.01rem solid #a9a9a9;
		transform: scaleY(0.5);
	}
	.location .location_content{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 1.35rem;
		bottom: 0;
		overflow: scroll;
		z-index: 10;
		background: white;
	}

	.location .location_content .location_nav{
		position: fixed;
		right: 0;
		top: 1.35rem;
		bottom: 0;
		background: #7bc8d8;
		text-align: center;
		width: 0.81rem;
		padding: 35% 0;
	}
	.location_content .location_nav li{
		color: white;
		font-size: 0.26rem;
		line-height: 0.38rem;
	}
	.location_content .city li.title{
		width: 100%;
		height: 1.2rem;
		background: #f2f2f2;
		color: #808080;
		line-height: 1.2rem;
	}
	.location_content .city li.title span{
		display: block;
		margin-left: 0.48rem;
		border: none;
	}
	
	.location_content .city li span{
		display: block;
		margin-left: 0.6rem;
		border-bottom: 0.01rem solid #c8c7cb;
	}
	.location_content .city li{
		width: 100%;
		height: 1.3rem;
		line-height: 1.3rem;
		color: #000000;
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