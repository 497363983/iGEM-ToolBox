<template>
  <div id="wiki" style="height: 100%">
    <el-container style="height: 100%">
      <el-main>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-card>
              <el-container>
                <el-main>
                  <el-row>
                    <el-col :span="4">
                      <svgIcon
                        style="font-size: 25px"
                        iconClass="git"
                      ></svgIcon>
                    </el-col>
                    <el-col :span="20">
                      <el-row>version: {{ gitVersion }} </el-row>
                      <el-row>
                        <el-col v-if="git">
                          <el-button type="primary">Download</el-button>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-main>
              </el-container>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <!-- <TiptapEditor /> -->
  </div>
</template>
<script setup>
// import TiptapEditor from "@/TiptapEditor/index.vue";
import { ref, onMounted } from "vue";
import { getGitVersion, isGit } from "@/utils/git";
// import { useGitLabStore } from "@/store";
const gitVersion = ref("");
const git = ref(false);

onMounted(async () => {
  gitVersion.value = await getGitVersion();
  git.value = await isGit();
});
</script>
