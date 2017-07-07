<template>
	<div class="theatrelist">
		<div class="all_title"><span>全部区域、服务</span></div>
		<div class="list_li" v-for="(item,index) in cinemasArr" :key="index">
			<div class="district" @click="toggle(index)"><span>{{item.name}}</span></div>
			<ul v-show="item.show">
				<li v-for="(i,index) in item.data" :key="index">
					<div class="address_price">
						
						<span class="name">{{i.name}}</span>
						<span class="price">¥{{i.minimumPrice}}</span>
					</div>
					<div class="activity">
						<span v-for="(j,index) in i.labels" :class="j.type" :key="index">{{j.name}}</span>
						
					</div>
					<div class="address">{{i.address}}</div>
					<div class="info">距离未知|剩余{{i.avaliableSchedule}}场</div>
				</li>
			</ul>
		</div>
	</div>

</template>

<script>
	import Vue from 'vue'
	
	
export default{
	name:'theatre',
	data(){
		return{
			id: this.$route.params.id,
			cinemasArr: [],
			titlename:''
		}
	},
	created(){
		this.$http.get(`api/film/${this.id}/cinema?__t=${new Date().getTime()}`)
		.then((response)=>{
//			console.log(response);
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

//			console.log(this.cinemasArr)
		})
		.catch((error)=>{
			console.log(error);
		})
		
	},
	methods:{
		toggle(index){		
			if(!this.cinemasArr[index].show){
				this.cinemasArr[index].show = true;
			}else{
				this.cinemasArr[index].show = false;
			}
			
		}
	}
	
}
	
</script>

<style>
	.theatre .theatrelist{
		width: 100%;
		background: white;
		overflow: auto;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	.theatre .all_title{
		width: 100%;
		height: 1.15rem;
		border-bottom: 0.02rem solid #e0e0e0;
		line-height: 1.15rem;
		font-size: 0.36rem;
		
	}
	.theatre .all_title:before{
		content: '';
		width: 100%;
		height: 0.01rem;
		position: absolute;
		left: 0;
		top: -0.01rem;
		border-top: 0.01rem solid #b3b2b3;
		transform: scaleY(0.5); 
	}
	
	.theatre .all_title span{
		padding-left: 0.4rem;
	}
	.theatre .list_li .district{
		width: 100%;
		height: 1.15rem;
		background: #2bb8d4;
		line-height: 1.15rem;
		color: white;
	}
	.theatre .list_li .district span{
		padding-left: 0.5rem;
	}
	.theatre .list_li ul li{
		width: 90%;
		position: relative;
		padding: 0 0.47rem;
	}
	
	.theatre .list_li ul li:after{
		content: '';
		width: 100%;
		height: 0.01rem;
		border-bottom: 0.01rem dashed gray;
		position: absolute;
		left: 0;
		bottom: 0;
		transform: scaleY(0.5);
	}
	
	.theatre .list_li ul li .address_price{
		line-height: 0.9rem;
		display: flex;
		justify-content: space-between;
	}
	.theatre .list_li ul li .address_price .name{
		display: inline-block;
		font-size: 0.45rem;
		color: black;
		width: 70%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.theatre .list_li ul li .address_price .price{
		color: #e46e2c;
		font-size: 0.4rem;
	}
	.theatre .activity span{
		margin: 0 0.4rem 0 0;
	}
	.theatre .activity span.SUNDRY{
		display: inline-block;
		color: white;
		font-size: 0.27rem;
		background: #69abcb;
		border-radius: 0.08rem;
		padding: 0.1rem 0.24rem;
		
	}
	.theatre .activity span.DISCOUNT{
		display: inline-block;
		color: white;
		font-size: 0.27rem;
		background: #ee7e78;
		border-radius: 0.08rem;
		padding: 0.1rem 0.24rem;
	}
	
	.theatre .activity span.REFUNDABLE_SEAT_TICKET{
		display: inline-block;
		color: white;
		font-size: 0.27rem;
		background: limegreen;
		border-radius: 0.08rem;
		padding: 0.1rem 0.24rem;
	}
	
	.theatre .list_li ul li .address{
		width: 70%;
		font-size: 0.32rem;
		color: #b7b7b7;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 0.9rem;
	}
	.theatre .list_li ul li .info{
		font-size: 0.32rem;
		color: #b7b7b7;
		padding-bottom: 0.3rem;
	}
	
</style>