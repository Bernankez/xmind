<template>
  <div class="page">
    <ElForm :model="form"></ElForm>
    <ElTable :data="table" fit>

    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { ElTable, ElForm } from "element-plus";
import { reactive, ref } from "vue";
import { useBill } from "@/composition";

const form = reactive({
  month: ""
});
const table = ref([]);
useBill().then(res => {
  console.log(res);
});
</script>

<style lang="scss" scoped>
.page {

}
</style>
