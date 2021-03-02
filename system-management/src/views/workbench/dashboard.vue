<template>
    <el-row class="wrap">
        <el-col :span="24" class="wrap-breadcrumb">
            <div style="margin-bottom: 20px">
                <span>选择日期：</span>
                <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple left_div">

                        <div class="model_item model1">
                            <div class="topdiv">
                                <h2>2021年1月11日重点企业信息</h2>
                                <div class="model1_mid_div">
                                    <div class="model1_mid_div_item">
                                        <p>重点企业监管</p>
                                        <div>
                                            <b>256</b>
                                            <img src="../../assets/zonglan/icon1.png" alt="">
                                        </div>

                                    </div>
                                    <div class="model1_mid_div_item">
                                        <p>车流量</p>
                                        <div>
                                            <b>256</b>
                                            <img src="../../assets/zonglan/icon2.png" alt="">
                                        </div>

                                    </div>
                                    <div class="model1_mid_div_item">
                                        <p>车辆预警</p>
                                        <div>
                                            <b>256</b>
                                            <img src="../../assets/zonglan/icon3.png" alt="">
                                        </div>

                                    </div>
                                    <div class="model1_mid_div_item">
                                        <p>设备异常数</p>
                                        <div>
                                            <b>256</b>
                                            <img src="../../assets/zonglan/icon4.png" alt="">
                                        </div>
                                    </div>
                                </div>
                                <div class="model_btm_div">
                                    <p>设备异常</p>
                                    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"
                                                 color="#46A9A8"></el-progress>
                                </div>
                            </div>

                        </div>

                        <div class="zhanweifu"></div>

                        <div class="model-item model2">
                            <h2>2021年1月11日排放阶段流量</h2>
                            <div class="model2_btm_div">
                                <div class="model2_btm_div_item">
                                    <p>国三及以下</p>
                                    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"
                                                 color="#F7C739"></el-progress>
                                </div>
                                <div class="model2_btm_div_item">
                                    <p>国IV</p>
                                    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"
                                                 color="#1C83DD"></el-progress>
                                </div>
                                <div class="model2_btm_div_item">
                                    <p>国V</p>
                                    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"
                                                 color="#A285D2"></el-progress>
                                </div>
                                <div class="model2_btm_div_item">
                                    <p>国VI及以上</p>
                                    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"
                                                 color="#46A9A8"></el-progress>
                                </div>
                            </div>
                        </div>

                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple mid_div">

                        <div class="model3">
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="重点监管企业" name="first">
                                    <!--<div id="midMap" style="width: 500px;height: 400px;"></div>-->
                                </el-tab-pane>
                                <el-tab-pane label="排放阶段报警" name="second">
                                </el-tab-pane>
                                <el-tab-pane label="车辆超标报警" name="third">

                                </el-tab-pane>
                                <el-tab-pane label="设备异常报警" name="fourth">

                                </el-tab-pane>
                                <div id="midMap" style="width: 500px;height: 400px;"></div>
                            </el-tabs>
                        </div>

                        <div class="zhanweifu"></div>

                        <div class="model4">
                            <h2>重点监管企业所属行业排名Top10</h2>
                            <div id="model4" style="width: 100%;height:200px"></div>
                        </div>

                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple rgt_div">

                        <div class="model5">
                            <div class="top_div">
                                <h2>近30天车流量分析变化</h2>
                                <el-select v-model="city" placeholder="选择城市" class="selectCity">
                                    <el-option
                                            v-for="item in optionsCity"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div id="model5" style="width: 100%;height: 300px;"></div>
                        </div>

                        <div class="zhanweifu"></div>

                        <div class="model6">
                            <h2>重点行业分时段流量变化分析</h2>
                            <div id="model6" style="width: 100%;height: 300px;"></div>
                        </div>

                    </div>
                </el-col>
            </el-row>

        </el-col>
    </el-row>
</template>
<script>
    import echarts from 'echarts'
    import request from '../../utils/request'

    export default {
        name: 'dashboard',
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                value1: '',
                activeName: 'first',
                options: {
                    title: {
                        text: '香港18区人口密度 （2011）',
                        subtext: '人口密度数据来自Wikipedia',
                        sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>{c} (p / km2)'
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    visualMap: {
                        min: 800,
                        max: 50000,
                        text: ['High', 'Low'],
                        realtime: false,
                        calculable: true,
                        inRange: {
                            color: ['lightskyblue', 'yellow', 'orangered']
                        }
                    },
                    series: [
                        {
                            name: '香港18区人口密度',
                            type: 'map',
                            mapType: 'HK', // 自定义扩展图表类型
                            label: {
                                show: true
                            },
                            data: [
                                {name: '中西区', value: 20057.34},
                                {name: '湾仔', value: 15477.48},
                                {name: '东区', value: 31686.1},
                                {name: '南区', value: 6992.6},
                                {name: '油尖旺', value: 44045.49},
                                {name: '深水埗', value: 40689.64},
                                {name: '九龙城', value: 37659.78},
                                {name: '黄大仙', value: 45180.97},
                                {name: '观塘', value: 55204.26},
                                {name: '葵青', value: 21900.9},
                                {name: '荃湾', value: 4918.26},
                                {name: '屯门', value: 5881.84},
                                {name: '元朗', value: 4178.01},
                                {name: '北区', value: 2227.92},
                                {name: '大埔', value: 2180.98},
                                {name: '沙田', value: 9172.94},
                                {name: '西贡', value: 3368},
                                {name: '离岛', value: 806.98}
                            ],
                            // 自定义名称映射
                            nameMap: {
                                'Central and Western': '中西区',
                                'Eastern': '东区',
                                'Islands': '离岛',
                                'Kowloon City': '九龙城',
                                'Kwai Tsing': '葵青',
                                'Kwun Tong': '观塘',
                                'North': '北区',
                                'Sai Kung': '西贡',
                                'Sha Tin': '沙田',
                                'Sham Shui Po': '深水埗',
                                'Southern': '南区',
                                'Tai Po': '大埔',
                                'Tsuen Wan': '荃湾',
                                'Tuen Mun': '屯门',
                                'Wan Chai': '湾仔',
                                'Wong Tai Sin': '黄大仙',
                                'Yau Tsim Mong': '油尖旺',
                                'Yuen Long': '元朗'
                            }
                        }
                    ]
                },
                optionsCity: [{
                    value: '1',
                    label: '上海市'
                }, {
                    value: '2',
                    label: '苏州市'
                }],
                city: ''
            }
        },
        mounted() {
            // this.drawShape();
            // this.model1()
            this.getmap(this.options)
            this.model4()
            this.model5()
            this.model6()
        },
        methods: {
            model6(){
                var chartDom = document.getElementById('model6');
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
            model5(){
                var chartDom = document.getElementById('model5');
                var myChart = echarts.init(chartDom);
                var option;

                option = {
                    xAxis: {
                        type: 'category',
                        data: ['1', '3', '5', '7', '9','11', '13']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                    }]
                };

                option && myChart.setOption(option);
            },
            model4() {
                var chartDom = document.getElementById('model4');
                var myChart = echarts.init(chartDom);
                var option;
                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [
                                '行业1',
                                '行业2',
                                '行业3',
                                '行业4',
                                '行业5',
                                '行业6',
                                '行业7',
                                '行业8',
                                '行业9',
                                '行业10',
                            ],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            // showBackground:true,
                            // backgroundStyle:{
                            //     color:'#A285D2'
                            // },
                            data: [
                                {
                                    value: 200,
                                    itemStyle: {
                                        color: '#A285D2'
                                    }
                                },
                                {
                                    value: 100,
                                    itemStyle: {
                                        color: '#A285D2'
                                    }
                                },
                                {
                                    value: 200,
                                    itemStyle: {
                                        color: '#A285D2'
                                    }
                                },
                            ]
                        }
                    ]
                };

                option && myChart.setOption(option);
            },
            handleClick(tab, event) {
                console.log(tab, event);
                var index = tab.index
                var option = this.options
                if (index === '0') {
                    option.title.text = '0000'
                    this.getmap(option)
                } else if (index === '1') {
                    option.title.text = '1111'
                    this.getmap(option)
                } else if (index === '2') {
                    option.title.text = '2222'
                    this.getmap(option)
                } else if (index === '3') {
                    option.title.text = '3333'
                    this.getmap(option)
                }
            },
            getmap(option) {
                var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

                var chartDom = document.getElementById('midMap');
                var myChart = echarts.init(chartDom);

                myChart.showLoading();
                console.log(request)
                request({
                    url: ROOT_PATH + '/data/asset/geo/HK.json',
                    method: 'GET',
                }).then(geoJson => {
                    console.log(geoJson)
                    myChart.hideLoading();

                    echarts.registerMap('HK', geoJson);

                    myChart.setOption(option);
                });

                option && myChart.setOption(option);
            },
            model1() {
                var chartDom = document.getElementById('model1_1');
                var myChart = echarts.init(chartDom);
                var option;
                option = {
                    xAxis: {
                        type: 'category',
                        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        // type: 'value'
                    },
                    series: [{
                        data: [120, {
                            value: 200,
                            itemStyle: {
                                color: '#a90000'
                            }
                        }, 150],
                        type: 'bar'
                    }]
                };

                option && myChart.setOption(option);
            },
            drawShape() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartBar = echarts.init(document.getElementById('chartBar'));

                this.chartColumn.setOption({
                    title: {text: 'Column Chart'},
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                });

                this.chartBar.setOption({
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                });
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .content_body {
        overflow: hidden;
    }

    .left_div {
        /*width: 445px;*/
        /*width: 30%;*/
        /*margin-right: 24px;*/
        /*float: left;*/
    }

    .mid_div {
        /*width: 912px;*/
        /*width: 55%;*/
        /*margin-right: 24px;*/
        /*float: left;*/
    }

    .rgt_div {
        /*width: 445px;*/
        /*width: 30%;*/
        /*float: left;*/
    }

    .model_item {
        padding: 20px;
        opacity: 1;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.04);
    }

    .zhanweifu {
        height: 20px;
        width: 100%;
        background: #f2f2f2;
    }

    .model1 {
        /*width: 445px;*/
        width: 100%;
        height: 360px;
        .topdiv {
            h2 {
            }
            .model1_mid_div {
                overflow: hidden;
                margin-top: 20px;
                .model1_mid_div_item {
                    margin: 10px;
                    float: left;
                    width: 43%;
                    height: 78px;
                    opacity: 1;
                    background: #f2f2f2;
                    border-radius: 4px;
                    overflow: hidden;
                    box-sizing: border-box;
                    padding: 10px;
                    p {
                        /*margin-bottom: 10px;*/
                    }
                    div {
                        overflow: hidden;
                        b {
                            font-size: 20px;
                            margin-right: 40px;
                            float: left;
                            margin-top: 15px;
                        }
                        img {
                            float: right;
                            width: 27px;
                            height: 29px;
                            margin-top: 10px;
                        }
                    }

                }
            }
            .model_btm_div {
                /*width: 374px;*/
                width: 93%;
                /*height: 63px;*/
                opacity: 1;
                background: #f2f2f2;
                border-radius: 4px;
                margin-left: 10px;
                margin-top: 10px;
                padding: 10px;
                box-sizing: border-box;
                p {
                    margin-bottom: 5px
                }
            }
        }
    }

    .model2 {
        /*width: 445px;*/
        width: 100%;
        height: 402px;
        opacity: 1;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.04);
        padding: 20px;
        h2 {
            margin-bottom: 20px;
        }
        .model2_btm_div_item {
            /*width: 374px;*/
            width: 93%;
            margin: 25px 10px;
            p {
                margin-bottom: 10px;
            }
        }
    }

    .model3 {
        /*width: 912px;*/
        width: 100%;
        height: 476px;
        opacity: 1;
        background: #ffffff;
        border-radius: 0px;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.04);
        padding: 20px;
        #midMap {
            margin: 20px auto;
        }
    }

    .model4 {
        width: 100%;
        height: 280px;
        padding: 20px;
        h2 {
            margin-bottom: 20px;
        }
    }

    .model5{
        padding: 20px;
        .top_div{
            h2{
                margin-bottom: 10px;
                float: left;
                font-size: 16px;
                margin-top: 12px;
                margin-right: 20px;
            }
            .selectCity{
                width: 120px;
            }

        }
    }

    .model6{
        padding: 20px;
        h2{
            margin-bottom: 20px;
        }
    }

</style>
