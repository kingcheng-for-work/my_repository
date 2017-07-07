<template>
	<div class="cinema">
		<div class="search_title">
			<div class="location_icon">
				<span class="iconfont icon-dingwei">{{address}}</span>
				<span class="address">深圳</span>
			</div>
			
			<div class="title_name">全部影院</div>
			<span class="iconfont icon-chazhao"></span>
		</div>
		
		<div class="cinema_content"> 
			
				
			<div class="all_title">
				<span class="all_title_disSer">
					
					<span v-if="all_title_disSer">全部区域、服务</span>
					<span v-if="!all_title_disSer"><span @click="deleteAct()">X</span>已选：<span v-for="item in allSelect" class="selected"  style="color:orange; padding-right: 0.2rem;">{{item}}</span></span>
				</span>
				<span @click="openSelect()">
					筛选
					<em class="iconfont icon-icon"></em>
				</span>
			</div>
					
			<div class="select" v-if="isShow">
				<div class="select_list">
					<div class="select_list_content">
						<div class="title"><h4>区域</h4><span class="place">{{district}}</span></div>
						<ul class="select_list_li">
							<li v-for="(item,index) in cinemasArrDis" :key="index" @click="select(index)" :class="{active: item.show}">{{item.name}}</li>
						</ul>
						<div class="title"><h4>服务</h4><span class="server" v-for="item in selectActArr">{{item}}</span></div>
						<ul class="select_list_li">
							<li v-for="(item,index) in data" :key="index" :class="{active: item.showAct}" @click="selectAct(index)">{{item.activity}}</li>
							
						</ul>
						<ul class="button">
							<li @click = "cancelAct()"><span>取消</span></li>
							<li @click = "confirmAct()"><span>确定</span></li>
						</ul>
						<div class="cover">
							
						</div>
					</div>
					
				</div>
				<!--<div class="cover"></div>-->
			</div>
			<div class="content_flow">
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom">
					<div class="wrapper">
						<banner class="banner"></banner>
						<div class="theatrelist">
							<div class="list_li" v-for="(item,index) in cinemasArr" :key="index">
								<li v-for="(i,index) in item.data" :key="index">
									<div class="address_price">
										
										<span class="name">{{i.name}}</span>
										<span class="price">¥{{i.minimumPrice}}</span>
									</div>
									<div class="activity">
										<span v-for="(j,index) in i.labels" :class="j.type" :key="index">{{j.name}}</span>
										
									</div>
									<div class="address">{{i.address}}</div>
									<div class="info">距离未知</div>
								</li>
								
								
							</div>
							
						</div>
					</div>
				</mt-loadmore>
			</div>
			
		</div>

	</div>

</template>

<script>
	import Vue from 'vue'
	import api from '../../../common/api.js'
	import banner from '../common/banner'
	import { Loadmore } from 'mint-ui';
	
	Vue.component(Loadmore.name, Loadmore);
	
	export default{
		name : 'cinema',
		data(){
			return{
				address:'',
				cinemasArr:[],
				cinemasArrDis:[],
				isShow: false,
				district:'',
				data:[{activity:'特惠影院', showAct: false},{activity:'订座退票', showAct: false},
						{activity:'观影小食', showAct: false},{activity:'iMax', showAct: false},
						{activity:'价格最低', showAct: false}],
				selectActArr:[],
				allSelect:[],
				all_title_disSer:true
			}
		},
		created(){
			this.$http.get(`api/cinema?__t=${new Date().getTime()}`)
			.then((response)=>{
				let cinemasArr = response.data.data.cinemas;
				let obj={};
				let	arr=[];
				
				cinemasArr.map((item,index)=>{
					if(obj[item.district.name] == undefined){
						obj[item.district.name] = 1;
						let objNew = {};
						objNew.name = item.district.name;
						objNew.show = false;
						objNew.data = [];
						objNew.data.push(item);
						arr.push(objNew);
					}else{
						arr.map((i, index)=>{
							if(i.name == item.district.name){
								arr[index].data.push(item);
							}
						})
					}
					
				})
				this.cinemasArr = arr;
				this.cinemasArrDis = arr;
				
			})
			.catch((error)=>{
				console.log(error);
			})
			
		},
		methods:{
			toggle2(index){
				console.log(index)
			},
			loadTop(){
				console.log('刷新')
			},
			loadBottom(){
				console.log('上拉加载')
			},
			openSelect(){
				this.allSelect=[];
				
				if(!this.isShow){
					this.isShow = true;
				}else{
					this.isShow = false;
				}	
			},
			select(val){
				
				
				let oDis = document.getElementsByClassName("select_list_li")[0];
				let oLiDisArr = oDis.getElementsByTagName("li") 
				this.cinemasArrDis.map((item,index)=>{
					
					if(val == index){
						
						if(!this.cinemasArrDis[index].show){
							this.cinemasArrDis[index].show = true;
							this.district = oLiDisArr[val].innerHTML;
						}else{
							this.cinemasArrDis[index].show = false;
							this.district = '';
						}
						
						
					}else{
						this.cinemasArrDis[index].show = false;
					}
				})
				
			},
			selectAct(val){
				let oDis = document.getElementsByClassName("select_list_li")[1];
				let oLiDisArr = oDis.getElementsByTagName("li") 
				if(!this.data[val].showAct){
					this.data[val].showAct = true;
					let oString =  oLiDisArr[val].innerHTML
					this.selectActArr.push(oString);
					
				}else{
					let oString =  oLiDisArr[val].innerHTML
					this.data[val].showAct = false;
					
					this.selectActArr.map((item, index)=>{
						if(item == oString){
							this.selectActArr.splice(index, 1);
						}
					})
					
					
					
				}	
			},
			cancelAct(){
				if(!this.isShow){
					this.isShow = true;
				}else{
					this.isShow = false;
				}
				
			},
			confirmAct(){
				this.all_title_disSer = false;
				
				this.allSelect = this.allSelect.concat(this.selectActArr);
				this.allSelect.unshift(this.district);

				if(!this.isShow){
					this.isShow = true;
				}else{
					this.isShow = false;
				}
				let district = this.district;
				this.cinemasArrDis.map((item, index)=>{
					if(district == item.name){
						let arr = [];
						arr.push(this.cinemasArrDis[index])
						console.log(arr);
						this.cinemasArr = arr;
						
						console.log(this.cinemasArr)
						
					}
				})
				
//				console.log(this.allSelect)
			},
			deleteAct(){
				this.allSelect = [];
				this.all_title_disSer = true;
				this.cinemasArr = this.cinemasArrDis;
				console.log(this.cinemasArr);
			}
		},
		components:{
			banner
		}
	}
	
</script>

<style>
	.cinema{
		font-size: 0.45rem;
	}
	
	.cinema .search_title{
		width: 100%;
		height: 1.34rem;
		line-height: 1.34rem;
		position: absolute;
		left: 0;
		top: 0;
		background: white;
		text-align: center;
		color: #7f7f7f;
	}
	.cinema_content{
		position: absolute;
		left: 0;
		top: 1.35rem;
		bottom: 1.48rem;
		width: 100%;
	}
	.cinema_content .server{
		color: orange;
		padding-right: 0.2rem;
	}
	.cinema_content .content_flow{
		width: 100%;
		position: absolute;
		left: 0;
		top: 1.15rem;
		bottom: 0;
		overflow: auto;
	}
	
	.cinema .location{
		position: absolute;
		left: 0.78rem;
		
	}

	.icon-chazhao{
		font-size: 0.45rem;
		color: #2bb8d4;
		position: absolute;
		right: 0.69rem;
		top: 0;
		display: block;
		
	}
	.location .address{
		font-size: 0.35rem;
		color: #7f7f7f;
	}

	.cinema .all_title{
		width: 100%;
		height: 1.15rem;
		border-bottom: 0.02rem solid #e0e0e0;
		line-height: 1.15rem;
		font-size: 0.36rem;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		justify-content: space-between;
	}
	.cinema .all_title:before{
		content: '';
		width: 100%;
		height: 0.01rem;
		position: absolute;
		left: 0;
		top: -0.01rem;
		border-top: 0.01rem solid #b3b2b3;
		transform: scaleY(0.5); 
	}
	
	.all_title>span:nth-child(1){
		padding-left: 0.4rem;
	}
	
	.all_title>span:nth-child(2){
		padding-right: 0.4rem;
		color: #2bb8d4;
	}
	
	/*上下拉刷新样式*/
	
	.cinema .wrapper{
		width: 100%;
		overflow: auto;
	}
	/***********/
	
	/*影院列表样式*/
	.cinema .theatrelist{
		width: 100%;
		background: white;
	
	}
	.cinema .list_li .district{
		width: 100%;
		height: 1.15rem;
		background: #2bb8d4;
		line-height: 1.15rem;
		color: white;
	}
	.cinema .list_li .district span{
		padding-left: 0.5rem;
	}
	.cinema .list_li li{
		width: 90%;
		position: relative;
		padding: 0 0.47rem;
	}
	
	.cinema .list_li li:after{
		content: '';
		width: 100%;
		height: 0.01rem;
		border-bottom: 0.01rem dashed gray;
		position: absolute;
		left: 0;
		bottom: 0;
		transform: scaleY(0.5);
	}
	
	.cinema .list_li li .address_price{
		line-height: 0.9rem;
		display: flex;
		justify-content: space-between;
	}
	.cinema .list_li li .address_price .name{
		display: inline-block;
		font-size: 0.45rem;
		color: black;
		width: 70%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cinema .list_li li .address_price .price{
		color: #e46e2c;
		font-size: 0.4rem;
	}
	.cinema .activity span{
		margin: 0 0.4rem 0 0;
	}
	
	/**优惠活动样式***/
	.cinema .activity span.SUNDRY,.cinema .activity span.DISCOUNT,.cinema .activity span.REFUNDABLE_SEAT_TICKET,.cinema .activity span.TEHUI{
		display: inline-block;
		color: white;
		font-size: 0.27rem;
		border-radius: 0.08rem;
		padding: 0.1rem 0.24rem;
	}
	.cinema .activity span.SUNDRY{
		background: #69abcb;
	}
	.cinema .activity span.DISCOUNT{
		background: #ee7e78;
	}
	
	.cinema .activity span.REFUNDABLE_SEAT_TICKET{
		background: limegreen;
	}
	
	.cinema .activity span.TEHUI{
		background: orange;
	}
	
	/**************/
	
	.cinema .list_li li .address{
		width: 70%;
		font-size: 0.32rem;
		color: #b7b7b7;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 0.9rem;
	}
	.cinema .list_li li .info{
		font-size: 0.32rem;
		color: #b7b7b7;
		padding-bottom: 0.3rem;
	}
	
	/**********/
	
	/*筛选样式*/
	.cinema .select{
		width: 100%;
		position: absolute;
		left: 0;
		top: 1.14rem;
		bottom: 0;
		z-index: 12;
		border-top: 0.01rem solid #ddd;
		background: rgba(0,0,0,0.5);
	}
	
	.cinema .select .select_list{
		background: white;

	}
	.select_list_content .title h4{
		display: inline-block;
		padding-right: 0.5rem;
	}

	.cinema .select .select_list .title{
		font-size: 0.38rem;
		line-height: 1.48rem;
		padding-left: 0.4rem;
	}
	.cinema .select .select_list ul.select_list_li{
		border-bottom: 0.01rem dashed ;
		padding-left: 0.66rem;
	}
	
	.cinema .select .select_list ul.select_list_li li{
		display: inline-block;
		padding: 0.12rem 0.32rem;
		border: 0.03rem solid #dcdcdc;
		font-size: 0.32rem;
		border-radius: 0.1rem;
		margin-right: 0.24rem;
		margin-bottom: 0.5rem;
		color: #7c7c7c;
	}
	.cinema .select .select_list ul.button{
		display: flex;
	} 
	.cinema .select .select_list ul.button li{
		flex: 1;
		display: inline-block;
		text-align: center;
		
	}
	.cinema .select .select_list ul.button li:nth-child(2){
		color: #2bb8d4;
	}
	
	.cinema .select .select_list ul.button li:nth-child(1){
		border-right: 0.02rem solid #ddd;
	}

	.cinema .select .select_list ul.button li span {
		padding: 0.3rem;
		display: block;
	}
	.select_list_li li.active{
		background: limegreen;
		color: white !important;
	}
	.all_title_disSer {
		width: 78%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/*******/
</style>