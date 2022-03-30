<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 实时数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`环境实时数据`" name="first">
                    <el-table :data="state.unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template #default="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="value" width="150"></el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                    </el-table>                   
                </el-tab-pane>
                <el-tab-pane :label="`状态实时数据`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="state.read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template #default="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="value" width="150"></el-table-column>
                            <el-table-column prop="date" width="180"></el-table-column>      
                        </el-table>                
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
    name: "tabs",
    setup() {
        const message = ref("first");
        const state = reactive({
            unread: [
                {
                    date: "2018-04-19 20:00:00",
                    title: "空调环境温度",
                    value: "12.2℃",
                },

                {
                    date: "2018-04-19 20:00:00",
                    title: "空调环境湿度",
                    value: "68.3%rh",
                },

                {
                    date: "2018-04-19 20:00:00",
                    title: "O2含量",
                    value: "21.1%",
                },
            ],
            read: [
                {
                    date: "2018-04-19 20:00:00",
                    title: "烟感报警",
                    value: "关",
                },

                {
                    date: "2018-04-19 20:00:00",
                    title: "水浸报警",
                    value: "关",
                },

                {
                    date: "2018-04-19 20:00:00",
                    title: "门禁状态",
                    value: "关",
                },

            ],
            
        });

       

        return {
            message,
            state,
        };
    },
};
</script>

<style>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
</style>

