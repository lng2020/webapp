<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="日期" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="属性"> </el-table-column>
      <el-table-column label="操作" width="270">
        <!-- eslint-disable-next-line -->
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            v-if="scope.row.depth == 1"
            @click="dialogVisible = true"
            >增加</el-button
          >
          <el-dialog title="表单弹框" v-model="dialogVisible" width="30%">
            <!-- <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="姓名">
                <el-input v-model="scope.row.name"></el-input>
              </el-form-item>
              <el-form-item label="仪器类型">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form> -->
            <baseform>
            </baseform>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>

          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import baseform from "./BaseForm.vue";

export default {
  components: {baseform},
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "传感器",
        },
        {
          value: "选项2",
          label: "空调",
        },
        {
          value: "选项3",
          label: "开关",
        },
      ],
      value: "",
      dialogVisible: false,
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "端口1",
          depth: 1,
          children: [
            {
              id: 11,
              date: "2016-05-01",
              name: "IO控制单元1",
              depth: 2,
              address: "",
            },
          ],
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "端口2",
          depth: 1,
          address: "",
          children: [
            {
              id: 21,
              date: "2016-05-01",
              name: "空调1",
              depth: 2,
              address: "",
            },
            {
              id: 22,
              date: "2016-05-01",
              name: "空调2",
              depth: 2,
              address: "",
            },
          ],
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "端口3",
          depth: 1,
          address: "",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "温湿度1",
              depth: 2,
              address: "",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "SF氧气探测器1",
              depth: 2,
              address: "",
            },
            {
              id: 33,
              date: "2016-05-01",
              name: "SF氧气探测器2",
              depth: 2,
              address: "",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleAdd() {},
  },
};
</script>
