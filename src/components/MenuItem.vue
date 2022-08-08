<template>
  <el-popover
    :effect="useConfigStore().theme.currentTheme"
    :disabled="!(role === 'dropItem')"
  >
    <template #reference>
      <label
        :for="bindElement ? bindElement.id : ''"
        :id="id"
        class="menuItem"
        :class="{
          'is-active': isActive ? isActive() : null,
          dropMenu: role == 'dropItem',
        }"
        @click.prevent="action"
      >
        <el-tooltip
          :effect="useConfigStore().theme.currentTheme"
          :content="title"
          placement="top"
        >
          <SvgIcon :iconClass="icon" />
        </el-tooltip>
      </label>
    </template>
    <template #default v-if="role === 'dropItem'">
      <section class="dropdown">
        <label
          :for="item.bindElement ? item.bindElement.id : ''"
          :id="item.id"
          v-for="(item, index) in children"
          :key="index"
          class="menuItem"
          @click.prevent="item.action"
          :class="{ 'is-active': item.isActive ? item.isActive() : null }"
        >
          <el-tooltip
            :effect="useConfigStore().theme.currentTheme"
            :content="item.title"
            placement="bottom"
          >
            <SvgIcon :iconClass="item.icon" />
          </el-tooltip>
          <!-- <span
          v-if="item.bindElement"
          v-html="item.bindElement.html?item.bindElement.html:''"
          :style="item.bindElement.style"
          ></span>-->
        </label>
      </section>
      <!-- <span
      @change="bindElement.event.change?bindElement.event.change():null"
      @click="bindElement.event.click?bindElement.event.click():null"
      v-html="bindElement.html?bindElement.html:''"
      :style="bindElement.style"
      ></span>-->
      <input
        v-if="bindElement"
        v-show="bindElement.isShow"
        @change="
          bindElement.event.change ? bindElement.event.change($event) : null
        "
        :id="bindElement.id"
        :type="bindElement.type ? bindElement.type : ''"
        :accept="bindElement.accept"
      />
    </template>
  </el-popover>
</template>
<style lang="scss" scoped>
:focus {
  outline: none;
}
.dropdown {
  svg {
    height: 30px;
  }
  // background-color: #ffffff;
  // border-radius: 5px;
  // box-shadow: 0px 0px 2px #cec9c9;
}
label.menuItem {
  display: inline-block;
  color: #000000;
  border-radius: 5px;
  height: 100%;
  width: 30px;
  text-align: center;
  cursor: pointer;
  svg {
    height: 30px;
  }
  &:hover {
    background-color: #eaebec;
  }
  &.is-active {
    color: rgb(54, 151, 241);
  }
}
</style>
<script setup>
import { defineProps } from "vue";
import { useConfigStore } from "@/store";

defineProps({
  role: {
    type: String,
    default: "item",
    validator(value) {
      return ["item", "dropItem"].includes(value);
    },
  },
  icon: {
    type: String || Object,
    required: true,
  },
  action: {
    type: Function,
    default: () => {},
  },
  isActive: Function,
  children: Array,
  id: String,
  bindElement: Object,
  title: String,
});
</script>
