<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="test">test</el-button>
  </div>
</template>

<script setup>
// import { pullProject } from "@/utils/git";
import { useUserStore } from "@/store";
import { SyncFiles, SyncFiles_return} from "../utils/useIPC";


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
      filepath:
        "D:\\github\\iGEM-ToolBox\\src\\assets\\logo.png",
      type: "ima",
    },
    // {
    //   filename: "aaa",
    //   filepath:
    //     "E:\\iGEM\\zjut-china\\src\\assets\\fonts\\hack-bold-subset.woff",
    //   type: "ima",
    // },
  ];
  const username = useUserStore().username;
  const password = useUserStore().password;
  SyncFiles(filelist, username, password)
}

SyncFiles_return()


</script>