<script setup lang="ts">
import { reactive } from "vue";
import { VxeGridProps } from "vxe-table";
import { http } from "/@/utils/http/ajax";

const dataGrid = reactive({
  border: true,
  resizable: true,
  rowId: "id",
  pagerConfig: {
    pageSize: 10
  },
  checkboxConfig: {
    reserve: true
  },
  proxyConfig: {
    seq: true,
    props: {
      result: "data",
      total: "count"
    },
    ajax: {
      query: ({ page }) => {
        const queryParams = Object.assign({}, page);
        http
          .post("/api/backend/user/r01", {
            queryParams
          })
          .then(function (obj) {
            console.info(obj);
          })
          .catch(function (obj) {
            console.info(obj);
          });
      }
    }
  },
  columns: [
    { type: "checkbox", width: 50 },
    { type: "seq", width: 60 },
    { field: "id", title: "用户ID" },
    { field: "username", title: "登录名称" },
    { field: "status", title: "用户状态" }
  ]
} as VxeGridProps);
</script>

<template>
  <vxe-grid v-bind="dataGrid"></vxe-grid>
</template>
