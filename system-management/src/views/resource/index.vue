<template>
	<div>321</div>
</template>

<script>
	import {findListByRoleId} from '../../api/menuList.js'
	
	export default {
		name: 'organization',
		data() {
			return {
				
			};
		},
		watch: {
			
		},
		methods: {
			findListByRoleId(){
				findListByRoleId().then(res=>{
					console.log(res)
					this.$store.commit('user/SET_MENU', res.data.topList);
					sessionStorage.setItem('menuList',res.data.topList)
				})
			}
		},
		mounted() {
			this.findListByRoleId()
		}
	};
</script>

<style>
</style>
