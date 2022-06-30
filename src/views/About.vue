<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="cloneProject">test</el-button>
  </div>
</template>

<script setup>
import { cloneProject } from "@/utils/git";
</script>
