<template>
	<div style="height: 100%;">
		<div class="title">用户管理</div>
		<div class="role_content">
			
			<div class="table_container clearfix">
				<add @showDialog="showAddFundDialog" class="tj"></add>
				<div style="margin-bottom: 20px;" class="clearfix">
					<el-button type="primary" style="margin-top: 0; margin-left: 20px; float: right;" @click="getDatzList">搜索</el-button>
					<el-input v-model="incomePayData.cph" placeholder="请输入车牌号" :clearable="true" class="cph"></el-input>
				</div>
				<el-table v-loading="loading" :data="tableData" style="width: 100%;" align="center" border>
					<el-table-column prop="cph" label="车牌号" align="center"></el-table-column>
		
					<el-table-column prop="hdzzl" label="核定载合量" align="center"></el-table-column>
		
					<el-table-column prop="operation" align="center" label="操作" width="190">
						<template slot-scope="scope">
							<el-button type="warning" icon="edit" size="mini" @click="onEditMoney(scope.row)">编辑</el-button>
							<el-button type="danger" icon="delete" size="mini" @click="deleteDzta(scope.row, scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
				<addFundDialog v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow" @closeDialog="hideAddFundDialog"></addFundDialog>
			</div>
		</div>
	</div>
	
</template>

<script>
import { getChildrenOgnztList } from '../../api/tableList.js';
import { getOgnztTreeDto } from '../../api/tree.js';
import AddFundDialog from '@views/yhgl/roleAdd/index';
import Add from '@components/add/add';
import Pagination from '@/components/pagination';
export default {
	name: 'yhgl',
	data() {
		return {
			filterText: '',
			currentNodeKey: '',
			activeName: 'jggl',
			pageTotal: 0,
			loading: true,
			isShow: false,
			addFundDialog: {
				show: false,
				dialogRow: {}
			},
			incomePayData: {
				page: 0,
				limit: 10,
				id: ''
			},
			tableData: [
				{
					cpys: '',
					jccsj: '123',
					zp: '132',
					cph: '123',
					zcrq: '13',
					clsbdh: '213',
					fdjh: '213',
					pfjd: '123',
					scqd: '213',
					xsz: '123',
					yshwmc: '123',
					ysl: '312',
					cdmc: '213',
					rlzl: '213'
				}
			],
			data: [],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		};
	},
	components: {
		AddFundDialog,
		Pagination,
		Add
	},
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		},
		currentNodeKey(val) {
			console.log(val);
		}
	},
	methods: {
		//获取列表
		getDatzList() {
			const para = Object.assign({}, this.incomePayData);
			getChildrenOgnztList(para).then(res => {
				console.log(res);
				this.loading = false;
				this.pageTotal = res.obj.pageSize;
				this.tableData = res.obj.data;
			});
		},
		//弹框显示
		showAddFundDialog(val) {
			this.$store.commit('list/SET_DIALOG_TITLE', val);
			this.addFundDialog.show = true;
		},
		//编辑
		onEditMoney(row) {
			console.log({ ...row });
			this.addFundDialog.dialogRow = { ...row };
			this.showAddFundDialog();
		},
		// 上下分页
		handleCurrentChange(val) {
			this.incomePayData.page = val;
			this.getDatzList();
		},
		// 每页显示多少条
		handleSizeChange(val) {
			this.incomePayData.limit = val;
			this.getDatzList();
		},
		deleteDzta(row, index) {
			console.log(index);
			this.$confirm('确认删除记录吗?', '提示', {
				type: 'warning'
			})
				.then(() => {
					console.log(row, index);
					deleteDzta({ id: row.id }).then(res => {
						console.log(res);
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getDatzList();
					});
				})
				.catch(() => {});
		},
		hideAddFundDialog() {
			this.addFundDialog.show = false;
		},

		handleClick(tab, event) {
			console.log(tab, event);
		}
	},
	mounted() {
		this.getDatzList();
	}
};
</script>

<style scoped>
.title {
	font-size: 20px;
	color: #333;
}
.left_content {
	width: 20%;
	height: 95%;
	overflow: hidden;
	overflow-y: auto;
	background: #fff;
	margin-top: 10px;
	border-radius: 5px;
	float: left;
}
.left_content .el-input {
	width: 95%;
	margin: auto;
	margin-bottom: 20px !important;
	margin-top: 10px !important;
	display: block;
}
.right_content {
	float: left;
	margin-left: 20px;
	width: 78%;
	background: #fff;
	height: 95%;
	margin-top: 10px;
	border-radius: 5px;
}
.cph {
	width: 200px;
	float: right;
}
.tj {
	float: left;
}
.role_content{
	height: 93%;
	background: #fff;
	margin-top: 10px;
	padding: 20px;
}
</style>
