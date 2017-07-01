<template>
	<div class="cinema">
		<div class="search_title">
			<div class="location">
				<span class="iconfont icon-dingwei">{{address}}</span>
				<span class="address"></span>
			</div>
			
		</div>
	</div>

</template>

<script>
	import api from '../../../common/api.js'
	export default{
		name : 'cinema',
		data(){
			return{
				address:''
			}
		},
		created(){
			
		}
	}
	
</script>

<style>
	
	
</style>