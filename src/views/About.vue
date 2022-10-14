<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="test">test</el-button>
  </div>
</template>

<script setup>
// import { useUserStore } from "@/store";
// import {  isGitRepository, gitLog } from "@/utils/git";
// import { checkFile } from "@/utils/files";
// import { useUserStore } from "@/store";
import { getReference } from "@/api/reference";
async function test() {
  getReference({
    doi: "10.1021/acschembio.0c00650",
    success: ({ reference }) => {
      console.log(reference);
    },
  });
  // cloneProject({
  //   username: useUserStore().username,
  //   accessTokens: useUserStore().accessTokens,
  // });
  // console.log(
  //   gitLog({from: '9-1-2022', to: '10-11-2022'}),
  //   isGitRepository(),
  //   // checkFile("E:\\iGEM")
  // );
}
</script>
