<template>
  <component :is="itemIs"></component>
</template>
<script>
import {
  ElSelect,
  ElOption,
  ElDatePicker,
  ElInput,
  ElDivider,
  ElSwitch
} from "element-plus";
import { h } from "vue";
export default {
  name: "FormItem",
  // components: {
  //   ElSelect,
  //   ElDatePicker
  // },
  data() {
    return {
      datepicker: [
        "year",
        "month",
        "date",
        "dates",
        "datetime",
        "week",
        "datetimerange",
        "daterange",
        "monthrange"
      ],
      input: ["text", "textarea"]
    };
  },
  props: {
    type: String,
    prop: Object,
    options: Object,
    headingValue: String
  },
  computed: {
    itemIs: function() {
      if (this.$props.type === "select") {
        let children = Array.from({ length: this.$props.options.length }).map(
          (value, index) => {
            return h(ElOption, this.$props.options[index], null);
          }
        );
        return h(ElSelect, this.$props.prop, { default: () => children });
      }
      if (this.$props.type === "datePicker") {
        return h(ElDatePicker, this.$props.prop);
      }
      if (this.$props.type === "input") {
        return h(ElInput, this.$props.prop);
      }
      if (this.$props.type === "heading") {
        return h("h1", this.$props.headingValue);
      }
      if (this.$props.type === "divider") {
        return h(ElDivider, this.$props.prop);
      }
      if (this.$props.type === "switch") {
        return h(ElSwitch, this.$props.prop);
      }
      return null;
    }
  }
};
</script>