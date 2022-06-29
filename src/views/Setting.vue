<template>
  <div id="setting" style="height: 100%">
    <el-container style="height: 100%">
      <el-aside style="height: 100%">
        <el-menu
          style="height: 100%"
          :default-active="activeIndex"
          mode="vertical"
        >
          <el-menu-item index="user" @click="scrollTo">
            <el-icon>
              <SvgIcon iconClass="user" />
            </el-icon>
            <span>User</span>
          </el-menu-item>
          <el-menu-item index="competition" @click="scrollTo">
            <el-icon>
              <SvgIcon iconClass="igem" />
            </el-icon>
            <span>Competition</span>
          </el-menu-item>
          <el-menu-item index="common" @click="scrollTo">
            <el-icon>
              <SvgIcon iconClass="setting" />
            </el-icon>
            <span>Common</span>
          </el-menu-item>
          <el-menu-item index="update" @click="scrollTo">
            <el-icon>
              <SvgIcon iconClass="update" />
            </el-icon>
            <span>Update</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-scrollbar ref="settingScrollBar" @scroll="scroll" height="100%">
          <el-form
            ref="form"
            label-position="left"
            label-width="100px"
            style="width: 90%"
          >
            <div class="title_wrapper">
              <h1>User</h1>
            </div>
            <div class="user-card">
              <el-avatar size="large">{{ useUserStore().username }}</el-avatar>
              <el-form-item label="Username">
                <el-input
                  @change="react(`username`)"
                  v-model="useUserStore().username"
                ></el-input>
              </el-form-item>
              <el-form-item label="Password">
                <el-input
                  @change="react(`password`)"
                  type="password"
                  v-model="useUserStore().password"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item label="Realname">
                <el-input
                  @change="react(`realname`)"
                  v-model="useUserStore().realname"
                ></el-input>
              </el-form-item>
              <el-form-item label="Description">
                <el-input
                  @change="react(`description`)"
                  type="textarea"
                  v-model="useUserStore().description"
                  :show-word-limit="true"
                ></el-input>
              </el-form-item>
              <!-- <el-button-group>
                <el-button type="danger">logout</el-button>
              </el-button-group> -->
            </div>
            <el-divider />
            <div class="title_wrapper">
              <h1>Competition</h1>
            </div>
            <el-form-item label="Year">
              <el-date-picker
                @change="react(`year`)"
                v-model="useConfigStore().competition.year"
                type="year"
              />
            </el-form-item>
            <el-form-item label="Role">
              <el-select
                @change="react(`role`)"
                v-model="useConfigStore().competition.role"
              >
                <el-option
                  v-for="(item, index) in useConfigStore().competition
                    .ALLOWED_ROLE"
                  :key="index"
                  :label="Uppercase(item)"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Group">
              <el-select
                @change="react(`group`)"
                v-model="useConfigStore().competition.group"
              >
                <el-option
                  v-for="(item, index) in useConfigStore().competition
                    .ALLOWED_GROUP"
                  :key="index"
                  :label="Uppercase(item)"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-divider />
            <div class="title_wrapper">
              <h1>Common</h1>
            </div>
            <el-form-item label="Language">
              <el-select
                @change="react(`language`)"
                v-model="useConfigStore().language.currentLanguage"
              >
                <el-option
                  v-for="(item, key) in useConfigStore().language.languageMap"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Theme">
              <el-select
                @change="react(`theme`)"
                v-model="useConfigStore().theme.currrentTheme"
              >
                <el-option
                  v-for="(item, index) in useConfigStore().theme.themeList"
                  :key="index"
                  :label="Uppercase(item)"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-divider />
            <div class="title_wrapper">
              <h1>Update</h1>
            </div>
            <el-form-item label="AutoUpdate">
              <el-switch
                @change="react(`autoupdate`)"
                v-model="useConfigStore().update.autoUpdate"
              ></el-switch>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-main {
  overflow: hidden;
  margin: 0;
  padding-bottom: 0;
}
.title_wrapper {
  margin: 10px 0 10px 0;
}
* {
  scroll-behavior: smooth;
}
</style>
<script setup>
import { ElMessage } from "element-plus";
import { useConfigStore, useUserStore } from "../store";
import { Uppercase } from "../utils/index";
import { toRefs, ref } from "vue";

let activeIndex = "user";
const settingScrollBar = ref();

function react(option) {
  // TODO:check the change
  ElMessage({
    type: "success",
    message: `Set ${
      typeof option === "string" ? option.toLowerCase() : option
    } success`,
  });
}

function scroll({ scrollTop }) {
  const title = document.querySelectorAll(".title_wrapper");
  const menuItem = document.querySelectorAll("#setting .el-menu-item");
  let offsetTop = [];
  title.forEach((item) => {
    offsetTop.push(item.offsetTop);
  });
  let activetitle = 0;
  for (let n = 0; n < offsetTop.length; n++) {
    if (scrollTop >= offsetTop[n]) {
      activetitle = n;
    }
  }
  menuItem.forEach((item, index) => {
    if (activetitle === index) {
      menuItem[index].classList.add("is-active");
    } else {
      menuItem[index].classList.remove("is-active");
    }
  });
}
function scrollTo(event) {
  const { index } = toRefs(event);
  const title = document.querySelectorAll(".title_wrapper");
  let target = 0;
  title.forEach((item) => {
    if (item.innerText.toLowerCase() === index.value) {
      target = item.offsetTop;
    }
  });
  settingScrollBar.value.setScrollTop(target);
}
</script>
