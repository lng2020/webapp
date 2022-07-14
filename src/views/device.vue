<template>
  <div>
    <el-table
      :data="data.Array"
      style="width: 100%; margin-bottom: 20px"
      row-key="ID"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="type" label="类型" sortable width="180">
      </el-table-column>
      <el-table-column label="操作">
        <!-- eslint-disable-next-line -->
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            v-if="scope.row.ID < 100"
            @click="handleAdd(scope.$index, scope.row)"
            >增加</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-dialog title="表单弹框" v-model="dialogVisible">
            <el-form :v-model="form">
              <el-form-item label="设备名称" :label-width="formLabelWidth">
                <el-col>
                  <el-input v-model="form.name" />
                </el-col>
              </el-form-item>
              <el-form-item label="ip地址" :label-width="formLabelWidth">
                <el-col>
                  <el-input v-model="form.address" />
                </el-col>
              </el-form-item>
              <el-form-item label="设备类型" :label-width="formLabelWidth">
                <el-select v-model="form.type" placeholder="选择设备类型">
                  <el-option label="开关" value="开关" />
                  <el-option label="温度传感器" value="温度传感器" />
                  <el-option label="湿度传感器" value="温度传感器" />
                  <el-option label="气体传感器" value="气体传感器" />
                  <el-option label="水位监测" value="水位监测" />
                </el-select>
              </el-form-item>
              <el-form-item
                v-show="form.type != '开关'"
                label="传感器范围"
                :label-width="formLabelWidth"
              >
                <el-col>
                  <el-input v-model="form.minn" placeholder="最小值" />
                </el-col>
                <el-col :span="2" class="line">-</el-col>
                <el-col>
                  <el-input v-model="form.maxx" placeholder="最大值" />
                </el-col>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirm"
                  >确定</el-button
                >
              </span>
            </template>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { ref, reactive, onMounted, onUnmounted } from "vue";

export default {
  name: "device",
  setup() {
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

    var dialogVisible = ref(false);
    var data = reactive({ Array: [] }); //设备树
    var form = reactive({ name: "", type: "开关", address: "", minn: 0, maxx: 0 }); //修改或添加的表单
    //console.log("client connecting to " + address);
    const getData = () => {
      const address = "ws://localhost:10077";
      const socket = new WebSocket(address);

      socket.onopen = function () {
        socket.send(
          JSON.stringify({
            func: 5,
          })
        );
        console.log("info: ws connected");
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
        //console.log(msg)
        //console.log(JSON.parse(msg.data))
        data.Array = JSON.parse(msg.data);
      };
    };

    const fetchData = () => {
      getData();
      console.log("轮询数据");
    };

    const sendForm = () => {
      const address = "ws://localhost:10077";
      const socket = new WebSocket(address);

      socket.onopen = function () {
        socket.send(
          JSON.stringify({
            func: 4,
            data: form,
          })
        );
        console.log(
          JSON.stringify({
            func: 4,
            data: form,
          })
        );
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

    const handleAdd = (index, obj) => {
      dialogVisible.value = true;
      //console.log(dialogVisible);
      console.log(obj);
      console.log(index);
      form["ID"] = obj.ID * 100 + obj.children.length + 1;
    };
    // data.Array[index].children

    const handleEdit = (index, obj) => {};
    const handleDelete = (index, obj) => {};

    const confirm = () => {
      console.log("添加节点");
      sendForm();
    };

    return {
      data,
      dialogVisible,
      form,
      formLabelWidth: "120px",
      handleAdd,
      handleEdit,
      handleDelete,
      confirm,
    };
  },
};
</script>

<style scoped>
.v-modal {
  opacity: 0.7 !important;
  background: rgba(0, 0, 0, 0.7) !important;
}
</style>