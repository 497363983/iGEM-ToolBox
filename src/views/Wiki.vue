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
                        <strong>version: </strong>
                        {{ useGitLabStore().git.version }}
                      </el-row>
                      <el-row v-else>
                        <el-col>
                          <el-button
                            type="primary"
                            @click="openLink('https://git-scm.com/downloads')"
                            ><SvgIcon iconClass="out_link" />
                            Download
                          </el-button>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-main>
              </el-container>
            </el-card>
          </el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="24">
            <el-tabs
              style="margin-top: 10px; height: 60vh"
              v-model="currentTag"
              tab-position="left"
            >
              <el-tab-pane style="height: 100%" label="Pages" name="pages">
                <div
                  v-if="pages.length !== 0"
                  class="infinite-list-wrapper"
                  style="overflow: auto; height: 100%"
                >
                  <ul
                    v-infinite-scroll="loadPages"
                    class="pages-list infinite-list"
                  >
                    <li v-for="(page, index) in pages" :key="index">
                      <pageCard :page="page"></pageCard>
                    </li>
                  </ul>
                </div>
                <el-empty v-else description="No pages">
                  <el-button type="primary">Init</el-button>
                </el-empty>
              </el-tab-pane>
              <!-- <el-tab-pane
                style="height: 100%"
                label="Templates"
                name="templates"
              >
                <div
                  v-if="templates.length !== 0"
                  class="infinite-list-wrapper"
                  style="overflow: auto; height: 100%"
                >
                  <ul
                    v-infinite-scroll="loadTemplates"
                    class="pages-list infinite-list"
                  >
                    <li v-for="(template, index) in templates" :key="index">
                      <pageCard :page="template"></pageCard>
                    </li>
                  </ul>
                </div>
                <el-empty v-else description="No templates">
                  <el-button type="primary">Init</el-button>
                </el-empty>
              </el-tab-pane> -->
              <el-tab-pane style="height: 100%" label="Log" name="log">
                <div
                  v-if="logList.length !== 0"
                  class="infinite-list-wrapper"
                  style="overflow: auto; height: 100%"
                >
                  <div
                    v-infinite-scroll="loadLogs"
                    class="pages-list infinite-list"
                  >
                    <el-timeline :reverse="reverse">
                      <el-timeline-item
                        v-for="(log, index) in logList"
                        :key="index"
                        :timestamp="log.date"
                      >
                        {{ log.hash.slice(0, 5) }}-{{ log.author_name }}-{{
                          log.message
                        }}
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </div>
                <el-empty v-else description="No logs"></el-empty>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog
      class="editor"
      v-model="useWikiEditorStore().showEditor"
      :title="useWikiEditorStore().page"
      lock-scroll
      append-to-body
      destroy-on-close
      fullscreen
    >
      <template #header>
        {{ useWikiEditorStore().page }}:{{ useWikiEditorStore().block }}
      </template>
      <TiptapEditor />
    </el-dialog>
  </div>
</template>
<script setup>
import TiptapEditor from "@/TiptapEditor/index.vue";
import { ref, onMounted } from "vue";
import { isGit, gitInit, getGitVersion } from "@/utils/git";
import {
  useGitLabStore,
  useTemplateStore,
  // useConfigStore,
  useWikiEditorStore,
} from "@/store";
import { getDirTree, joinPath } from "@/utils/files";
import pageCard from "@/components/pageCard";
import { openLink } from "@/utils/useIPC";
import { gitLog } from "@/utils/git";
const git = ref(false);
const currentTag = ref("pages");
const pages = ref([]);
// const templates = ref([]);
const logList = ref([]);

function loadPages() {
  let dirs = getDirTree(
    joinPath(
      useTemplateStore().getProjectPath,
      useTemplateStore().getPageTemplatePath
    )
  );
  pages.value = dirs.filter((item) => {
    return item.extname.replace(".", "") === useTemplateStore().getPageExtName;
  });
}

// function loadTemplates() {
//   let dirs = getDirTree(
//     joinPath(
//       useTemplateStore().getProjectPath,
//       useTemplateStore().getTemplatesPath
//     )
//   );
//   templates.value = dirs.filter((item) => {
//     return item.extname.replace(".", "") === "html";
//   });
// }

async function loadLogs() {
  logList.value = (await gitLog()).all;
}

onMounted(async () => {
  git.value = await isGit();
  loadPages();
  loadLogs();
  getGitVersion();
  gitInit();
});
</script>

<style lang="scss" scoped>
.pages-list {
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
<style lang="scss">
.el-tabs--left .el-tabs__content {
  height: 100%;
  display: block;
}
.editor {
  .el-dialog__body {
    height: 85vh;
  }
}
</style>
