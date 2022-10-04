<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="test">test</el-button>
  </div>
</template>

<script setup>
// import { pullProject } from "@/utils/git";
// import { useUserStore, useCompetitionStore } from "@/store";
// // import { SyncFiles, SyncFiles_return } from "../utils/useIPC";
// import { editor } from "@/TiptapEditor/index";
import { DOMcreateElement } from "@/TiptapEditor/utils/useTemplate";
import { transTableFormat } from "../utils/tableFormat";
import Experiment1  from '../utils/Experiment1.json';

// console.log(editor);
async function test() {
  // const { username, accsessTokens } = useUserStore().$state;
  // const { projectPath } = useTemplateStore().$state;
  // const { gitPath } = useGitLabStore().$state;
  // await pullProject({
  //   username,
  //   accsessTokens,
  //   projectPath,
  //   gitPath,
  //   success: (res) => {
  //     console.log("hh", res);
  //   },
  // });
  console.log("sdfghj")
  transTableFormat(Experiment1)
  console.log("sdfghj")
  // const filelist = [
  //   {
  //     filename: "test",
  //     filepath: "E:\\desktop\\Snipaste_2022-09-13_19-33-20.png",
  //     type: "test",
  //   },
  //   // {
  //   //   filename: "test",
  //   //   filepath: "E:\\desktop\\图片.png",
  //   //   type: "test",
  //   // }
  // ];
  // SyncFiles(
  //   filelist,
  //   useUserStore().username,
  //   useUserStore().password,
  //   useCompetitionStore().teamID
  // );

  const str = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          textAlign: "left",
          level: 3,
        },
        content: [
          {
            type: "text",
            text: "llll",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
        content: [
          {
            type: "text",
            marks: [
              {
                type: "strike",
              },
            ],
            text: "ksf",
          },
          {
            type: "text",
            text: "v",
          },
          {
            type: "text",
            marks: [
              {
                type: "bold",
              },
            ],
            text: "jkd",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "table",
        content: [
          {
            type: "tableRow",
            content: [
              {
                type: "tableHeader",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                },
                content: [
                  {
                    type: "paragraph",
                    attrs: {
                      textAlign: "left",
                    },
                    content: [
                      {
                        type: "text",
                        text: "；；；",
                      },
                    ],
                  },
                ],
              },
              {
                type: "tableHeader",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                },
                content: [
                  {
                    type: "paragraph",
                    attrs: {
                      textAlign: "left",
                    },
                  },
                ],
              },
              {
                type: "tableHeader",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                },
                content: [
                  {
                    type: "paragraph",
                    attrs: {
                      textAlign: "left",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "tableRow",
            content: [
              {
                type: "tableCell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                },
                content: [
                  {
                    type: "paragraph",
                    attrs: {
                      textAlign: "left",
                    },
                    content: [
                      {
                        type: "text",
                        text: "lll",
                      },
                    ],
                  },
                ],
              },
              {
                type: "tableCell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                },
                content: [
                  {
                    type: "paragraph",
                    attrs: {
                      textAlign: "left",
                    },
                  },
                ],
              },
              {
                type: "tableCell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                },
                content: [
                  {
                    type: "paragraph",
                    attrs: {
                      textAlign: "left",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "tableRow",
            content: [
              {
                type: "tableCell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                },
                content: [
                  {
                    type: "paragraph",
                    attrs: {
                      textAlign: "left",
                    },
                    content: [
                      {
                        type: "text",
                        text: "ll",
                      },
                    ],
                  },
                ],
              },
              {
                type: "tableCell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                },
                content: [
                  {
                    type: "paragraph",
                    attrs: {
                      textAlign: "left",
                    },
                  },
                ],
              },
              {
                type: "tableCell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                },
                content: [
                  {
                    type: "paragraph",
                    attrs: {
                      textAlign: "left",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
        content: [
          {
            type: "text",
            text: "lll",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            attrs: {
              textAlign: "left",
            },
            content: [
              {
                type: "text",
                text: "lllllllllll",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
        content: [
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "jfjgjhjhvj",
          },
          {
            type: "text",
            text: "hv",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
        content: [
          {
            type: "text",
            text: "lllllll",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
      {
        type: "paragraph",
        attrs: {
          textAlign: "left",
        },
      },
    ],
  };
  console.log("jj", DOMcreateElement(str));
}

// SyncFiles_return();
</script>
