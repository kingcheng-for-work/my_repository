<template>
  <div id="app">
    <router-view></router-view>
    
    <nav class="tabs">
    	<router-link v-for="(item, index) in tabs" :to="item.path" @click.native="changeStyle(index)" :class="{active:item.active}">
    		
    		<div class="nav_box">
    			<em :class="item.icon"></em>
    			<span v-show="item.tabShow">{{item.title}}</span>
    		</div>
    		
    	</router-link>
    </nav>
  </div>
</template>

<script>
	
export default {
  name: 'app',
  data(){
  	return {
  		tabs:[
  			{title:'电影', path:'/movie', icon:"iconfont icon-dianying", tabShow:false, active:true},
  			{title:'影院', path:'/cinema', icon:"iconfont icon-tabbaryingyuana", tabShow:true, active:false},
  			{title:'演出', path:'/show', icon:"iconfont icon-maikefenghuatong", tabShow:true, active:false},
  			{title:'商城', path:'/shopmall', icon:"iconfont icon-shangcheng", tabShow:true, active:false},
  			{title:'我的', path:'/mine', icon:"iconfont icon-wode", tabShow:true, active:false}
  		]
  	}
  },
  methods:{
  	changeStyle(index){
  		
			if(this.tabs[0].active){
				this.tabs[0].active = false;
			}
	  		
  		for(var i=0; i<this.tabs.length; i++){
  			if(i == index){
  				this.tabs[index].tabShow = false;
  			}else{
  				this.tabs[i].tabShow = true;
  			}
  		}
  		
  	}
  }
}
</script>

<style>
	.tabs{
		width: 100%;
		height: 1.47rem;
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
	}
	.tabs:before{
		content: '';
		display: block;
		width: 100%;
		height: 0.01rem;
		border-top: 0.01rem solid #000;
		position: absolute;
		left: 0;
		top: -0.01rem;
		transform: scaleY(0.5);
	}
	.tabs a{
		flex: 1;
		text-align: center;
		background: white;
		color: #2C3E50;
		text-decoration: none;
		font-size: 0.28rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tabs .nav_box{
		display: flex;
		flex-direction: column;
	}
	.tabs .nav_box em.iconfont{
		font-size: 0.55rem;
		padding-bottom: 0.1rem;
	}
	.tabs a.router-link-active em{
		color: #ff5000;
		border-bottom: 0.1rem solid #ff5000;
		border-radius: 0.05rem;
		transform: scale(1.5);
		
	}
	.tabs a.active em{
		color: #ff5000;
		border-bottom: 0.1rem solid #ff5000;
		border-radius: 0.05rem;
		transform: scale(1.5);
	}
	
</style>
