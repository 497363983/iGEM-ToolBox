<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="test">test</el-button>
  </div>
</template>

<script setup>
// import { useUserStore } from "@/store";
// import { cloneProject } from "@/utils/git";
import { useUserStore } from "@/store";
async function test() {
  // cloneProject({
  //   username: useUserStore().username,
  //   accessTokens: useUserStore().accessTokens,
  // });
  useUserStore().setState(useUserStore().$state)
}
</script>
