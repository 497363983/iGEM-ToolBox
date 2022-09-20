<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="test">test</el-button>
  </div>
</template>

<script setup>
// import { pullProject } from "@/utils/git";
import { useUserStore, useCompetitionStore } from "@/store";
import { SyncFiles, SyncFiles_return } from "../utils/useIPC";

async function test() {
  // const { username, accsessTokens } = useUserStore().$state;
  // const { projectPath } = useTemplateStore().$state;
  // const { gitPath } = useGitLabStore().$state;
  // await pullProject({
  //   username,
  //   accsessTokens,
  //   projectPath,
  //   gitPath,
  //   success: (res) => {
  //     console.log("hh", res);
  //   },
  // });
  const filelist = [
    {
      filename: "test",
      filepath: "E:\\desktop\\图片1.png",
      type: "test",
    },
  ];
  SyncFiles(
    filelist,
    useUserStore().username,
    useUserStore().password,
    useCompetitionStore().teamID
  );
}

SyncFiles_return();
</script>
