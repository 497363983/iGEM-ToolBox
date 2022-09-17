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
                      <el-row v-if="git">
                        <strong>version:</strong>
                        {{ useGitLabStore().git.version }}
                      </el-row>
                      <el-row v-else>
                        <el-col>
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
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="currentTag" type="border-card">
              <el-tab-pane label="Pages" name="pages"> Pages </el-tab-pane>
              <el-tab-pane label="Templates" name="templates">
                Templates
              </el-tab-pane>
            </el-tabs>
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
import { isGit } from "@/utils/git";
import { useGitLabStore } from "@/store";
const git = ref(false);
const currentTag = ref("pages");
onMounted(async () => {
  git.value = await isGit();
  console.log(useGitLabStore().git.version);
});
</script>
