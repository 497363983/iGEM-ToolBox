<template>
  <div class="editorContainer" id="editorContainer">
    <el-page-header title content="Wiki" />
    <div v-if="editor">
      <bubble-menu
        id="choose-menu"
        class="bubble-menu editor-menu"
        :tippy-options="{ duration: 100, maxWidth: 'none' }"
        :editor="editor"
        :pluginKey="bubbleMenuOne"
      >
        <MenuItem v-for="(item, index) in bubble" :key="index" v-bind="item"></MenuItem>
      </bubble-menu>
      <bubble-menu
        id="link-menu"
        class="bubble-menu editor-menu"
        :tippy-options="{ duration: 100, placement: 'bottom' ,onDestroy: hideLinkMenu, onHidden: hideLinkMenu, onHide: hideLinkMenu, onClickOutside: hideLinkMenu, onShow: getLink, onUpdate: getLink }"
        :editor="editor"
        :shouldShow="showLinkMenu"
        :pluginKey="bubbleMenuTwo"
      >
        <div class="input-group input-group-sm" style="height: 30px;">
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
            v-show="!editor.isActive('link') || editLinkAble "
            class="btn btn-primary"
            type="button"
          >Enter</button>
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
        <MenuItem v-for="(item, index) in floating" :key="index" v-bind="item"></MenuItem>
      </floating-menu>
    </div>

    <el-container style="height: calc(100% - 24px);">
      <el-header>
        <div>
          
        </div>
      </el-header>
      <el-container style="height:90%">
        <el-aside width="25%">
          <side-directory :content="content"></side-directory>
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
.el-header{
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
<script>
import { Editor } from "@tiptap/vue-3";
import { getClipboardImageURL } from "../utils/pasteImage";
import { Extentions, Components } from "./config/config";
import { ref } from "vue";
export default {
  name: "TiptapEditor",
  components: Components,
  setup() {
    const content = ref([]);
    return {
      content,
      getClipboardImageURL
    };
  },
  data() {
    return {
      editor: null,
      LinkMenu: false,
      inputLink: "",
      editLinkAble: false,
      bubble: [
        {
          role: "dropItem",
          icon: "h",
          title: "heading",
          isActive: () => this.editor.isActive("heading"),
          children: [
            {
              role: "item",
              icon: "h1",
              title: "First-level heading",
              action: () =>
                this.editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 1 })
                  .run(),
              isActive: () => this.editor.isActive("heading", { level: 1 })
            },
            {
              role: "item",
              icon: "h2",
              title: "Second-level heading",
              action: () =>
                this.editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 2 })
                  .run(),
              isActive: () => this.editor.isActive("heading", { level: 2 })
            },
            {
              role: "item",
              icon: "h3",
              title: "Third-level heading",
              action: () =>
                this.editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 3 })
                  .run(),
              isActive: () => this.editor.isActive("heading", { level: 3 })
            },
            {
              role: "item",
              icon: "h4",
              title: "Forth-level heading",
              action: () =>
                this.editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 4 })
                  .run(),
              isActive: () => this.editor.isActive("heading", { level: 4 })
            },
            {
              role: "item",
              icon: "h5",
              title: "Fifth-level heading",
              action: () =>
                this.editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 5 })
                  .run(),
              isActive: () => this.editor.isActive("heading", { level: 5 })
            },
            {
              role: "item",
              icon: "h6",
              title: "Sixth-level heading",
              action: () =>
                this.editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 6 })
                  .run(),
              isActive: () => this.editor.isActive("heading", { level: 6 })
            }
          ]
        },
        {
          role: "item",
          icon: "ul",
          title: "BulletList",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleBulletList()
              .run(),
          isActive: () => this.editor.isActive("bulletList")
        },
        {
          role: "item",
          icon: "ol",
          title: "OrderedList",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run(),
          isActive: () => this.editor.isActive("orderedList")
        },
        {
          role: "item",
          icon: "bold",
          title: "Bold",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleBold()
              .run(),
          isActive: () => this.editor.isActive("bold")
        },
        {
          role: "item",
          icon: "italic",
          title: "Italic",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleItalic()
              .run(),
          isActive: () => this.editor.isActive("italic")
        },
        {
          role: "item",
          icon: "strike",
          title: "Strike",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleStrike()
              .run(),
          isActive: () => this.editor.isActive("strike")
        },
        {
          role: "item",
          icon: "blockquote_left",
          title: "Blockquote",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run(),
          isActive: () => this.editor.isActive("blockquote")
        },
        {
          role: "item",
          icon: "link",
          title: "Link",
          action: this.toggleLink,
          isActive: () => this.editor.isActive("link") || this.LinkMenu
        },
        {
          role: "item",
          icon: "reference",
          title: "Reference",
          action: this.toggleLink,
          isActive: () => this.editor.isActive("link") || this.LinkMenu
        },
        {
          role: "dropItem",
          icon: "more",
          title: "More",
          children: [
            {
              role: "item",
              icon: "justify_left",
              title: "Align left",
              action: () =>
                this.editor
                  .chain()
                  .focus()
                  .setTextAlign("left")
                  .run(),
              isActive: () => this.editor.isActive({ textAlign: "left" })
            },
            {
              role: "item",
              icon: "text_center",
              title: "Align center",
              action: () =>
                this.editor
                  .chain()
                  .focus()
                  .setTextAlign("center")
                  .run(),
              isActive: () => this.editor.isActive({ textAlign: "center" })
            },
            {
              role: "item",
              icon: "justify_right",
              title: "Align right",
              action: () =>
                this.editor
                  .chain()
                  .focus()
                  .setTextAlign("right")
                  .run(),
              isActive: () => this.editor.isActive({ textAlign: "right" })
            },
            {
              role: "item",
              icon: "justify",
              title: "Align justify",
              action: () =>
                this.editor
                  .chain()
                  .focus()
                  .setTextAlign("justify")
                  .run(),
              isActive: () => this.editor.isActive({ textAlign: "justify" })
            },
            {
              role: "item",
              icon: "highlight",
              title: "High light",
              action: () =>
                this.editor
                  .chain()
                  .focus()
                  .toggleHighlight()
                  .run(),
              isActive: () => this.editor.isActive("highlight")
            }
          ]
        }
      ],
      floating: [
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
              change: e => {
                console.log(e);
                // getClipboardImageURL();
                if (e.target.files) {
                  this.editor
                    .chain()
                    .focus()
                    .setImage({ src: e.target.files[0].path })
                    .run();
                  e.target.value = "";
                }
              }
            }
          }
        },
        {
          role: "item",
          icon: "table",
          title: "Table",
          action: () => this.addTable()
        }
      ]
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: Extentions,
      injectCSS: false,
      content: `
        <p>
          This is a radically reduced version of tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.$ a+b$
        </p>
        <p>
          The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
          <math-inline data-type="InlineMath" data-math-src="jknkz">jknkz</math-inline>
        </p>
      `,
      onUpdate: ({ editor }) => {
        // const json = editor.getJSON();
        // this.content = [...json.content];
        console.log(editor.getHTML());
        console.log(this.content);
      },
      onSelectionUpdate: () => {
        this.LinkMenu = false;
      }
    });
    this.editor.on("update", this.handleUpdate);
    this.$nextTick(this.handleUpdate);
  },
  methods: {
    showLinkMenu: function() {
      return this.editor.isActive("link") || this.LinkMenu;
    },
    toggleLink: function() {
      this.editor
        .chain()
        .focus()
        .run();
      const link = this.editor.getAttributes("link").href;
      this.inputLink = link || "";
      this.LinkMenu = !this.LinkMenu;
    },
    setLink: function() {
      this.editor
        .chain()
        .focus()
        .run();
      const link = this.inputLink;
      const self = this;
      const reg = /http(s)?/;
      if (link != "") {
        // console.log(this);
        self.editor.commands.setLink({
          href: `${reg.test(link) ? "" : "https://"}${link}`
        });
      }
      this.LinkMenu = !this.LinkMenu;
      this.editLinkAble = false;
    },
    hideLinkMenu: function() {
      this.LinkMenu = false;
      this.inputLink = "";
      // console.log("hello");
    },
    focus: function() {
      this.editor
        .chain()
        .focus()
        .run();
    },
    getLink: function() {
      const link = this.editor.getAttributes("link").href;
      if (link) {
        this.inputLink = link;
        this.LinkMenu = true;
      }
      console.log("get link");
      // console.log("get");
    },
    editLink: function() {
      this.editLinkAble = true;
    },
    addImage: function() {
      // this.editor.commands.pasteImage();
      // console.log(this.editor.commands.scrollIntoView())
    },
    addTable: function() {
      this.editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
    handleUpdate: function() {
      const headings = [];
      const transaction = this.editor.state.tr;
      this.editor.state.doc.descendants((node, pos) => {
        console.log(this.editor);
        if (node.type.name === "heading") {
          const id = `heading-${headings.length + 1}`;
          if (node.attrs.id != id) {
            transaction.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              id
            });
          }
          headings.push({
            level: node.attrs.level,
            text: node.textContent,
            id
          });
        }
      });
      // console.log(headings);
      transaction.setMeta("preventUpdate", true);
      this.editor.view.dispatch(transaction);
      const json = this.editor.getJSON();
      this.content = [...json.content];
    }
  },

  beforeUnmount() {
    this.editor.destroy();
  }
};
</script>
