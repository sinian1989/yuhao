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
					<el-form-item class="text_right"><el-button type="primary" @click="onSubmit('form')" style="float: right;">提 交</el-button></el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// import {getDatzList, addDztz, updateDztz, getCarInforBycph} from '@/api/car';
import { MessageBox, Message } from 'element-ui';

export default {
	data() {
		var valiIcon = (rule, value, callback) => {
			// 图片验证
			if (!this.hasFmt) {
				console.log(1);
				callback(new Error('请上传c车辆照片'));
			} else {
				console.log(2);
				callback();
			}
		};
		var valiIcon1 = (rule, value, callback) => {
			// 图片验证
			if (!this.hasFmt1) {
				console.log(1);
				callback(new Error('请上传随车清单'));
			} else {
				console.log(2);
				callback();
			}
		};
		var valiIcon2 = (rule, value, callback) => {
			// 图片验证
			if (!this.hasFmt2) {
				console.log(1);
				callback(new Error('请上传行驶证照片'));
			} else {
				console.log(2);
				callback();
			}
		};
		return {
			actionUrl: '',
			fileList: [],
			fileList0: [],
			fileList1: [],
			imageUrl: '',
			imageUrl1: '',
			imageUrl2: '',
			value: '',
			isVisible: this.isShow,
			hasFmt: false,
			hasFmt1: false,
			hasFmt2: false,
			form: {
				zp: '',
				cph: '',
				zcrq: '',
				cpys: '',
				clsbdh: '',
				fdjh: '',
				pfjd: '',
				rlzl: '',
				yshwmc: '',
				ysl: '',
				cdmc: '',
				scqd: '',
				hdzzl: '',
				cllx: '',
				xsz: '',
				sjly: '',
				shzt: '',
				shyj: ''
			},
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
				cph: [{ required: true, message: '必填项！', trigger: 'blur' }],
				cpys: [{ required: true, message: '必填项！', trigger: 'blur' }],
				zcrq: [{ required: true, message: '必填项！', trigger: 'change' }],
				clsbdh: [{ required: true, message: '必填项！', trigger: 'blur' }],
				fdjh: [{ required: true, message: '必填项！', trigger: 'blur' }],
				pfjd: [{ required: true, message: '必填项！', trigger: 'blur' }],
				yshwmc: [{ required: true, message: '必填项！', trigger: 'blur' }],
				ysl: [{ required: true, message: '必填项！', trigger: 'blur' }],
				cdmc: [{ required: true, message: '必填项！', trigger: 'blur' }],

				hasFmt: [{ required: true, validator: valiIcon, trigger: 'change' }],
				hasFmt1: [{ required: true, validator: valiIcon1, trigger: 'change' }],
				hasFmt2: [{ required: true, validator: valiIcon2, trigger: 'change' }]
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
		getCarInforBycph() {
			if (this.form.cph) {
				getCarInforBycph(this.form.cph).then(res => {
					this.loading = false;
					//清除缓存数据
					this.form = {};
					this.form = res.obj;
					if (res.obj.sjly && res.obj.sjly == '1') {
						Message({
							message: '未查询到车辆基本数据，请核对并重新填写数据',
							type: 'success'
						});
					}
				});
			} else {
				Message({
					message: '请先输入将要查询的车牌号码',
					type: 'error'
				});
			}
		},
		handleAvatarSuccess(res, file) {
			console.log(file);
			this.imageUrl = URL.createObjectURL(file.raw);
			if (res.code == 200) {
				this.hasFmt = true;
				this.form.zp = res.obj;
			} else {
				Message({
					message: res.message,
					type: 'error'
				});
				this.hasFmt = false;
			}
		},
		handleAvatarSuccess1(res, file) {
			this.imageUrl1 = URL.createObjectURL(file.raw);
			if (res.code == 200) {
				this.hasFmt1 = true;
				this.form.scqd = res.obj;
			} else {
				Message({
					message: res.message,
					type: 'error'
				});
				this.hasFmt1 = false;
			}
		},
		handleAvatarSuccess2(res, file) {
			this.imageUrl2 = URL.createObjectURL(file.raw);
			if (res.code == 200) {
				this.hasFmt2 = true;
				this.form.xsz = res.obj;
			} else {
				Message({
					message: res.message,
					type: 'error'
				});
				this.hasFmt = false;
			}
		},

		closeDialog() {
			this.$emit('closeDialog');
		},
		test() {
			this.strCheckList = this.form.deptId.toString();
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
						const para = Object.assign({}, formData);

						console.log(para);
						addDztz(para).then(res => {
							console.log(res);
							this.$message({
								message: res.message,
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
		//       getDeptList(){
		//         getDeptList().then(res=>{
		//           this.checkboxList = res.data;
		//
		//         })
		//       }
	},
	mounted() {
		if (this.addFundDialog.type === 'edit') {
			this.form = this.dialogRow;
			console.log(this.dialogRow);
			// console.log("=111111111111111111111111111111")
			// let name = this.dialogRow.scqd;
			// let names = name.split('/')[2];
			//
			// let name1 = this.dialogRow.zp;
			// let names1 = name.split('/')[2];
			//
			// let name2 = this.dialogRow.xsz;
			// let names2 = name.split('/')[2];
			// this.fileList = [{name: names, url: 'http://192.168.0.86:8099/mj' + this.dialogRow.scqd}];
			// this.fileList0 = [{name: names1, url: 'http://192.168.0.86:8099/mj' + this.dialogRow.zp}];
			// this.fileList1 = [{name: names2, url: 'http://192.168.0.86:8099/mj' + this.dialogRow.xsz}];

			this.imageUrl = 'http://192.168.0.86:8099/mj' + this.dialogRow.zp;
			this.imageUrl1 = 'http://192.168.0.86:8099/mj' + this.dialogRow.scqd;
			this.imageUrl2 = 'http://192.168.0.86:8099/mj' + this.dialogRow.xsz;

			this.hasFmt = true;
			this.hasFmt1 = true;
			this.hasFmt2 = true;
			// console.log(this.form.zp);
			// if (this.hasFmt) {
			// }
		} else {
			this.$nextTick(() => {
				this.$refs['form'].resetFields();
			});
		}
		// this.getDeptList()
	}
};
</script>

<style >
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
	float: left;
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
