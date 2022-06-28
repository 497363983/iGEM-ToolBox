<template>
  <div>
    <el-descriptions :column="1" direction="vertical" size="large" border>
      <el-descriptions-item label="Type">
        {{reference.type}}
          <el-input></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="author">
          
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { defineProps,ref } from "vue";
const props = defineProps({
  modelValue: Object
});

const reference = ref(props.modelValue)
console.log(reference)
</script>