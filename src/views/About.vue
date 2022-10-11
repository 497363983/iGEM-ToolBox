<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="test">test</el-button>
  </div>
</template>

<script setup>
// import { useUserStore } from "@/store";
import {  isGitRepository, gitLog } from "@/utils/git";
// import { checkFile } from "@/utils/files";
// import { useUserStore } from "@/store";
async function test() {
  // cloneProject({
  //   username: useUserStore().username,
  //   accessTokens: useUserStore().accessTokens,
  // });
  console.log(
    gitLog({from: '9-1-2022', to: '10-11-2022'}),
    isGitRepository(),
    // checkFile("E:\\iGEM")
  );
}
</script>
