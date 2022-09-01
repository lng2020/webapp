<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select
          v-model="query.type"
          placeholder="类型"
          class="handle-select mr10"
        >
          <el-option key="1" label="自动" value="自动"></el-option>
          <el-option key="2" label="手动" value="手动"></el-option>
        </el-select>
        <el-input
          v-model="query.id"
          placeholder="ID"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索ID</el-button
        >
      </div>
      <el-table
        :data="
          data.arr.slice(
            (query.pageIndex - 1) * query.pageSize,
            query.pageIndex * query.pageSize
          )
        "
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="type" label="事件类型"></el-table-column>
        <el-table-column label="事件内容">
          <template #default="scope">{{ scope.row.content }}</template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-tag
              :type="
                scope.row.state === '成功'
                  ? 'success'
                  : scope.row.state === '失败'
                  ? 'danger'
                  : ''
              "
              >{{ scope.row.state }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column prop="date" label="注册时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="data.arr.length"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "eventLog",
  setup() {
    const query = reactive({
      id: "",
      type: "",
      pageIndex: 1,
      pageSize: 10,
    });

    // 接口轮询
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

    // 获取表格数据
    const data = reactive({ arr: [] });
    //console.log("client connecting to " + address);
    const getData = (query) => {
      const address = "ws://localhost:10077";
      const socket = new WebSocket(address);
      socket.onopen = function (event) {
        socket.send(
          JSON.stringify({
            func: 7,
            id: query.id,
            type: query.type,
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
        // console.log("Received Message: " + msg);
        //console.log(msg);
        //data.arr=[];
        //console.log(msg.data);
        let newData = JSON.parse(msg.data);
        if (
          data.arr.some((item) => {
            if (item.id == newData.id) {
              return true;
            }
          }) == false
        ) {
          data.arr.push(newData);
        }
      };
    };

    const sendDelete = (ID) => {
      const address = "ws://localhost:10077";
      const socket = new WebSocket(address);
      socket.onopen = function (event) {
        socket.send(
          JSON.stringify({
            func: 6,
            data: ID
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
      socket.onmessage = function (msg) {};
    };

    const fetchData = () => {
      getData(query);
      console.log("轮询数据");
    };

    // 查询操作
    const handleSearch = () => {
      query.pageIndex = 1;
      fetchData();
    };

    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
    };

    // 删除操作
    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          ElMessage.success("删除成功");
          data.arr.splice(index, 1);
          sendDelete(index+1);
        })
        .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    return {
      query,
      data,
      handleSearch,
      handlePageChange,
      handleDelete,
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
