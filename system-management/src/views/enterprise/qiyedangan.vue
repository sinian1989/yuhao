<template>
    <div class="qiyedangan">
        <div class="title">企业档案 >>> XXX有限公司</div>
        <el-tabs v-model="activeName" stretch @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="0">
                <h2 class="subtitle">企业基本信息</h2>
                <div class="table_div">
                    <div class="row">
                        <p class="label">企业名称</p>
                        <p class="data">企业名称企业名称企业名称企业名称企业名称</p>
                        <p class="label">统一社会信用码</p>
                        <p class="data">jahgsfjhasgfjha</p>
                    </div>
                    <div class="row">
                        <p class="label">所属城市</p>
                        <p class="data">所属城市所属城市所属城市所属城市</p>
                        <p class="label">所属区县</p>
                        <p class="data">所属区县所属区县所属区县所属区县</p>
                    </div>
                    <div class="row">
                        <p class="label">地址</p>
                        <p class="data">地址地址地址地址地址</p>
                        <p class="label">经纬度</p>
                        <p class="data">经纬度经纬度经纬度经纬度经纬度</p>
                    </div>
                    <div class="row">
                        <p class="label">行业类型</p>
                        <p class="data">行业类型行业类型行业类型行业类型</p>
                        <p class="label">联网日期</p>
                        <p class="data">联网日期联网日期联网日期联网日期</p>
                    </div>
                    <div class="row">
                        <p class="label">法人代表</p>
                        <p class="data">法人代表法人代表法人代表</p>
                        <p class="label">联系人</p>
                        <p class="data">联系人联系人联系人联系人</p>
                    </div>
                    <div class="row">
                        <p class="label">联系电话</p>
                        <p class="data">联系电话联系电话联系电话</p>
                        <p class="label">道闸总数</p>
                        <p class="data">道闸总数道闸总数道闸总数道闸总数</p>
                    </div>
                    <div class="row">
                        <p class="label">检验机构状态</p>
                        <p class="data">检验机构状态检验机构状态</p>
                        <p class="label">企业评级</p>
                        <p class="data">企业评级企业评级企业评级</p>
                    </div>
                </div>
                <h2 class="subtitle">产品运输信息
                    <el-date-picker
                            style="float: right"
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker></h2>
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

                <h2 class="subtitle">原料运输信息
                    <el-date-picker
                            style="float: right"
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </h2>
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

            </el-tab-pane>
            <el-tab-pane label="门岗信息" name="1">
                <h2 class="subtitle">道闸1</h2>
                <div class="table_div">
                    <div class="row">
                        <p class="label">道闸编号</p>
                        <p class="data">道闸编号道闸编号道闸编号</p>
                        <p class="label">道闸进出类型</p>
                        <p class="data">道闸进出类型道闸进出类型道闸进出类型</p>
                    </div>
                    <div class="row">
                        <p class="label">道闸地址</p>
                        <p class="data">道闸地址道闸地址道闸地址</p>
                        <p class="label">道闸经纬度</p>
                        <p class="data">道闸经纬度道闸经纬度道闸经纬度</p>
                    </div>
                    <div class="row">
                        <p class="label">道闸联系人</p>
                        <p class="data">道闸联系人道闸联系人</p>
                        <p class="label">道闸联系人电话</p>
                        <p class="data">道闸联系人电话道闸联系人电话</p>
                    </div>
                    <div class="row">
                        <p class="label">道闸运维企业</p>
                        <p class="data">道闸运维企业道闸运维企业</p>
                        <p class="label">道闸运维企业联系人</p>
                        <p class="data">道闸运维企业联系人道闸运维企业联系人</p>
                    </div>
                    <div class="row">
                        <p class="label">道闸运维企业联系电话</p>
                        <p class="data">道闸运维企业联系电话道闸运维企业联系电话</p>
                        <p class="label">道闸状态</p>
                        <p class="data">道闸状态道闸状态道闸状态</p>
                    </div>
                </div>
                <h2 class="subtitle">道闸2</h2>
                <div class="table_div">
                    <div class="row">
                        <p class="label">道闸编号</p>
                        <p class="data">道闸编号道闸编号道闸编号</p>
                        <p class="label">道闸进出类型</p>
                        <p class="data">道闸进出类型道闸进出类型道闸进出类型</p>
                    </div>
                    <div class="row">
                        <p class="label">道闸地址</p>
                        <p class="data">道闸地址道闸地址道闸地址</p>
                        <p class="label">道闸经纬度</p>
                        <p class="data">道闸经纬度道闸经纬度道闸经纬度</p>
                    </div>
                    <div class="row">
                        <p class="label">道闸联系人</p>
                        <p class="data">道闸联系人道闸联系人</p>
                        <p class="label">道闸联系人电话</p>
                        <p class="data">道闸联系人电话道闸联系人电话</p>
                    </div>
                    <div class="row">
                        <p class="label">道闸运维企业</p>
                        <p class="data">道闸运维企业道闸运维企业</p>
                        <p class="label">道闸运维企业联系人</p>
                        <p class="data">道闸运维企业联系人道闸运维企业联系人</p>
                    </div>
                    <div class="row">
                        <p class="label">道闸运维企业联系电话</p>
                        <p class="data">道闸运维企业联系电话道闸运维企业联系电话</p>
                        <p class="label">道闸状态</p>
                        <p class="data">道闸状态道闸状态道闸状态</p>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="车辆信息" name="2">
                <div style="margin-top: 20px;margin-bottom: 30px;">
                    <span>台账类型：</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
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
            </el-tab-pane>
            <el-tab-pane label="运输物料信息" name="3">
                <div style="margin-top: 30px;margin-bottom: 20px;">
                    <span>通过时间：</span>
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                    <span style="margin: 0 10px;">---</span>
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                    <span style="margin-left: 40px;">车牌号：</span>
                    <el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
                    <span style="margin-left: 40px;">排放阶段：</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </div>

                <div style="margin-top: 30px;margin-bottom: 30px;">
                    <span>运输货物名称：</span>
                    <el-input v-model="input" placeholder="请输入内容" style="width: 400px;"></el-input>
                    <el-button type="primary" style="margin-left: 140px">搜索</el-button>
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
            </el-tab-pane>
            <el-tab-pane label="实时流量监控" name="4">
                <div style="margin:20px 0 40px;">
                    进车流量限值：<span style="color: #EB7F65;font-size: 20px;">XXX</span>
                    <div style="float: right;">
                        <el-date-picker
                                style="margin-right: 20px;"
                                v-model="value1"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                        <el-button type="primary">搜索</el-button>
                    </div>

                </div>
                <div class="model4_mid_div">
                    <div class="model4_mid_div_lf">
                        <span>近30天实时流量变化趋势</span>
                        <el-button type="primary" style="margin-left: 20px">查看过车数据</el-button>
                    </div>
                    <div class="model4_mid_div_rgt">
                        <div class="model4_mid_div_rgt_top">
                            <div class="label"></div>
                            <el-checkbox-group v-model="checkList" class="model4_mid_div_rgt_top_check">
                                <el-checkbox label="总车流量"></el-checkbox>
                                <el-checkbox label="国三及以下"></el-checkbox>
                                <el-checkbox label="国IV"></el-checkbox>
                                <el-checkbox label="国V"></el-checkbox>
                                <el-checkbox label="国VI及以上"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="model4_mid_div_rgt_btm">
                            <div class="label"></div>
                            <el-checkbox-group v-model="checkList" class="model4_mid_div_rgt_btm_check">
                                <el-checkbox label="总车流量"></el-checkbox>
                                <el-checkbox label="国三及以下"></el-checkbox>
                                <el-checkbox label="国IV"></el-checkbox>
                                <el-checkbox label="国V"></el-checkbox>
                                <el-checkbox label="国VI及以上"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>

                <div class="model4_echart">
                    <div id="model4" style="width: 100%;height: 500px;margin-top: 40px;"></div>
                </div>

            </el-tab-pane>


            <el-tab-pane label="视频监控" name="5">

                <div style="margin-top: 30px;margin-bottom: 20px;">
                    <span>选择日期：</span>
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                    <span style="margin: 0 10px;">---</span>
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                    <el-button type="primary" style="margin-left:40px">搜索</el-button>

                </div>
                <div class="model5_div">
                    <h2>视频信息</h2>
                    <div class="model5_div_video_list">
                        <div class="model5_div_video_list_item">
                            <video src=""></video>
                            <p>
                                <span class="name">视频1</span>
                                <span class="date">2021.02.03</span>
                            </p>
                        </div>
                        <div class="model5_div_video_list_item">
                            <video src=""></video>
                            <p>
                                <span class="name">视频1</span>
                                <span class="date">2021.02.03</span>
                            </p>
                        </div>
                        <div class="model5_div_video_list_item">
                            <video src=""></video>
                            <p>
                                <span class="name">视频1</span>
                                <span class="date">2021.02.03</span>
                            </p>
                        </div>
                    </div>
                </div>

            </el-tab-pane>



            <el-tab-pane label="报警信息" name="6">
                <div style="margin-top: 30px;margin-bottom: 20px;">
                    <span>报警类型：</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <span style="margin-left: 20px;">选择日期：</span>
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                    <span style="margin: 0 10px;">---</span>
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                    <el-button type="primary" style="margin-left:40px">搜索</el-button>

                    <div class="model6_table">
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

                </div>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>
<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                activeName: '6',
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
                checkList: ['总车流量']
            };
        },
        created(){

        },
        mounted(){
            this.model4()
        },
        methods: {
            model4(){
                var chartDom = document.getElementById('model4');
                var myChart = echarts.init(chartDom);
                var option;

                option = {
                    // title: {
                    //     text: '折线图堆叠'
                    // },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['行业1', '行业2', '行业3']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1', '3', '5', '7', '9','11', '13']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '行业1',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '行业2',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '行业3',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                    ]
                };

                option && myChart.setOption(option);
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
    .qiyedangan {
        padding: 20px;

    }
    .title{
        font-size: 20px;
        font-family: Source Han Sans SC, Source Han Sans SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #1d86e1;
        line-height: 26px;
        margin-bottom: 20px;
    }
    h2.subtitle{
        margin-bottom: 30px;
        margin-top: 30px;
        font-weight: bold;
    }
    .table_div{
        border: 1px solid #ddd;
        .row{
            overflow: hidden;
            p{
                float: left;
                border-top: 1px solid #ddd;
                border-right: 1px solid #ddd;
                height: 40px;
                line-height: 40px;
                text-align: center;
            }
            .label{
                width: 20%;
                box-sizing: border-box;
                background: #f5f5f5;
                color: #808080;
            }
            .data{
                width: 30%;
                box-sizing: border-box;
            }
        }
    }
    .model4_mid_div{
        background: #F2F2F2;
        padding: 20px;
        height: 108px;
        overflow: hidden;
        .model4_mid_div_lf{
            float: left;
            margin-top: 15px;
        }
        .model4_mid_div_rgt{
            float: right;
            .model4_mid_div_rgt_top{
                overflow: hidden;
                margin-bottom: 20px;
                margin-top: 5px;
                .label{
                    width: 47px;
                    height: 21px;
                    opacity: 1;
                    border: 2px solid #d8d8d8;
                    float: left;
                    margin-right: 20px;
                }
                .model4_mid_div_rgt_top_check{
                    float: left;
                    margin-top: 3px;
                }
            }
            .model4_mid_div_rgt_btm{
                overflow: hidden;
                .label{
                    width: 47px;
                    height: 21px;
                    opacity: 1;
                    border: 2px dashed #d8d8d8;
                    float: left;
                    margin-right: 20px;
                }
                .model4_mid_div_rgt_btm_check{
                    float: left;
                    margin-top: 3px;
                }
            }
        }
    }
    .model5_div{
        margin: 30px 0;
        h2{
            margin-bottom: 20px;
        }
        .model5_div_video_list{
            overflow: hidden;
            .model5_div_video_list_item{
                float: left;
                width: 400px;
                background: #ffffff;
                border: 1px solid #eaebf0;
                border-radius: 9px;
                box-shadow: 0px 4px 8px 0px #eeeeee;
                margin-right: 20px;
                video{
                    width: 400px;
                    height: 250px;
                    opacity: 1;
                    background: rgba(0,0,0,0.00);
                }
                p{
                    height: 60px;
                    line-height: 60px;
                    overflow: hidden;
                    .name{
                        float: left;
                        margin-left: 20px;
                    }
                    .date{
                        float: right;margin-right: 20px;
                    }
                }
            }
        }
    }
    .model6_table{
        margin-top: 40px;
    }
</style>
