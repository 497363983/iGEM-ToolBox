<template>
  <label
    :for="bindElement?bindElement.id:''"
    :id="id"
    class="menuItem"
    :class="{ 'is-active': isActive? isActive(): null, 'dropMenu': role == 'dropItem' }"
    @click="action"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="title"
    :ref="setRef"
  >
    <SvgIcon :iconClass="icon" />
    <section v-if="role == 'dropItem'" class="dropdown">
      <label
        :for="item.bindElement?item.bindElement.id:''"
        :id="item.id"
        v-for="(item, index) in children"
        :key="index"
        class="menuItem"
        @click="item.action"
        :class="{ 'is-active': item.isActive?item.isActive():null}"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        :title="item.title"
        :ref="setRef"
      >
        <SvgIcon :iconClass="item.icon" />
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
      @change="bindElement.event.change?bindElement.event.change($event):null"
      :id="bindElement.id"
      :type="bindElement.type?bindElement.type:''"
      :accept="bindElement.accept"
    />
  </label>
</template>
<style lang="scss" scoped>
</style>
<script>
import { ref, nextTick } from "vue";
import "bootstrap/js/dist/popover";
// import "bootstrap/dist/js/bootstrap.bundle";
import Tooltip from "bootstrap/js/dist/tooltip";
export default {
  props: {
    role: {
      type: String,
      default: "item",
      validator(value) {
        return ["item", "dropItem"].includes(value);
      }
    },
    icon: {
      type: String,
      required: true
    },
    action: {
      type: Function,
      default: () => {}
    },
    isActive: Function,
    children: Array,
    id: String,
    bindElement: Object,
    title: String
  },
  setup() {
    const refs = ref([]);
    const setRef = el => {
      refs.value.push(el);
    };

    nextTick(() => {
      // console.log(refs.value);
      refs.value.map(function(tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl);
      });
    });
    return {
      setRef
    }
  }
};
</script>