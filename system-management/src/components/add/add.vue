<template>
	<div>
		<el-button type="primary" class="btn" icon="view" @click="onAddMoney()">添加</el-button>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			onAddMoney() {
				this.$emit('showDialog', 'add');
			},
		}
	}
</script>

<style scoped>
	.btn{
		 margin-bottom: 20px;
	}
</style>
