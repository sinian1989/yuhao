<template>
    <div class="map_content">
        <div class="btn_div">
            <el-select v-model="city" placeholder="行业类型" class="selectBtn">
                <el-option
                        v-for="item in optionsCity"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="input" placeholder="请输入行业类型"></el-input>
        </div>
        <!--<el-button type="primary" icon="el-icon-edit">地图</el-button>-->
    </div>
</template>
<script>
    export default {
        name: 'mapdata',
        data() {
            return {
                optionsCity: [{
                    value: '1',
                    label: '上海市'
                }, {
                    value: '2',
                    label: '苏州市'
                }],
                city: '',
                input:''
            }
        },
        created(){

        },
        mounted() {

        },
        methods: {

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .map_content {
        position: relative;
        .btn_div{
            position: absolute;
            left: 20px;
            top: 20px;
            width: 100%;
        }
    }

</style>
