<template>
	<div class="login-container">
		<div class="loginWraper">
			<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
				<div class="title-container"><div class="title">xxxxxx</div></div>
				<div class="left_login"></div>
				<div class="right_login">
					<el-form-item prop="username">
						<span class="svg-container"><svg-icon icon-class="user" style="color: #1D86E1;" /></span>
						<el-input ref="username" v-model="loginForm.username" placeholder="用户名" type="text" tabindex="1" />
						<input type="password" style="display:none" />
					</el-form-item>

					<el-form-item prop="password">
						<span class="svg-container"><svg-icon icon-class="password" style="color: #1D86E1;" /></span>
						<el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" tabindex="2" @keyup.enter.native="handleLogin" />
						<input type="password" style="display:none" />
					</el-form-item>
					<el-form-item prop="seccode" class="inputbar">
						<span class="svg-container"><svg-icon icon-class="yanzhengma" style="color: #1D86E1;" /></span>
						<el-input class="log-input" v-model="loginForm.seccode" placeholder="验证码" prefix-icon="icon-login_auth" style="padding-left: 0px;"></el-input>
						<span class="checkCode" @click="createCode">{{ checkCode }}</span>
					</el-form-item>
					<el-button
						:loading="loading"
						type="primary"
						style="width:100%;margin-bottom:30px; width: 350px; margin: auto; display: block; margin-top: 40px;"
						@click.native.prevent="handleLogin"
					>
						登录
					</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
import { validUsername } from '@/utils/validate';
import { setToken } from '@/utils/auth';
import { login } from '@/api/user';
import imgs from '@assets/caed_bg.png';
import qs from 'qs';
// import md5 from 'js-md5';
export default {
	name: 'Login',
	data() {
		return {
			loginForm: {
				username: '',
				password: '',
				seccode: ''
			},
			checkCode: '',
			loginRules: {
				username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
				password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
				seccode: [{ required: true, message: '请输验证码', trigger: 'blur' }]
			},
			arr:[
				{
					path: '/emphasis',
					type: 'home',
					name: 'home',
					redirect: '/dashboard',
					children: [{
							path: '/mySet1',
							components: {
								
							},
							name: '我的设置',
							iconCls: 'el-icon-menu',
							menuShow: true,
							children: [{
									path: '/mySet1/plan',
									
									name: '行程计划',
									menuShow: true,
								},
								{
									path: '/mySet1/mission',
									
									name: '我的任务',
									menuShow: true
								},
								{
									path: '/mySet1/maillist',
									
									name: '通讯录',
									menuShow: true
								}
							]
						},


					]
				},
			],
			loading: false,
			passwordType: 'password',
			redirect: undefined,
			imgs: imgs,
			listMenu: [
				{
					path: '/emphasis',
					redirect: '/emphasis',
					meta: { title: '重点企业分布', icon: 'el-icon-place' },
					children: [
						{
							path: 'emphasis',
							name: '重点企业分布',
							meta: { title: '重点企业分布', icon: 'el-icon-place' }
						}
					]
				}
			]
		};
	},
	watch: {
		// $route: {
		// 	handler: function(route) {
		// 		this.redirect = route.query && route.query.redirect;
		// 	},
		// 	immediate: true
		// }
	},
	methods: {
		createCode() {
			let code = '';
			const codeLength = 4; //验证码的长度
			const random = new Array(
				0,
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				'A',
				'B',
				'C',
				'D',
				'E',
				'F',
				'G',
				'H',
				'I',
				'J',
				'K',
				'L',
				'M',
				'N',
				'O',
				'P',
				'Q',
				'R',
				'S',
				'T',
				'U',
				'V',
				'W',
				'X',
				'Y',
				'Z'
			); //随机数
			for (let i = 0; i < codeLength; i++) {
				//循环操作
				let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
				code += random[index]; //根据索引取得随机数加到code上
			}
			console.log(code);
			this.checkCode = code; //把code值赋给验证码
		},
		showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = '';
			} else {
				this.passwordType = 'password';
			}
			this.$nextTick(() => {
				this.$refs.password.focus();
			});
		},
		login() {
			this.$store.commit('user/SET_NAME', this.loginForm.username);
			sessionStorage.setItem('username', this.loginForm.username);
			sessionStorage.setItem('Token','1')
			setToken('Token', '1');
			this.$router.push({ path: '/' });
			return
			let userinfo = qs.stringify({
				username: this.loginForm.username,
				password: this.loginForm.password
			});
			login(userinfo).then(res => {
				console.log(res)

				if (res.code ==10000) {
					this.$store.commit('user/SET_NAME', this.loginForm.username);
					sessionStorage.setItem('username', this.loginForm.username);
					sessionStorage.setItem('Token',res.data.access_token)
					setToken('Token', res.data.access_token);
					this.$router.push({ path: '/' });

				} else {
					this.createCode();
					this.loginForm.seccode = '';
					return false;
				}
			});
		},
		handleLogin() {
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					if (this.loginForm.seccode == this.checkCode) {
						this.login();
					} else {
						this.$message({
							message: '验证码错误，注意大写字母',
							type: 'warning'
						});
						this.createCode();
						this.loginForm.seccode = '';
					}
				} else {
					this.$message({
						message: '登录失败',
						type: 'warning'
					});
					return false;
				}
			});
		}
	},
	mounted() {
		this.createCode();
	}
};
</script>

<style lang="scss">
.login-container {
	.el-input {
		display: inline-block;
		height: 47px;
		width: 70%;
	}
	.el-input__inner {
		border: none;
		padding-left: 14px;
	}
	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
		width: 360px;
		margin: auto;
		margin-top: 20px;
	}
	input:-webkit-autofill,
	textarea:-webkit-autofill,
	select:-webkit-autofill {
		-webkit-text-fill-color: #333 !important;
		-webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
		background-color: transparent;
		background-image: none;
		transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
	}
	input {
		background-color: transparent;
		color: #333;
	}
	.right_login {
		float: left;
		margin-left: 5%;
		margin-top: 12%;
	}
	.left_login {
		margin-left: 5%;
	}
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container .el-form-item {
	background-color: #fff;
	border: 1px solid #d8d8d8;
	border-radius: 4px;
}
.checkCode {
	cursor: pointer;
	color: #333;
	font-size: 18px;
}
.login-container {
	min-height: 100%;
	width: 100%;

	overflow: hidden;
	user-select: none;
	.login-form {
		position: relative;

		max-width: 100%;
		height: 100%;

		overflow: hidden;
	}

	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;
	}

	.svg-container {
		padding: 6px 5px 6px 15px;

		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.title-container {
		position: relative;
		height: 70px;
		float: left;
		background-color: #292e4c;
		line-height: 70px;
		width: 100%;
		.title {
			font-size: 28px;
			color: #fff;
			font-weight: bold;
			padding: 0px;
			margin-left: 17px;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		// color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}

	.header {
		font-size: 35px;
		font-weight: bold;
		color: #fff;
		box-sizing: border-box;
	}
	.loginWraper {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: 1;
		background-color: #fff;
	}
	.left_login {
		width: 50%;
		height: 95%;
		background: url(../assets/bg.png) no-repeat;
		background-size: 100% 100%;
		z-index: 9999;
		float: left;
	}
}
</style>
