<template>
  <div class="page">
    <ElForm :model="form" inline>
      <ElFormItem label="月份：" prop="month">
        <ElDatePicker v-model="form.month" type="month" value-format="YYYY-MM-DD" clearable @change="query" />
      </ElFormItem>
      <ElFormItem label="账单分类：" prop="category">
        <ElSelect v-model="form.category" clearable @change="query">
          <ElOption v-for="cate in categories" :key="cate.id" :value="cate.id" :label="cate.name"></ElOption>
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <ElTable :data="table" fit>
      <ElTableColumn type="index" label="序号" width="80" align="center"></ElTableColumn>
      <ElTableColumn label="账单时间" prop="time" align="center">
        <template v-slot="{row}">
          {{ dayjs(row.time).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="账单类型" prop="type" align="center"></ElTableColumn>
      <ElTableColumn label="账单分类" prop="category" align="center">
        <template v-slot="{row}">
          {{ row.categoryInfo?.name || row.category }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="账单金额" prop="amount" align="center"></ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { ElTable, ElForm, ElSelect, ElOption, ElDatePicker, ElFormItem, ElTableColumn } from "element-plus";
import { reactive, ref } from "vue";
import { getBill, getBillByInfo } from "@/service";
import { BillWithCategory, Category } from "@/types";
import dayjs from "dayjs";
import { useCategory } from "@/composition";

const form = reactive({
  month: "",
  category: ""
});
const categories = ref<Category[]>([]);
useCategory().then(res => {
  categories.value = res;
});
const table = ref<BillWithCategory[]>([]);
const query = () => {
  getBillByInfo(form).then(res => {
    table.value = res;
  });
};
query();
</script>

<style lang="scss" scoped>
.page {

}
</style>
