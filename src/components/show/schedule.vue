<template>
    <transition name="slide">
        <div id="schedule">
            <div class="s_head"><span @click="goBack"><</span>卖座·HOPPA演出</div>
            <div class="s_con">
            <div class="s_c_t">
                <div>
                    <dl>
                        <dt><img :src="cover" /></dt>
                        <dd>
                            <p>{{scheduleData.masterName}}</p>
                            <div>
                                <p v-for="str in strName">{{str}}</p>
                            </div>
                        </dd>
                    </dl>  
                </div>
            </div>
            <div class="s_c_b">
                <div v-html="description"></div>
            </div>
            </div>
            <div class="s_foo">
              	  下一步
            </div>
        </div>
    </transition>    
</template>

<script>
import api from '../../../common/api'
export default {
	name:'schedule',
    data(){
        return{
            id : this.$route.params.id,
            scheduleData : {},
            slaveName : null,
            strName : [],
            description : null
        }    
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    },
    computed:{
    },
    created(){
        this.$http.get(api.scheduleApi+this.id)
        .then((response)=>{
            this.scheduleData = response.data.data
            this.slaveName = this.scheduleData.slaveName
            this.strName = this.slaveName.split('|')
        })

        this.$http.get(api.descriptionApi+this.id+'/description?__t=1499259953771')
        .then((response)=>{
            this.description = response.data.data.desc
        })
    },
    computed:{
    	cover(){
    		if(this.scheduleData.skuList){
    			return this.scheduleData.skuList[0].images[1]
    		}
    	}
    }
}
</script>

<style>
    #schedule{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        background:#f2f2f2;
        z-index:10;
    }
    #schedule .s_head{
        height:1.47rem;
        line-height:1.47rem;
        position:absolute;
        left:0;
        top:0;
        width:100%;
        text-align:center;
        font-size:0.35rem;
        color:#595959;
        background:#fff;
    }
    #schedule .s_head:after{
        content:'';
        width:100%;
        height:1px;
        border-top:1px solid #e0e0e0;
        position:absolute;
        left:0;
        bottom:-1px;
        transform:scaleY(0.5);
    }
    #schedule .s_head span{
        font-size:0.47rem;
        color:#21b5d3;
        font-family:'宋体';
        font-weight:700;
        position:absolute;
        left:0.5rem;
    }

    #schedule .s_con{
        position: absolute;
        left: 0;
        top: 1.47rem;
        width: 100%;
        bottom:1.48rem;
        overflow:auto;
    }
    #schedule .s_con .s_c_t{
        padding:0 0.3rem 0.48rem 0.3rem;   
        background:#fff;
        margin-bottom:0.3rem;     
    }
    #schedule .s_con .s_c_t dl{
        display:flex;
    }
    #schedule .s_con .s_c_t dl dt{
        width:2.88rem;
        height:4.17rem;
        margin-right:0.22rem;
    }
    #schedule .s_con .s_c_t dl dt img{
        height:100%;
        width:100%;
    }
    #schedule .s_con .s_c_t dl dd{
        flex:1;
    }
    #schedule .s_con .s_c_t dl dd p:nth-child(1){
        font-size:0.43rem;
        line-height:0.66rem;
    }
    #schedule .s_con .s_c_t dl dd div:nth-child(2){
        margin:0.34rem 0 0.43rem 0;
    }
    #schedule .s_con .s_c_t dl dd div:nth-child(2) p{
        font-size:0.31rem;
        color:#757575;
        line-height:0.53rem;
    }  
    #schedule .s_con .s_c_b div img{
        height:100%;
        width:100% !important;
    } 
    #schedule .s_foo{
        height:1.48rem;
        width:100%;
        position:absolute;
        left:0;
        bottom:0;
        background:#ff5000;
        font-size:0.52rem;
        color:#fff;
        text-align:center;
        line-height:1.48rem;
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






















































