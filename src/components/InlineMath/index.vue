<template>
  <node-view-wrapper class="math-node" @click="consolenode">
    <span v-show="!editor.isFocused" class="matn-render">{{node.attrs.mathSrc}}</span>
    <!-- <span class="math-src" :class="selected?`editable`:``">
      <span @input="update" v-show="selected" class="math-src-edtior" contenteditable="true">{{mathSrc}}</span>
      
    </span>-->
    <node-view-content
      as="div"
      v-show="editing"
      ref="mathEditor"
      @input="update"
      @blur="editBlur"
      class="math-src-edtior"
      :class="editor.isFocused?`editable`:``"
    />
  </node-view-wrapper>
</template>
<script>
import { NodeViewWrapper, nodeViewProps, NodeViewContent } from "@tiptap/vue-3";
// import { ref } from 'vue'
export default {
  name: "InlineMath",
  props: nodeViewProps,
  components: {
    NodeViewWrapper,
    NodeViewContent
  },
  data() {
    return {
      mathSrc: this.node.attrs.mathSrc,
      editing: true
    };
  },
  methods: {
    consolenode: function() {
      // this.$refs.mathEditor.$el.innerHTML = this.mathSrc;
      console.log(this.editor);
    },
    update: function() {
      // this.$emit("input", this.$el.innerHTML);
      this.updateAttributes({
        mathSrc: this.mathSrc
      });
      console.log("jjjlak", this.node.attrs.mathSrc);
    },
    editBlur: function() {
      console.log("blur", this.node.attrs.mathSrc);
    },
    setMathSrc: function() {
      const mathSrc = this.mathSrc;
      this.$refs.mathEditor.$el.innerHTML = mathSrc;
    }
  },
  mounted() {
    this.$refs.mathEditor.$el.innerHTML = this.node.attrs.mathSrc;
  }
};
</script>

<style lang="scss" scoped>
.math-node {
  display: inline;
  &:hover {
    background-color: rgba(200, 200, 255, 0.4);
  }
  &.focused {
    .math-src-editor {
      display: inline;
      &::before,
      &::after {
        content: "$";
      }
    }
  }
}
</style>