<template>
  <el-config-provider :locale="language">
    <div style="height: 100vh;">
      <el-container style="height: 100%;">
        <el-aside width="auto">
          <el-menu
            style="height:100%;"
            :default-active="activeIndex"
            mode="vertical"
            :router="true"
            :collapse="true"
            @select="select"
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
          </el-menu>
        </el-aside>
        <el-main>
          <router-view class="view" />
        </el-main>
      </el-container>
    </div>
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
<script>
import "../../icons";
import { en, zhCn } from "element-plus/lib/locale";
export default {
  setup() {
    return {};
  },
  data() {
    return {
      activeIndex: this.$router.currentRoute.value.name
    };
  },
  mounted() {},
  methods: {
    select() {
      this.activeIndex = this.$router.currentRoute.value.name;
    }
  },
  computed: {
    language: function() {
      if (
        this.$store.state.config.find(
          item => item.itemWrapProp?.label === "Language"
        ).value === "zh"
      ) {
        console.log("zh");
        return zhCn;
      } else {
        console.log("en");
        return en;
      }
    }
  }
};
</script>
