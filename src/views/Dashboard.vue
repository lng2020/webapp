<template>
  <el-container style="height: 910px">
    <el-aside width="400px">
      <el-card>
        <h1>开关</h1>
        <el-divider />
        <el-table
          :data="
            data.switchList.slice(
              (data.switchPageIndex - 1) * data.switchPageSize,
              data.switchPageIndex * data.switchPageSize
            )
          "
          style="width: 100%"
        >
          <el-table-column prop="name" label="名字" width="178px" />
          <el-table-column label="状态" width="178px">
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.value"
                :active-value="true"
                :inactive-value="false"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="data.switchPageIndex"
            :page-size="data.switchPageSize"
            :total="data.switchList.length"
            @current-change="handlePageChange1"
          ></el-pagination>
        </div>
      </el-card>
    </el-aside>
    <el-main>
      <el-card style="height: 32%; margin: -15px 0 10px">
        <el-row>
          <el-col
            v-for="item in data.THSensorList.slice(
              (data.THSensorPageIndex - 1) * data.THSensorPageSize,
              data.THSensorPageIndex * data.THSensorPageSize
            )"
            :key="item"
            :span="4"
            style="margin: 10px"
          >
            <el-progress
              type="dashboard"
              :percentage="
                ((item.value - item.minn) / (item.maxx - item.minn)) * 100
              "
              :color="item.colors"
            />
            <div style="text-align: center">
              <el-popover
                placement="top-start"
                title="设备详情"
                trigger="click"
              >
                <template v-for="(key, value) in item" :key="key">
                  <div>{{ value }}: {{ key }}</div>
                </template>
                <template #reference>
                  <el-button>{{ item.name }}</el-button>
                </template>
              </el-popover>
            </div>
          </el-col>
          <div class="pagination">
            <el-pagination
              style="position: absolute; right: 0px; bottom: 0px"
              background
              layout="total, prev, pager, next"
              :current-page="data.THSensorPageIndex"
              :page-size="data.THSensorPageSize"
              :total="data.THSensorList.length"
              @current-change="handlePageChange2"
            ></el-pagination>
          </div>
        </el-row>
      </el-card>
      <el-card style="height: 32%; margin: 10px 0">
        <el-row>
          <el-col
            v-for="item in data.gasSensorList.slice(
              (data.gasSensorPageIndex - 1) * data.gasSensorPageSize,
              data.gasSensorPageIndex * data.gasSensorPageSize
            )"
            :key="item"
            :span="4"
            style="margin: 10px"
          >
            <el-progress
              type="dashboard"
              :percentage="
                ((item.value - item.minn) / (item.maxx - item.minn)) * 100
              "
              :color="item.colors"
            />
            <div style="text-align: center">
              <el-popover
                placement="top-start"
                title="设备详情"
                trigger="click"
              >
                <template v-for="(key, value) in item" :key="key">
                  <div>{{ value }}: {{ key }}</div>
                </template>
                <template #reference>
                  <el-button>{{ item.name }}</el-button>
                </template>
              </el-popover>
            </div>
          </el-col>
          <div class="pagination">
            <el-pagination
              style="position: absolute; right: 0px; bottom: 0px"
              background
              layout="total, prev, pager, next"
              :current-page="data.gasSensorPageIndex"
              :page-size="data.gasSensorPageSize"
              :total="data.gasSensorList.length"
              @current-change="handlePageChange3"
            ></el-pagination>
          </div>
        </el-row>
      </el-card>
      <el-card style="height: 32%; margin: 10px 0">
        <el-row>
          <el-table :data="data.levelList" style="width: 100%">
            <el-table-column prop="name" label="名称" width="200" />
            <el-table-column label="水位">
              <template v-slot="scope">
                <el-progress
                  :text-inside="true"
                  :stroke-width="26"
                  :percentage="
                    ((scope.row.value - scope.row.minn) /
                      (scope.row.maxx - scope.row.minn)) *
                    100
                  "
                />
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="data.levelPageIndex"
            :page-size="data.levelPageSize"
            :total="data.levelList.length"
            @current-change="handlePageChange4"
          ></el-pagination>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from "vue";

export default {
  name: "dashboard",
  setup() {
    let data = reactive({
      switchList: [],
      THSensorList: [],
      gasSensorList: [],
      levelList: [],
      switchPageIndex: 1,
      switchPageSize: 10,
      THSensorPageIndex: 1,
      THSensorPageSize: 5,
      gasSensorPageIndex: 1,
      gasSensorPageSize: 5,
      levelPageIndex: 1,
      levelPageSize: 4,
    });

    const timer = ref(null);
    onMounted(() => {
      fetchData();
      timer.value = setInterval(async () => {
        fetchData();
      }, 5000);
    });
    onUnmounted(() => {
      clearInterval(timer.value);
    });

    const getData = () => {
      const address = "ws://localhost:10077";
      const socket = new WebSocket(address);

      socket.onopen = function () {
        socket.send(
          JSON.stringify({
            func: 5,
          })
        );
        //console.log("info: ws connected");
      };
      socket.onerror = function (error) {
        console.log("Connection error: " + error.message);
        // process.exit(1);
      };
      socket.onclose = function () {
        console.log("Connection closed.");
        // process.exit(1);
      };
      socket.onmessage = function (msg) {
        let deviceTree = JSON.parse(msg.data);
        //console.log(deviceTree);

        for (let i = 0; i < deviceTree.length; i++) {
          let treeNode = deviceTree[i];
          console.log(treeNode);
          for (let j = 0; j < treeNode["children"].length; j++) {
            let children = treeNode["children"][j];
            //console.log(children);
            switch (children["type"]) {
              case "开关":
                if (
                  data.switchList.some((item) => {
                    if (item.ID == children["ID"]) {
                      return true;
                    }
                  }) == false
                ) {
                  //console.log(children);
                  data.switchList.push(children);
                }
                break;
              case "温湿度传感器":
                if (
                  data.THSensorList.some((item) => {
                    if (item.ID == children["ID"]) {
                      return true;
                    }
                  }) == false
                ) {
                  console.log(children);
                  data.THSensorList.push(children);
                }
                break;
              case "气体传感器":
                if (
                  data.gasSensorList.some((item) => {
                    if (item.ID == children["ID"]) {
                      return true;
                    }
                  }) == false
                ) {
                  //console.log(children);
                  data.gasSensorList.push(children);
                }
                break;
              case "水位监测":
                if (
                  data.levelList.some((item) => {
                    if (item.ID == children["ID"]) {
                      return true;
                    }
                  }) == false
                ) {
                  //console.log(children);
                  data.levelList.push(children);
                }
                break;
              default:
                console.log("未知种类的传感器");
                break;
            }
          }
        }
      };
    };

    const handlePageChange1 = (val) => {
      data.switchPageIndex = val;
    };
    const handlePageChange2 = (val) => {
      data.THSensorPageIndex = val;
    };
    const handlePageChange3 = (val) => {
      data.gasSensorPageIndex = val;
    };
    const handlePageChange4 = (val) => {
      data.levelPageIndex = val;
    };
    const fetchData = () => {
      getData();
      console.log("轮询数据");
    };

    return {
      data,
      handlePageChange1,
      handlePageChange2,
      handlePageChange3,
      handlePageChange4,
    };
  },
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

.boxTitle {
  width: 100%;
  height: 120px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: rgb(45, 140, 240);
}

.box {
  width: 180px;
  height: 280px;
  float: left;
}

.boxSubtitle {
  width: 100%;
  height: 160px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: rgb(45, 140, 240);
}

.boxValue {
  width: 100%;
  height: 120px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: rgb(45, 140, 240);
}
</style>
