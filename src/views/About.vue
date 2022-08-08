<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="test">test</el-button>
  </div>
</template>

<script setup>
import { pullProject } from "@/utils/git";
import { useUserStore, useTemplateStore, useGitLabStore } from "@/store";

async function test() {
  const { username, accsessTokens } = useUserStore().$state;
  const { projectPath } = useTemplateStore().$state;
  const { gitPath } = useGitLabStore().$state;
  await pullProject({
    username,
    accsessTokens,
    projectPath,
    gitPath,
    success: (res) => {
      console.log("hh", res);
    },
  });
}
</script>
