<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card shadow="hover" class="mgb20" style="height:524px;">
                    <el-button text @click="chagetrue">新增modbus_tcp连接</el-button>

                    <el-dialog v-model="dialogFormVisible" title="Shipping address">
                        <el-form :model="form">
                        <el-form-item label="地址" :label-width="formLabelWidth">
                            <el-input v-model="form.address" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="端口" :label-width="formLabelWidth">
                            <el-input v-model="form.port" autocomplete="off" />
                        </el-form-item>
                        </el-form>
                        <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="chagefalse">取消</el-button>
                            <el-button type="primary" @click="sendform"
                            >确认添加</el-button
                            >
                        </span>
                        </template>
                    </el-dialog>
                    <br><br>
                    <el-button id="start61850">start61850</el-button>
                    <br><br>
                    <el-button id="end61850">end61850</el-button>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="3">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <div class="grid-num">除湿</div>
                                    <el-switch style="margin:10px;"></el-switch>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="3">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <div class="grid-cont-right">
                                    <div class="grid-num">风机</div>
                                    <el-switch style="margin:10px;"></el-switch>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="3">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <div class="grid-num">门禁</div>
                                    <el-switch style="margin:10px;"></el-switch>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="3">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <div class="grid-num">照明</div>
                                    <el-switch style="margin:10px;"></el-switch>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="3">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <div class="grid-cont-right">
                                    <div class="grid-num">警铃</div>
                                    <el-switch style="margin:10px;"></el-switch>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="3">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <div class="grid-num">排污泵</div>
                                    <el-switch style="margin:10px;"></el-switch>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="3">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <div class="grid-num">布防</div>
                                    <el-switch style="margin:10px;"></el-switch>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="3">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <div class="grid-cont-right">
                                    <div class="grid-num">空调</div>
                                    <el-switch style="margin:10px;"></el-switch>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <template #header>
                        <div class="clearfix">
                            <span>待办事项</span>
                            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                        </div>
                    </template>

                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template #default="scope">
                                <div class="todo-item" :class="{
                                        'todo-item-del': scope.row.status,
                                    }">{{ scope.row.title }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card shadow="hover" style="height:403px;">
                <div class="boxTitle">
                    水位监测
                </div>
                <div class="box">
                    <div class="boxSubtitle">
                        深度
                    </div>
                    <div class="boxValue">
                        -0.2m
                    </div>
                </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover" style="height:403px;">
                <div class="boxTitle">
                    气体监测
                </div>
                <div class="box">
                    <div class="boxSubtitle">
                        SF6
                    </div>
                    <div class="boxValue">
                        0ppm
                    </div>
                </div>
                <div class="box">
                    <div class="boxSubtitle">
                        O2
                    </div>
                    <div class="boxValue">
                        21%
                    </div>
                </div>
                <div class="box">
                    <div class="boxSubtitle">
                        O3
                    </div>
                    <div class="boxValue">
                        0ppm
                    </div>
                </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover" style="height:403px;">
                <div class="boxTitle">
                    环境
                </div>
                <div class="box">
                    <div class="boxSubtitle">
                        温度
                    </div>
                    <div class="boxValue">
                        12.2℃
                    </div>
                </div>
                <div class="box">
                    <div class="boxSubtitle">
                        湿度
                    </div>
                    <div class="boxValue">
                        68.2%
                    </div>
                </div>
            
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from "vue-schart";
import { reactive } from "vue";


export default {
    name: "dashboard",
    data(){
        return{
            dialogFormVisible:false,
            formLabelWidth:'140px',
            form:{
                address:"127.0.0.1",
                port:"502"
            }
        }
    },
    components: { Schart },
    setup() {
        const name = localStorage.getItem("ms_username");
        const role = name === "admin" ? "超级管理员" : "普通用户";

        const data = reactive([
            {
                name: "2018/09/04",
                value: 1083,
            },
            {
                name: "2018/09/05",
                value: 941,
            },
            {
                name: "2018/09/06",
                value: 1139,
            },
            {
                name: "2018/09/07",
                value: 816,
            },
            {
                name: "2018/09/08",
                value: 327,
            },
            {
                name: "2018/09/09",
                value: 228,
            },
            {
                name: "2018/09/10",
                value: 1065,
            },
        ]);
        const options = {
            type: "bar",
            title: {
                text: "最近一周各品类销售图",
            },
            xRorate: 25,
            labels: ["周一", "周二", "周三", "周四", "周五"],
            datasets: [
                {
                    label: "家电",
                    data: [234, 278, 270, 190, 230],
                },
                {
                    label: "百货",
                    data: [164, 178, 190, 135, 160],
                },
                {
                    label: "食品",
                    data: [144, 198, 150, 235, 120],
                },
            ],
        };
        const options2 = {
            type: "line",
            title: {
                text: "最近几个月各品类销售趋势图",
            },
            labels: ["6月", "7月", "8月", "9月", "10月"],
            datasets: [
                {
                    label: "家电",
                    data: [234, 278, 270, 190, 230],
                },
                {
                    label: "百货",
                    data: [164, 178, 150, 135, 160],
                },
                {
                    label: "食品",
                    data: [74, 118, 200, 235, 90],
                },
            ],
        };
        const todoList = reactive([
            {
                title: "今天要修复100个bug",
                status: false,
            },
            {
                title: "今天要修复100个bug",
                status: false,
            },
            {
                title: "今天要写100行代码加几个bug吧",
                status: false,
            },
            {
                title: "今天要修复100个bug",
                status: false,
            },
            {
                title: "今天要修复100个bug",
                status: true,
            },
            {
                title: "今天要写100行代码加几个bug吧",
                status: true,
            },
        ]);

        return {
            name,
            data,
            options,
            options2,
            todoList,
            role,
        };
    },
    created(){
        var address = 'ws://localhost:10077';
        var socket=new WebSocket(address);
        console.log('client connecting to ' + address );

        socket.onopen=function(event) {
            console.log("info: ws connected");
                //主动调用
            console.log("config start61850 ...");
            document.getElementById("start61850").onclick = function() {
                socket.send('start61850');
                console.log("start server ...");
            };

            console.log("config end61850 ...");
            document.getElementById("end61850").onclick = function() {
                socket.send('end61850');
                console.log("end server ...");
            };
        };

        socket.onerror=function(error) {
            console.log('Connection error: ' + error.message);
            //process.exit(1);
        };

        socket.onclose=function() {
            console.log('Connection closed.');
            //process.exit(1);
        };
    },
    methods:{
        open:function(){
        },
        chagetrue:function(){
            this.dialogFormVisible=true;
        },
        chagefalse:function(){
            this.dialogFormVisible=false;
        },
        sendform:function(){
            this.dialogFormVisible=false;
            var address = 'ws://localhost:10077';
            var socket=new WebSocket(address);
            socket.onopen=function(event) {
                //socket.send('modbus_tcp,'+this.form.address+','+this.form.port);
                socket.send('hello');
            };
            socket.onmessage = function(msg) {
                console.log("Received Message: " + msg);
            };
            
            socket.onerror=function(error) {
                console.log('Connection error: ' + error.message);
                //process.exit(1);
            };

            socket.onclose=function() {
                console.log('Connection closed.');
                //process.exit(1);
            };
        }
    }
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}

.boxTitle{
    width:100%;
    height:120px;
    text-align: center;
    font-size:30px;
    font-weight: bold;
    color: rgb(45, 140, 240);
}

.box{
    width:180px;
    height:280px;
    float:left;
}

.boxSubtitle{
    width:100%;
    height:160px;
    text-align: center;
    font-size:30px;
    font-weight: bold;
    color:rgb(45, 140, 240);
}

.boxValue{
    width:100%;
    height:120px;
   text-align: center;
    font-size:30px;
    font-weight: bold;
    color: rgb(45, 140, 240);
}
</style>
