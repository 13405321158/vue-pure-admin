<script setup lang="ts">
import { reactive } from "vue";
import { http } from "/@/utils/http";
import { VxeGridProps } from "vxe-table";

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
  toolbarConfig: {
    buttons: [
      {
        code: "add_actived",
        name: "新增",
        status: "perfect",
        icon: "fa fa-plus"
      },
      {
        code: "del_cancel",
        name: "批量删除",
        status: "perfect",
        icon: "fa fa-trash-o"
      }
    ],
    perfect: true,
    zoom: {
      iconIn: "fa fa-arrows-alt",
      iconOut: "fa fa-expand"
    },
    custom: {
      icon: "fa fa-cog"
    }
  },
  proxyConfig: {
    seq: true,
    props: {
      result: "data",
      total: "count"
    },
    ajax: {
      query: ({ page }) => {
        const param = Object.assign(
          {},
          { limit: page.pageSize, page: page.currentPage }
        );

        return http
          .post("/api/backend/user/r01", { data: param })
          .then(function (obj) {
            return obj;
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
