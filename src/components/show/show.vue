<template>
	<div class="show">
		<div class="show_head"><span>演出票务</span></div>
        <div class="show_con">
            <div class="s_c_c" v-for="(show,index) in showData" @click="goShowDet(index)">
                <div class="s_c_c_img">
                    <img :src='show.skuList[0].image' />
                </div>
                <p>{{show.masterName}}</p>
            </div>
            <div class="not">没有更多啦</div>
        </div>
        <router-view></router-view>
	</div>

</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import api from '../../../common/api'
	
	export default{
		name : 'show',
		data(){
			return{
				pageSize : 6,
	            pageNumber : 1,
	            showData : []
			}
		},
		methods:{
			goShowDet(index){
				 for(var i=0; i<this.showData.length; i++){
	                if( i == index){
	                    // console.log(this.$router);
	                    this.$router.push('/show/schedule/'+this.showData[i].id)
	                }
	            }
			}
		},
		created(){
	        this.$http.get(api.showApi+'&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber+'&sortKey=sortSalesCount&sortType=desc&isMultiSku=1')
	        .then((response)=>{
	        	console.log(response);
	            this.showData = response.data.data.list
	        })
	        .catch((error)=>{
	        	console.log(error)
	        })
    	}
	}	
	
</script>

<style>
	.show{
		background:#f2f2f2;
		height:100%;
		width:100%;
	}
	.show_head{
        height:1.47rem;
        line-height:1.47rem;
        width:100%;
        position:absolute;
        background:#fff;
        top:0;
        left:0;
    }
    .show_head:after{
        position:absolute;
        content:'';
        height:1px;
        width:100%;
        border-bottom:1px solid #e0e0e0;
        left:0;
        bottom:-1px;
        z-index:1;
        transform:scaleY(0.5);
    }
    .show_head span{
        color:#595959;
        font-size:0.5rem;
        margin-left:0.49rem;
    }
    .show_con{
        width:100%;
        position:absolute;
        left:0;
        top:1.47rem;
        bottom:1.48rem;
        overflow:auto;
    }
    .show_con .s_c_c{
        margin-bottom:0.15rem;
        padding:0.3rem 0.3rem 0.94rem 0.3rem;
        background:#fff;
    }
    .show_con .s_c_c_img{
        height:5.1rem;
    }
    .show_con .s_c_c .s_c_c_img img{
        width:100%;
        height:100%;
    }
    .show_con .s_c_c p{
        margin-top: 0.21rem;
        font-size:0.5rem;
        line-height:0.6rem;
    }
    .show_con .not{
        color: rgba(150, 144, 144, 0.4);
        text-align: center;
        font-size: 0.3rem;
        padding: 0.7rem 0 1rem 0;
    }
</style>