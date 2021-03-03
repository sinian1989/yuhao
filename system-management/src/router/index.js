/**
 * Created by yqr on 2018/3/26.
 */
import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/layout/components/nav/topNav.vue'
import LeftNav from '@/layout/components/nav/leftNav.vue'
import Home from '@/layout/components/home.vue'
import Home1 from '@/layout/components/home1.vue'
import Dashboard from '@/views/workbench/dashboard.vue'
import map from '@/views/enterprise/map.vue'
import routevueFilesManage from '@/views/enterprise/routevue.vue'
import routevueFilesManage1 from '@/views/enterprise/routervue1.vue'
import videoSurveillance from '@/views/enterprise/videoSurveillance.vue'




import MySettings from '@/views/workbench/mySettings.vue'
import Mission from '@/views/workbench/mission/mission.vue'
import Plan from '@/views/workbench/plan/plan.vue'
import Maillist from '@/views/workbench/maillist.vue'
import EnterpriseList from '@/views/enterprise/index.vue'
import EnterpriseAdd from '@/views/enterprise/add.vue'
import EnterpriseDetail from '@/views/enterprise/detail.vue'
import EnterpriseValidate from '@/views/enterprise/validate.vue'
import VehicleManage from '@/views/vehicle/index.vue'
import DeptManager from '@/views/dept/index.vue'
import NotFound from '@/layout/components/404.vue'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/login'], resolve)

Vue.use(Router)

let router = new Router({
    // linkExactActiveClass: 'active',
    linkActiveClass: 'active',
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
            redirect: '/home',
            component: Home1,
            children: [{
                path: '/home',
                name: '总览',
                components: {
                    default: Dashboard,
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
        	path: '/enterpriseManager',
        	type: 'enterprise',
        	name: 'enterprise',
        	component: Home,
        	redirect: '/enterprise/map',
        	menuShow: true,
        	children: [
                {
                    path: '/enterprise/map',
                    name: '重点企业分布',
                    components: {
                        default: map,
                        top: TopNav,
                        aside: LeftNav
                    },
                    leaf: true,
                    iconCls: 'el-icon-office-building',
                    menuShow: true,
                },

                {
                    path: '/enterpriseFilesManage',
                    name: '企业档案管理',
                    components: {
                        default: routevueFilesManage,
                        top: TopNav,
                        aside: LeftNav
                    },
                    iconCls: 'el-icon-folder-opened',
                    menuShow: true,
                    children: [

                        // {
                        //     path: '/enterpriseFilesManage/files',
                        //     components: {
                        //         default: routevueFilesManage,
                        //         top: TopNav,
                        //         aside: LeftNav
                        //     },
                        //     name: '企业档案',
                        //     menuShow: true,
                        //     redirect: '/enterpriseFilesManage/files/da',
                        //     children:[
                        //         {
                        //             path: '/enterpriseFilesManage/files/da',
                        //             component: () => import('@/views/enterprise/qiyedanganList'),
                        //             name: '企业档案',
                        //             menuShow: false,
                        //         },
                        //         {
                        //             path: '/enterpriseFilesManage/files/detail',
                        //             component: () => import('@/views/enterprise/qiyedangan'),
                        //             name: '企业档案详情',
                        //             menuShow: false,
                        //         },
                        //     ]
                        // },


                        {
                            path: '/enterpriseFilesManage/files',
                            component: () => import('@/views/enterprise/qiyedanganList'),
                            name: '企业档案',
                            menuShow: true,
                        },
                        {
                            path: '/enterpriseFilesManage/files/detail',
                            component: () => import('@/views/enterprise/qiyedangan'),
                            name: '企业档案详情',
                            menuShow: false,
                        },

                        {
                            path: '/enterpriseFilesManage/enterpriseData',
                            component: () => import('@/views/enterprise/qiyexinxishenhe'),
                            name: '企业信息审核',
                            menuShow: true
                        },
                        {
                            path: '/enterpriseFilesManage/gatesentry',
                            component: () => import('@/views/enterprise/mengangxinxishenhe'),
                            name: '门岗信息审核',
                            menuShow: true
                        },
                        {
                            path: '/enterpriseFilesManage/carAuditing',
                            component: () => import('@/views/enterprise/carAuditing'),
                            name: '车辆电子审核',
                            menuShow: true
                        },
                    ]
                },
                {
                    path: '/alarmInformationManagement',
                    name: '报警信息管理',
                    components: {
                        default: routevueFilesManage,
                        top: TopNav,
                        aside: LeftNav
                    },
                    iconCls: 'el-icon-message-solid',
                    menuShow: true,
                    children: [
                        {
                            path: '/alarmInformationManagement/realTimeFlowMonitoringAlarm',
                            component: () => import('@/views/enterprise/realTimeFlowMonitoringAlarm'),
                            name: '实时流量监控报警',
                            menuShow: true,
                        },
                        {
                            path: '/alarmInformationManagement/emissionStageMonitoringAlarm',
                            component: () => import('@/views/enterprise/emissionStageMonitoringAlarm'),
                            name: '排放阶段监控报警',
                            menuShow: true
                        },
                        {
                            path: '/alarmInformationManagement/overStandardVehicleAlarm',
                            component: () => import('@/views/enterprise/overStandardVehicleAlarm'),
                            name: '超标车辆报警',
                            menuShow: true
                        },
                        {
                            path: '/alarmInformationManagement/equipmentAlarm',
                            component: () => import('@/views/enterprise/equipmentAlarm'),
                            name: '设备报警',
                            menuShow: true
                        },
                    ]
                },
                {
                    path: '/enterprise/videoSurveillance',
                    name: '视频监控',
                    components: {
                        default: videoSurveillance,
                        top: TopNav,
                        aside: LeftNav
                    },
                    leaf: true,
                    iconCls: 'el-icon-video-camera-solid',
                    menuShow: true,
                },


                // {
                //     path: '/mySet1',
                //     components: {
                //         default: MySettings,
                //         top: TopNav,
                //         aside: LeftNav
                //     },
                //     name: '我的设置',
                //     iconCls: 'el-icon-menu',
                //     menuShow: true,
                //     children: [
                //         {
                //             path: '/mySet1/plan',
                //             component: () => import('@/views/vehicle/1'),
                //             name: '行程计划',
                //             menuShow: true,
                //         },
                //         {
                //             path: '/mySet1/mission',
                //             component: () => import('@/views/vehicle/2'),
                //             name: '我的任务',
                //             menuShow: true
                //         },
                //         {
                //             path: '/mySet1/maillist',
                //             component: () => import('@/views/vehicle/3'),
                //             name: '通讯录',
                //             menuShow: true
                //         }
                //     ]
                // },
        	]
        },


        // {
        // 	path: '/filesManage',
        // 	type: 'filesManage',
        // 	name: 'filesManage',
        // 	component: Home,
        // 	redirect: '/filesManage/enterpriseFiles',
        // 	menuShow: true,
        // 	children: [
        //         {
        //             path: '/filesManage/enterpriseFiles',
        //             name: '企业档案管理',
        //             components: {
        //                 default: map,
        //                 top: TopNav,
        //                 aside: LeftNav
        //             },
        //             leaf: true,
        //             iconCls: 'el-icon-setting',
        //             menuShow: true,
        //             children: [
        //                 {
        //                     path: '/mySet1/plan',
        //                     component: () => import('@/views/vehicle/1'),
        //                     name: '行程计划',
        //                     menuShow: true,
        //                 },
        //                 {
        //                     path: '/mySet1/mission',
        //                     component: () => import('@/views/vehicle/2'),
        //                     name: '我的任务',
        //                     menuShow: true
        //                 },
        //                 {
        //                     path: '/mySet1/maillist',
        //                     component: () => import('@/views/vehicle/3'),
        //                     name: '通讯录',
        //                     menuShow: true
        //                 }
        //             ]
        //         },
        // 		{
        // 			path: '/mySet1',
        // 			components: {
        // 				default: MySettings,
        // 				top: TopNav,
        // 				aside: LeftNav
        // 			},
        // 			name: '我的设置',
        // 			iconCls: 'el-icon-menu',
        // 			menuShow: true,
        // 			children: [
        // 				{
        // 					path: '/mySet1/plan',
        // 					component: () => import('@/views/vehicle/1'),
        // 					name: '行程计划',
        // 					menuShow: true,
        // 				},
        // 				{
        // 					path: '/mySet1/mission',
        // 					component: () => import('@/views/vehicle/2'),
        // 					name: '我的任务',
        // 					menuShow: true
        // 				},
        // 				{
        // 					path: '/mySet1/maillist',
        // 					component: () => import('@/views/vehicle/3'),
        // 					name: '通讯录',
        // 					menuShow: true
        // 				}
        // 			]
        // 		},
        // 		{
        // 			path: '/enterprise/list',
        // 			name: '企业信息',
        // 			components: {
        // 				default: EnterpriseList,
        // 				top: TopNav,
        // 				aside: LeftNav
        // 			},
        // 			leaf: true,
        // 			iconCls: 'el-icon-setting',
        // 			menuShow: true,
        // 		},
        // 		{
        // 			path: '/enterprise/detail',
        // 			name: '企业详情',
        // 			components: {
        // 				default: EnterpriseDetail,
        // 				top: TopNav,
        // 				aside: LeftNav
        // 			},
        // 			leaf: true,
        // 			iconCls: 'el-icon-setting',
        // 			menuShow: true
        // 		},
        // 		{
        // 			path: '/enterprise/add',
        // 			name: '添加企业',
        // 			components: {
        // 				default: EnterpriseAdd,
        // 				top: TopNav,
        // 				aside: LeftNav
        // 			},
        // 			leaf: true,
        // 			iconCls: 'el-icon-menu',
        // 			menuShow: true
        // 		},
        // 		{
        // 			path: '/enterprise/validate',
        // 			name: '企业认证',
        // 			components: {
        // 				default: EnterpriseValidate,
        // 				top: TopNav,
        // 				aside: LeftNav
        // 			},
        // 			leaf: true,
        // 			iconCls: 'el-icon-menu',
        // 			menuShow: true
        // 		}
        // 	]
        // },


        // {
        // 	path: '/vehicleManager',
        // 	type: 'enterprise',
        // 	name: 'vehicle',
        // 	component: Home,
        // 	redirect: '/vehicle/list',
        // 	menuShow: true,
        // 	children: [{
        // 		path: '/vehicle/list',
        // 		name: '车辆信息',
        // 		components: {
        // 			default: VehicleManage,
        // 			top: TopNav,
        // 			aside: LeftNav
        // 		},
        // 		leaf: true, // 只有一个节点
        // 		iconCls: 'iconfont icon-home', // 图标样式class
        // 		menuShow: true
        // 	}]
        // },
        // {
        // 	path: '/deptManager',
        // 	type: 'enterprise',
        // 	name: 'dept',
        // 	component: Home1,
        // 	redirect: '/dept/list',
        // 	menuShow: true,
        // 	children: [{
        // 		path: '/dept/list',
        // 		name: '部门信息',
        // 		components: {
        // 			default: DeptManager,
        // 			top: TopNav,
        // 			aside: LeftNav
        // 		},
        // 		leaf: true, // 只有一个节点
        // 		iconCls: 'iconfont icon-home', // 图标样式class
        // 		menuShow: true
        // 	}]
        // }
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
