<template>
  <el-config-provider :locale="language">
    <div style="height: 100vh">
      <el-container style="height: 100%">
        <el-aside width="auto">
          <el-menu
            style="height: 100%"
            default-active="/"
            mode="vertical"
            :router="true"
            :collapse="true"
          >
            <el-menu-item index="/">
              <el-icon>
                <SvgIcon iconClass="home" />
              </el-icon>
              <template #title>
                <span>Home</span>
              </template>
            </el-menu-item>
            <el-menu-item index="wiki">
              <el-icon>
                <SvgIcon iconClass="wiki" />
              </el-icon>
              <template #title>
                <span>Wiki</span>
              </template>
            </el-menu-item>
            <el-menu-item index="literature">
              <el-icon>
                <SvgIcon iconClass="literature" />
              </el-icon>
              <template #title>
                <span>Literature</span>
              </template>
            </el-menu-item>
            <el-menu-item index="team">
              <el-icon>
                <SvgIcon iconClass="team" />
              </el-icon>
              <template #title>
                <span>Team</span>
              </template>
            </el-menu-item>
            <el-divider />
            <el-menu-item index="about">
              <el-icon>
                <SvgIcon iconClass="about" />
              </el-icon>
              <template #title>
                <span>About</span>
              </template>
            </el-menu-item>
            <el-menu-item index="setting">
              <el-icon>
                <SvgIcon iconClass="setting" />
              </el-icon>
              <template #title>
                <span>Setting</span>
              </template>
            </el-menu-item>
            <div class="user-menu"></div>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view class="view" />
        </el-main>
      </el-container>
    </div>
    <el-dialog
      v-model="useUserStore().isTrue"
      full-screen
      lock-scroll
      append-to-body
      destroy-on-close
      fullscreen
      :show-close="false"
    >
      <el-row justify="end">
        <el-select
          v-model="useConfigStore().theme.currentTheme"
          @change="useConfigStore().save()"
        >
          <el-option
            v-for="(item, index) in useConfigStore().theme.themeList"
            :key="index"
            :label="Uppercase(item)"
            :value="item"
          />
        </el-select>
      </el-row>
      <Login v-if="useUserStore().isTrue" />
      <SetTeam />
    </el-dialog>
  </el-config-provider>
</template>
<style lang="scss">
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
* {
  padding: 0;
  margin: 0;
}
html {
  // overflow: -moz-hidden-unscrollable;
  height: 100vh;
}
// body::-webkit-scrollbar {
//   display: none;
// }
body {
  // -ms-overflow-style: none;
  height: 100vh;
}
*:focus-visible {
  outline: 0;
}
#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.content {
  display: inline-block;
  // padding-top: 20px;
  // width: calc(100% - 100px);
  // height: 100vh;
  top: 0;
  left: 100px;
  position: relative;
  .content-manage {
    box-sizing: border-box;
    padding: 20px;
    // height: 100%;
    width: 100%;

    font-size: 14px;
    top: 26px;
  }
  // .close {
  //   font-size: 26px;
  //   float: right;
  //   margin-right: 30px;
  //   cursor: pointer;
  // }
}
</style>
<script setup>
import "../../icons";
import {
  useConfigStore,
  useGitLabStore,
  useUserStore,
  // useCompetitionStore,
} from "@/store";
import { computed, onMounted } from "vue";
import { Uppercase } from "@/utils";
import { getBranch } from "@/utils/git";
import { getInstallationPath, checkCookie } from "@/utils/useIPC";
import Login from "@/views/Login";
import SetTeam from "@/views/SetTeam";

useUserStore().$subscribe((mutation, state) => {
  useUserStore().save();
  console.log(mutation, state);
});

onMounted(async () => {
  // getElectronStore();
  checkCookie(useUserStore().username, useUserStore().password, (res) => {
    useUserStore().isTrue = res ? false : true;
    if (res) {
      getBranch();
      useGitLabStore().getGit();
      getInstallationPath();
    }
  });
});

const language = computed(() => {
  const configStore = useConfigStore();
  const language = computed(() => configStore.language);
  return language.value.languageList[language.value.currentLanguage];
});
</script>
