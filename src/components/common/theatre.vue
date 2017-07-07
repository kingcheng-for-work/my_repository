<template>
	<transition name="slide">
		<div class="theatre">
			<div class="theatre_title">
				<span class="back" @click="goBack()"><</span>
				<div class="title_name">{{data}}</div>
			</div>
			<theatrelist></theatrelist>
			
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue'
	import theatrelist from '@/components/common/theatrelist.vue'
	import router from '../../router'
	
export default{
	name:'theatre',
	data(){
		return{
			
		}
	},
	created(){
		
	},
	methods:{
		goBack(){
			router.go(-1);
		}
	},
	components:{
		theatrelist
	},
	props:['data']
	
}
	
</script>

<style>
	.theatre{
		width: 100%;
		height: 100%;
		background: white;
		position: relative;
		z-index: 12;
		font-size: 0.4rem;
	}
	.theatre .theatre_title{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 1.35rem;
		line-height: 1.35rem;
		background: white;
		text-align: center;
	}
	.theatre .theatre_title span{
		position: absolute;
		left: 0.78rem;
		font-size: 0.45rem;
		color: #2bb8d4;
	}
	.theatre .theatre_title .title_name{
		display: inline-block;
		color: #7f7f7f;
	}
	.theatre .theatrelist{
		top: 1.35rem;
	}
	
</style>