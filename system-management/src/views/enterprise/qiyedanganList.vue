<template>
    <div class="qiyedanganList">
        <div style="margin: 20px 0">
            <span>所属区县：</span>
            <el-input v-model="input" placeholder="请输入内容" style="width: 400px;"></el-input>
            <span style="margin: 0 40px;">企业名称：</span>
            <el-input v-model="input" placeholder="请输入内容" style="width:400px;"></el-input>
        </div>
        <div style="margin:0 40px 40px 0">
            <span>企业评级：</span>
            <el-input v-model="input" placeholder="请输入内容" style="width:400px;"></el-input>

            <el-button type="primary" style="margin-left: 40px">搜索</el-button>
            <el-button type="primary" style="margin-left: 40px">导出</el-button>

        </div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button style="margin-left: 0;margin-top: 5px;" type="primary" size="small"
                               @click="todetail(scope.$index, scope.row)">查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                v-show="totalCount>0"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[10,30,50,100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: '4',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                totalCount: 1,
                pageSize: 10,
                pageIndex: 1,
                value1: '',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                input: '',
            };
        },
        methods: {
            todetail(){
                this.$router.push({path: '/enterpriseFilesManage/files/detail'})
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.pageIndex = 1;
                // this.getList()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val
                // this.getList()
            },
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .qiyedanganList {
        padding: 20px;
    }

</style>
