<template>
  <div class="page-card">
    <el-card shadow="never">
      <el-row>
        <el-col :span="8">
          <strong>{{ page.name }}</strong>
        </el-col>
        <el-col :span="16">
          <el-button
            v-for="(item, index) in block"
            :key="index"
            :loading="loadingEdit"
            type="primary"
            :icon="Edit"
            @click="edit(item)"
            >{{ item.name }}</el-button
          >
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import { Edit } from "@element-plus/icons-vue";
import { useWikiEditorStore } from "@/store";
import { readFile } from "@/utils/files";
const props = defineProps({
  page: Object,
});
const block = ref([]);
const loadingEdit = ref(false);
function edit(item) {
  loadingEdit.value = true;
  useWikiEditorStore().setPath(props.page.path);
  useWikiEditorStore().block = item.name;
  useWikiEditorStore().page = props.page.name;
  useWikiEditorStore().readBlock();
  useWikiEditorStore().openEditor(() => {
    loadingEdit.value = false;
  });
}

async function getBlock() {
  let content = await readFile(props.page.path);
  //<!-- iGEM-ToolBox:WIKI{{Experiment4}} -->
  let regx = /(?<=<!-- iGEM-ToolBox:WIKI{{)(.+?)(?=}} (|start)-->)/g;
  let res = content.match(regx);
  if (res) {
    res.map((item) => {
      block.value.push({
        name: item,
      });
    });
  }
}

onMounted(() => {
  getBlock();
});
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
