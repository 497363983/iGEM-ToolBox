<template>
  <div id="setting" style="height: 100%;">
    <el-container style="height: 100%">
      <el-aside style="height: 100%">
        <el-menu style="height: 100%;" default-active="user" mode="vertical">
          <el-menu-item index="user">
            <el-icon>
              <SvgIcon iconClass="user" />
            </el-icon>
            <span>User</span>
          </el-menu-item>
          <el-menu-item index="common">
            <el-icon>
              <SvgIcon iconClass="setting" />
            </el-icon>
            <span>Common</span>
          </el-menu-item>
          <el-menu-item index="update">
            <el-icon>
              <SvgIcon iconClass="update" />
            </el-icon>
            <span>Update</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-scrollbar height="100%">
          <el-form
            ref="form"
            :model="this.$store.state.config"
            label-position="left"
            label-width="100px"
            style="width: 90%"
            @validate="react"
          >
            <el-form-item
              v-for="(item, index) in this.$store.state.config"
              :key="index"
              v-bind="item.itemWrapProp"
            >
              <FormItem v-bind="item" v-model="item.value"></FormItem>
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
</style>
<script>
import { ElMessage } from "element-plus";
import { elSwitch } from "element-plus";
import FormItem from "../components/FormItem/index.vue";
// import FormItem from "@/components/FormItem"
export default {
  name: "Setting",
  components: {
    FormItem
  },
  data() {
    return {
      elswitch: elSwitch
    };
  },
  methods: {
    react: function() {
      ElMessage({
        message: "success",
        type: "success"
      });
    }
  }
};
</script>