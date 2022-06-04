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
      <ElFormItem>
        <ElButton type="primary" @click="addBill">添加账单</ElButton>
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
  <ElDialog v-model="showAddBill" title="添加账单" width="600px" draggable destroy-on-close
            @close="addBillClose">
    <ElForm ref="formBillEl" :model="formBill" :rules="rules" label-position="top">
      <ElFormItem label="账单时间" prop="time">
        <ElDatePicker v-model="formBill.time" type="datetime" />
      </ElFormItem>
      <ElFormItem label="账单类型" prop="type">
        <ElSelect v-model="formBill.type">
          <ElOption label="收入" :value="1" />
          <ElOption label="支出" :value="0" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="账单分类" prop="category">
        <ElSelect v-model="formBill.category">
          <ElOption v-for="cate in categories" :key="cate.id" :value="cate.id" :label="cate.name" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="账单金额" prop="amount">
        <ElInput v-model.number="formBill.amount"></ElInput>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton @click="showAddBill = false">取消</ElButton>
      <ElButton type="primary" @click="onAddBill">确定</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import {
  ElTable,
  ElForm,
  ElButton,
  ElDialog,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElFormItem,
  ElTableColumn, FormInstance
} from "element-plus";
import { reactive, ref } from "vue";
import { getBillByInfo, addBill as addBillApi } from "@/service";
import { Bill, BillWithCategory, Category } from "@/types";
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
const showAddBill = ref(false);
const addBill = () => showAddBill.value = true;
const formBillEl = ref<FormInstance>();
const onAddBill = () => {
  formBillEl.value?.validate((valid) => {
    if (valid) {
      addBillApi(formBill);
      showAddBill.value = false;
      query();
    }
  });
};
const addBillClose = () => {
  formBillEl.value?.resetFields();
};
const formBill = reactive<Bill>({
  time: "" as unknown as Date,
  type: "" as unknown as 0 | 1,
  category: "",
  amount: "" as unknown as number
});
const rules = {
    time: [{ required: true, message: "请填写创建时间", trigger: "change" }],
    type: [{ required: true, message: "请选择账单类型", trigger: "change" }],
    amount: [{
      required: true, validator: (rule, val, cb) => {
        if (/^([1-9]\d*|0)(\.\d{1,2})?$/g.test(val)) {
          cb();
        } else {
          cb(new Error("请输入正确金额"));
        }
      }, trigger: "blur"
    }]
  }
;
query();
</script>

<style lang="scss" scoped>
.page {

}
</style>
