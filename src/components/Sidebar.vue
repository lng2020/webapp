<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items" :key="item.index">
        <el-menu-item :index="item.index">
          <i :class="item.icon"></i>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const items = [
      {
        icon: "el-icon-lx-home",
        index: "/dashboard",
        title: "系统首页",
      },
      {
        icon: "el-icon-lx-cascades",
        index: "/eventLog",
        title: "事件记录",
      },
      {
        icon: "el-icon-lx-sort",
        index: "/realtimeData",
        title: "实时数据",
      },
      {
        icon: "el-icon-lx-sort",
        index: "/monitor",
        title: "实时监控",
      },
      {
        icon: "el-icon-lx-sort",
        index: "/device",
        title: "站点结构",
      },
    ];

    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    return {
      items,
      onRoutes,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
