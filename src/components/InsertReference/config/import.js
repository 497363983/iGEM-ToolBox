import {  Files, Link } from "@element-plus/icons-vue";
export const importOptions = [
    {
      label: "file",
      icon: Files,
      action: () => {}
    },
    {
      label: "DOI",
      icon: Link,
      action: () => {
        importByDOI.value = true;
      }
    }
  ];