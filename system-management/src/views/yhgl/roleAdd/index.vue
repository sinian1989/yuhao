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
			class="abow_dialog1"
		>
			<div class="form clearfix">
				<el-form ref="form" :model="form" :rules="form_rules" :label-width="dialog.formLabelWidth" style="margin:10px;width:auto;">
					<el-form-item prop="loginId" label="登录名:">
						<el-input type="text" v-model="form.loginId" placeholder="请输入登录名" style="width: 500px;"></el-input>
					</el-form-item>
					<el-form-item prop="password" label="密码:">
						<el-input type="text" v-model="form.password" placeholder="请输入密码" style="width: 500px;"></el-input>
					</el-form-item>
					<el-form-item prop="mobile" label="手机号码:">
						<el-input type="text" v-model="form.mobile" placeholder="手机号码" style="width: 500px;"></el-input>
					</el-form-item>
					<el-input type="text" v-model="form.ognztId" placeholder="id" style="width: 500px;" v-show="false"></el-input>
					<el-form-item class="text_right"><el-button type="primary" @click="onSubmit('form')" style="float: right;">提 交</el-button></el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import {ognztUpdate} from '../../../api/tableList.js';
import { MessageBox, Message } from 'element-ui';

export default {
	data() {
		var validatorPhone = function (rule, value, callback) {
		      if (value === '') {
		        callback(new Error('手机号不能为空'))
		      } else if (!/^1\d{10}$/.test(value)) {
		        callback(new Error('手机号格式错误'))
		      } else {
		        callback()
		      }
		    }
		return {
			value: '',
			isVisible: this.isShow,
			form: {
				loginId: '',
				password: '',
				mobile: '',
				ognztId: '',
			},
			strCheckList: '',
			flag: false,
			//详情弹框信息
			dialog: {
				width: '400px',
				formLabelWidth: '120px'
			},
			checkboxList: [],
			form_rules: {
				loginId: [{ required: true, message: '登录名不能为空！', trigger: 'blur' }],
				password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
				mobile:[{ required: true,validator:validatorPhone, trigger: 'blur' }]
			}
		};
	},
	props: {
		isShow: Boolean,
		dialogRow: Object
	},
	computed: {
		...mapGetters('list', ['addFundDialog'])
	},
	methods: {
		//获取列表

		closeDialog() {
			this.$emit('closeDialog');
		},
		
		onSubmit(form) {
			this.$refs[form].validate(valid => {
				if (valid) {
					//表单数据验证完成之后，提交数据;
					let formData = this[form];
					// edit
					if (this.addFundDialog.type === 'edit') {
						const paras = Object.assign({}, formData);
						console.log(paras);

						console.log();
						updateDztz(paras).then(res => {
							this.$message({
								message: res.message,
								type: 'success'
							});
							this.$refs['form'].resetFields();
							this.isVisible = false;
							this.$parent.getDatzList();
						});
					} else {
						this.form.ognztId = sessionStorage.getItem('id')
						const para = Object.assign({}, formData);
						console.log(para);
						ognztUpdate(this.$qs.stringify(para)).then(res => {
							console.log(res);
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.$refs['form'].resetFields();
							this.isVisible = false;
							this.$parent.getDatzList();
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
		
	}
};
</script>

<style scoped>
.abow_dialog1 {
	display: flex;
	justify-content: center;
	align-items: Center;
	overflow: hidden;
}
.abow_dialog1 .el-dialog {
	margin: 0 auto !important;
	height: 90%;
	overflow: hidden;
}
.abow_dialog1 .el-dialog__body {
	position: absolute;
	left: 0;
	top: 54px;
	bottom: 0;
	right: 0;
	padding: 0;
	z-index: 1;
	overflow: hidden;
	overflow-y: auto;
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
