<template>
  <div>
    <el-descriptions :column="1" direction="vertical" size="large" border>
      <el-descriptions-item label="Type">
          <el-input></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="author">
          
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  Reference: Object
});
</script>