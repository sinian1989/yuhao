<template>
	<div>
		123123121
	</div>
</template>

<script>
	import { getInfo } from '@/api/user';
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			getInfo(){
				getInfo().then(res=>{
					console.log(res)
				})
			}
		},
		mounted() {
			this.getInfo()
		}
	}
</script>

<style>
</style>
