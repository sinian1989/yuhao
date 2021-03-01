<template>
	<div class="box_content clearfix">
		<el-dialog
			:visible.sync="isVisible"
			:title="addFundDialog.title"
			:close-on-click-modal="false"
			:close-on-press-escape="true"
			:modal-append-to-body="false"
			@close="closeDialog"
			top="0"
			class="abow_dialog2"
		>
			<div class="form clearfix">
				<el-form ref="form" :model="form" :rules="form_rules" :label-width="dialog.formLabelWidth" style="margin:10px;width:auto;">
					<el-form-item prop="area" label="行政编码:" >
						<el-select v-model="form.area" clearable placeholder="请选择行政编码" style="width: 500px;">
							<el-option v-for="(item, index) in options" :key="index" :label="item.regionName" :value="item.regionCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="name" label="组织机构:"><el-input type="text" v-model="form.name" placeholder="请输入组织机构" style="width: 500px;"></el-input></el-form-item>
					<el-input type="text" v-model="form.id" placeholder="请输入组织机构" style="width: 210px;" v-show="false"></el-input>
					<el-form-item class="text_right"><el-button type="primary" @click="onSubmit('form')" style="float: right;">提 交</el-button></el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getChildArea, update } from '@/api/tableList';
import { MessageBox, Message } from 'element-ui';

export default {
	data() {
		return {
			value: '',
			isVisible: this.isShow,
			hasFmt: false,
			hasFmt1: false,
			hasFmt2: false,
			form: {
				name: '',
				area: '',
				parentId: '',
				id: ''
			},

			options: [],
			strCheckList: '',
			// checkList:[],
			flag: false,
			//详情弹框信息
			dialog: {
				width: '400px',
				formLabelWidth: '120px'
			},
			checkboxList: [],
			form_rules: {
				name: [{ required: true, message: '必填项！', trigger: 'blur' }],
				area: [{ required: true, message: '请选择！', trigger: 'change' }]
			}
		};
	},
	props: {
		isShow: Boolean,
		dialogRow: Object
	},
	computed: {
		...mapGetters('list',['addFundDialog'])
		// console.log(this.$store.state.addFundDialog)
	},
	methods: {
		closeDialog() {
			this.$emit('closeDialog');
		},
		getChildArea() {
			getChildArea({ id: sessionStorage.getItem('id') }).then(res => {
				console.log(res);
				this.options = res.data;
			});
		},
		childMethod() {},
		onSubmit(form) { 
			this.$refs[form].validate(valid => {
				if (valid) {
					//表单数据验证完成之后，提交数据;
					let formData = this[form];
					console.log(form)
					// edit
					if (this.addFundDialog.type == 'edit') {
						
						formData.parentId = sessionStorage.getItem('id');
						formData.id = this.dialogRow.id;
						const paras = Object.assign({}, formData);
						update(this.$qs.stringify(paras)).then(res => {
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.$refs['form'].resetFields();
							this.isVisible = false;
							this.$emit('getlist');
							this.$emit('getOgnztTreeDto');
						});
					} else {
						this.form.id = '';
						this.form.parentId = sessionStorage.getItem('id');
						const para = Object.assign({}, formData);

						update(this.$qs.stringify(para)).then(res => {
							console.log(res);
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.$refs['form'].resetFields();
							this.isVisible = false;
							console.log(this.$parent);
							this.$emit('getlist');
							this.$emit('getOgnztTreeDto');
						});
					}
				}
			});
		}
	},
	mounted() {
		if (this.addFundDialog.type === 'edit') {
			this.form = this.dialogRow;
			console.log(this.dialogRow);
		} else {
			this.$nextTick(() => {
				this.$refs['form'].resetFields();
			});
		}
		
		this.getChildArea();
		// this.getDeptList()
	}
};
</script>

<style scoped>
.abow_dialog2 {
	display: flex;
	justify-content: center;
	align-items: Center;
	overflow: hidden;
}
.abow_dialog2 .el-dialog {
	margin: 0 auto !important;
	height: 50%;
	overflow: hidden;
}
.abow_dialog2 .el-dialog__body {
	position: absolute;
	left: 0;
	top: 54px;
	bottom: 0;
	right: 0;
	padding: 0;
	z-index: 1;
	overflow: hidden;
	overflow-y: auto;
	padding-top: 0;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}

.avatar {
	width: 178px;
	height: 178px;
	display: block;
}

.abow_dialog {
	display: flex;
	justify-content: center;
	align-items: Center;
	overflow: hidden;
}

.el-form-item {
	float: initial;
	width: 50%;
}

.text_right {
	float: right;
	width: 100%;
}

.avatar-uploader-icon {
	border: 1px solid #ccc;
}
</style>
