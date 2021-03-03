<template>
	<el-row class="container">
		<!--头部-->
		<el-col :span="24" class="topbar-wrap">
			<!--<div class="topbar-logo topbar-btn">-->
				<!--<a href="/"><img src="" style="padding-left:8px;" /></a>-->
			<!--</div>-->
			<div class="topbar-logos">
				<a href="/" style="color: #fff;"><span v-show="!$store.state.collapsed">重点行业企业门禁监管系统</span></a>
			</div>
			<div class="topbar-account topbar-btn">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link userinfo-inner">
						<i class="iconfont icon-user"></i>
						{{ nickname }}
						<i class="el-icon-caret-bottom"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="topbar-title">
				<!-- 注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
				<!--<el-row v-show="$store.state.topNavState === 'home'">-->
				<el-row>
					<el-col :span="24">
						<el-menu :default-active="defaultActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
							<!-- <el-menu-item index="/">总览</el-menu-item>
							<el-menu-item index="/enterpriseManager">重点企业监管</el-menu-item>
							<el-menu-item index="/vehicleManager">过车详细数据</el-menu-item>
							<el-menu-item index="/deptManager">超标车辆管理</el-menu-item>
							<el-menu-item index="/deptManager">统计分析</el-menu-item>
							<el-menu-item index="/deptManager">预警控制</el-menu-item> -->
							<el-menu-item v-for="(item,index) in menuList" :key="index" :index="item.path">{{item.name}}</el-menu-item>
						</el-menu>
					</el-col>
				</el-row>
				<!--<el-row v-show="$store.state.topNavState === 'enterprise'">-->
					<!--<el-col :span="24">-->
						<!--<el-menu :default-active="defaultActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">-->
							<!--<el-menu-item index="/">工作台</el-menu-item>-->
							<!--<el-menu-item index="/enterpriseManager">企业信息</el-menu-item>-->
							<!--<el-menu-item index="/vehicleManager">车辆信息</el-menu-item>-->
							<!--<el-menu-item index="/deptManager">组织架构</el-menu-item>-->
						<!--</el-menu>-->
					<!--</el-col>-->
				<!--</el-row>-->
			</div>

		</el-col>
	</el-row>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css';
import {road} from '../../../views/road.js'
import {findListByRoleId} from '../../../api/menuList.js'

export default {
  data(){
    return {
      loading: false,
      companyName: '',
      nickname: '',
      defaultActiveIndex: '/',
      homeMenu: false,
      messageCount: 5,
			menuList:[]
    }
  },
  created() {
		
		this.$nextTick(function(){
			this.nickname = sessionStorage.getItem('username')
		});
		this.$nextTick(function(){
			this.defaultActiveIndex = sessionStorage.getItem('index');
			this.defaultActiveIndex1 = sessionStorage.getItem('index');
		})
	
    road.$on('goto', (url) => {
      if(url === "/login") {
        sessionStorage.removeItem('Token');
        this.$router.push(url);
      }
    });
    // 组件创建完后获取数据
    this.fetchNavData();
  },
  methods: {
		findListByRoleId(){
			findListByRoleId().then(res=>{
				console.log(res)
				this.menuList = res.data.topList;
			})
		},
    jumpTo(url){
      this.$router.push(url); //用go刷新
    },
    handleSelect(index){
    	this.$nextTick(function(){
    		sessionStorage.setItem('index',index)
    		this.defaultActiveIndex = sessionStorage.getItem('index');
    		this.defaultActiveIndex1 = sessionStorage.getItem('index');
    	})
    	console.log(index)
    },
    fetchNavData () { // 初始化菜单激活项
      let cur_path = this.$route.path; //获取当前路由
      let routers = this.$router.options.routes; // 获取路由对象
      let nav_type = "", nav_name = "";
      for (var i = 0; i < routers.length; i++) {
        let children = routers[i].children;
        if(children){
          for (let j = 0; j < children.length; j++) {
            if (children[j].path === cur_path) {
              nav_type = routers[i].type;
              nav_name = routers[i].name;
              break;
            }
            // 如果该菜单下还有子菜单
            if(children[j].children) {
              let grandChildren = children[j].children;
              for(let z=0; z<grandChildren.length; z++) {
                if(grandChildren[z].path === cur_path) {
                  nav_type = routers[i].type;
                  nav_name = routers[i].name;
                  break;
                }
              }
            }
          }
        }
      }
      this.$store.state.topNavState = nav_type;
      this.$store.state.leftNavState = nav_name;
      if(nav_type == "home"){
        this.defaultActiveIndex = "/";
      } else {
        this.defaultActiveIndex = "/" + nav_name + "Manager";
      }
    },
    logout(){
      //logout
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonClass: 'el-button--warning'
      }).then(() => {
        //确认
        sessionStorage.removeItem('Token');
        road.$emit('goto', '/login');
      }).catch(() => {});
    }
  },
  mounted() {
		this.findListByRoleId()
    // let user = window.sessionStorage.getItem('Token');
    // if (user) {
    //   user = JSON.parse(user);
    //   this.nickname = user.nickname || '';
    //   this.companyName = user.companyName || '';
    // }
  },
  watch: {
    '$route': function(to, from){ // 路由改变时执行
      //console.info("to.path:" + to.path);
      this.fetchNavData();
    }
  }
}
</script>
