/**
 * Created by yqr on 2018/3/26.
 */
import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/layout/components/nav/topNav.vue'
import LeftNav from '@/layout/components/nav/leftNav.vue'
import Home from '@/layout/components/home.vue'
import Home1 from '@/layout/components/home1.vue'
import Organization from '@/views/organization/index'
import Resource from '@/views/resource/index'
import Role from '@/views/role/index'
import NotFound from '@/layout/components/404.vue'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/login'], resolve)

Vue.use(Router)

let router = new Router({
	routes: [{
			path: '/login',
			type: 'login',
			component: Login
		},
		{
			path: '*',
			component: NotFound
		},
		{
			path: '/Sudoku',
			component: () => import('@/components/Sudoku/index'),
		},
		{
			path: '/',
			type: 'home',
			name: 'home',
			redirect: '/organization',
			component: Home1,
			children: [{
					path: '/organization',
					name: '组织管理',
					components: {
						default: Organization,
						top: TopNav,
						aside: LeftNav
					},
					leaf: true, // 只有一个节点
					iconCls: 'iconfont icon-home', // 图标样式class
					menuShow: true
				},
				
			]
		},
		
		{
			path: '/role',
			type: 'enterprise',
			name: 'role',
			component: Home1,
			redirect: '/role/list',
			menuShow: true,
			children: [{
				path: '/role/list',
				name: '角色管理',
				components: {
					default: Role,
					top: TopNav,
					aside: LeftNav
				},
				leaf: true, // 只有一个节点
				iconCls: 'iconfont icon-home', // 图标样式class
				menuShow: true
			}]
		},
		{
			path: '/resource',
			type: 'enterprise',
			name: 'resource',
			component: Home1,
			redirect: '/resource/list',
			menuShow: true,
			children: [{
				path: '/resource/list',
				name: '资源管理',
				components: {
					default: Resource,
					top: TopNav,
					aside: LeftNav
				},
				leaf: true, // 只有一个节点
				iconCls: 'iconfont icon-home', // 图标样式class
				menuShow: true
			}]
		}
	]
});

router.beforeEach((to, from, next) => {
	console.log(to.path.startsWith('/login'))
	if (to.path.startsWith('/login')) {
		window.sessionStorage.removeItem('Token')
		next()
	} else {
		let user = window.sessionStorage.getItem('Token')
		if (!user) {
			next({
				path: '/login'
			})
		} else {
			next()
		}
	}
});

export default router
