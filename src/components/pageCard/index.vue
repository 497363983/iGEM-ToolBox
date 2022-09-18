<template>
  <div class="page-card">
    <el-card shadow="never">
      <el-row>
        <el-col :span="8">
          <strong>{{ page.name }}</strong>
        </el-col>
        <el-col :span="16">
          <el-button :loading="loadingEdit" type="primary" :icon="Edit" @click="edit"></el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { Edit } from "@element-plus/icons-vue";
import { useWikiEditorStore } from "@/store";
const props = defineProps({
  page: Object,
});
const loadingEdit = ref(false);
function edit() {
  loadingEdit.value = true;
  useWikiEditorStore().setPath(props.page.path);
  useWikiEditorStore().openEditor(()=>{
    loadingEdit.value = false;
  });
}
</script>

<style lang="scss" scoped>
.page-card {
  margin: {
    top: 5px;
  }
  &:hover {
    .el-card {
      background-color: var(--el-color-primary-light-9);
    }
  }
}
</style>
