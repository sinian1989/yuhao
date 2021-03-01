<template>
  <div>
     <el-row class="container">
       <el-col :span="24">
        <HeadNav></HeadNav>
      </el-col>
         <el-col :span="24" class="main">
          
          <section class="content-container">
            <div class="grid-content bg-purple-light">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
          </section>
         </el-col>
     </el-row>
  </div>
</template>

<script>
  import HeadNav from './nav/topNav.vue'
  import LeftMenu from './nav/leftNav.vue'
  export default {
      name: 'home',
      data(){
          return {

          }
      },
      computed:{

      },
      components:{
          HeadNav,
          LeftMenu,
      },
      created() {

      },
      mounted (){

      },
      watch:{

      },
      methods:{


      }
  }
</script>

<style scoped>
	.grid-content{
		height: 100%;
		background: inherit;
		padding: 10px 27px;
	}
</style>
