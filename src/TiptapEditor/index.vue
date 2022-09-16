<template>
  <div class="editorContainer" id="editorContainer">
    <el-page-header title content="Wiki" />
    <div v-if="editor">
      <bubble-menu
        id="choose-menu"
        class="bubble-menu editor-menu"
        :tippy-options="{ duration: 100, maxWidth: 'none' }"
        :editor="editor"
        pluginKey="bubbleMenuOne"
      >
        <MenuItem
          v-for="(item, index) in bubble"
          :key="index"
          v-bind="item"
        ></MenuItem>
      </bubble-menu>
      <bubble-menu
        id="link-menu"
        class="bubble-menu editor-menu"
        :tippy-options="{
          duration: 100,
          placement: 'bottom',
          onDestroy: hideLinkMenu,
          onHidden: hideLinkMenu,
          onHide: hideLinkMenu,
          onClickOutside: hideLinkMenu,
          onShow: getLink,
        }"
        :editor="editor"
        :shouldShow="showLinkMenu"
        pluginKey="bubbleMenuTwo"
      >
        <div class="input-group input-group-sm" style="height: 30px">
          <span class="input-group-text">
            <SvgIcon iconClass="link" />
          </span>
          <input
            v-model="inputLink"
            type="url"
            class="form-control"
            v-bind:disabled="editor.isActive('link') && !editLinkAble"
          />
          <button
            @click="setLink"
            v-show="!editor.isActive('link') || editLinkAble"
            class="btn btn-primary"
            type="button"
          >
            Enter
          </button>
          <button
            @click="editLink"
            v-show="editor.isActive('link') && !editLinkAble"
            class="btn btn-outline-secondary"
            type="button"
          >
            <SvgIcon iconClass="edit" />
          </button>
          <button
            @click="editor.chain().focus().unsetLink().run()"
            v-show="editor.isActive('link') && !editLinkAble"
            class="btn btn-danger"
            type="button"
          >
            <SvgIcon iconClass="trash" />
          </button>
        </div>
      </bubble-menu>
      <floating-menu
        class="floating-menu editor-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
      >
        <MenuItem
          v-for="(item, index) in floating"
          :key="index"
          v-bind="item"
        ></MenuItem>
      </floating-menu>
    </div>
    <el-container style="height: calc(100% - 24px)">
      <el-header>
        <div></div>
      </el-header>
      <el-container style="height: 90%">
        <el-aside width="25%">
          <side-directory
            :content="useWikiEditorStore().jsonContent.content"
          ></side-directory>
        </el-aside>
        <el-main>
          <el-scrollbar height="100%">
            <editor-content id="editor" :editor="editor" />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
    <el-empty v-if="!editor" />
  </div>
</template>
<style lang="scss" scoped>
.el-main {
  // margin: 0;
  // padding: 0;
  border-left: 1px solid #ced4da;
}
.el-header {
  height: 10%;
}
.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
.editor-menu {
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 2px #cec9c9;
  .dropMenu {
    .dropdown {
      svg {
        height: 30px;
      }
      position: absolute;
      display: none;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0px 0px 2px #cec9c9;
      // left: 0;
      transform: translate(-25%, 0);
    }
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
  }
}
.editorContainer {
  height: 100%;
  width: 100%;
  .not-show {
    opacity: 0;
  }
  .sideDirectory {
    // position: fixed;
    width: 100%;
    background-color: #ffffff;
  }
  #editor {
    min-height: 100%;
    // width: 75%;
    // left: 25%;
    white-space: pre-wrap;
    position: relative;
    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;
      td,
      th {
        min-width: 1em;
        border: 2px solid #ced4da;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
        background-color: #f1f3f5;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: -2px;
        width: 4px;
        background-color: #adf;
        pointer-events: none;
      }

      p {
        margin: 0;
      }
    }
    blockquote {
      padding-left: 1rem;
      border-left: 2px solid rgba(#0d0d0d, 0.1);
      margin-left: 1rem;
    }
    img {
      width: 200px;
      &.ProseMirror-selectednode {
        border: 2px solid skyblue;
      }
    }
  }
}
// .floating-menu {
//   display: flex;
//   background-color: #0d0d0d10;
//   padding: 0.2rem;
//   border-radius: 0.5rem;

//   button {
//     border: none;
//     background: none;
//     font-size: 0.85rem;
//     font-weight: 500;
//     padding: 0 0.2rem;
//     opacity: 0.6;

//     &:hover,
//     &.is-active {
//       opacity: 1;
//     }
//   }
// }
</style>
<script setup>
import { editor } from "./index";
import { EditorContent, FloatingMenu, BubbleMenu } from "@tiptap/vue-3";
import MenuItem from "@/components/MenuItem.vue";
import SideDirectory from "@/components/SideDirectory.vue";
import { ref, onMounted, defineProps } from "vue";
import { LinkMenu, bubble, inputLink } from "./config/bubble";
import { useWikiEditorStore } from "@/store";

defineProps({
  content: String,
  path: String,
});
const editLinkAble = ref(false);
const floating = [
  {
    role: "item",
    icon: "image",
    title: "Image",
    bindElement: {
      id: "bubble_imageInput",
      label: "input",
      type: "file",
      accept: ".png,.jpg,.gif,.jpeg,.svg",
      isShow: false,
      event: {
        change: (e) => {
          console.log(e);
          // getClipboardImageURL();
          if (e.target.files) {
            editor
              .chain()
              .focus()
              .setImage({ src: e.target.files[0].path })
              .run();
            e.target.value = "";
          }
        },
      },
    },
  },
  {
    role: "item",
    icon: "table",
    title: "Table",
    action: () => addTable(),
  },
];

function showLinkMenu() {
  return editor.isActive("link") || LinkMenu.value;
}

function setLink() {
  editor.chain().focus().run();
  const link = inputLink.value;
  const reg = /http(s)?/;
  if (link != "") {
    editor.commands.setLink({
      href: `${reg.test(link) ? "" : "https://"}${link}`,
    });
  }
  LinkMenu.value = !LinkMenu.value;
  editLinkAble.value = false;
}

// function editLinkAble() {
//   LinkMenu.value = false;
//   inputLink.value = "";
// }

// function focus() {
//   editor.chain().focus().run();
// }

function getLink() {
  const link = editor.getAttributes("link").href;
  if (link) {
    inputLink.value = link;
    LinkMenu.value = true;
  }
  console.log("get link");
}

function editLink() {
  editLinkAble.value = true;
}

// function addImage() {
//   editor.commands.pasteImage();
//   // console.log(this.editor.commands.scrollIntoView())
// }

function addTable() {
  editor
    .chain()
    .focus()
    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
    .run();
}

// function handleUpdate() {
//   const headings = [];
//   const transaction = editor.state.tr;
//   editor.state.doc.descendants((node, pos) => {
//     console.log(editor);
//     if (node.type.name === "heading") {
//       const id = `heading-${headings.length + 1}`;
//       if (node.attrs.id != id) {
//         transaction.setNodeMarkup(pos, undefined, {
//           ...node.attrs,
//           id,
//         });
//       }
//       headings.push({
//         level: node.attrs.level,
//         text: node.textContent,
//         id,
//       });
//     }
//   });
//   transaction.setMeta("preventUpdate", true);
//   editor.view.dispatch(transaction);
//   const json = editor.getJSON();
//   content.value = [...json.content];
// }

function hideLinkMenu() {
  LinkMenu.value = false;
  inputLink.value = "";
  // console.log("hello");
}

onMounted(() => {
  // editor.on("update", handleUpdate());
});
</script>
