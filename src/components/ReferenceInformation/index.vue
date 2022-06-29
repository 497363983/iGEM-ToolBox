<template>
  <div style="height">
    <el-descriptions :column="1" direction="vertical" size="large" border>
      <el-descriptions-item label="Type">
        <el-input v-model="Reference.type"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Title">
        <el-input v-model="Reference.title"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Year">
        <el-input v-model="Reference.year"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Author">
        <el-tag
          style="margin: 5px"
          v-for="(item, index) in Reference.authors"
          :key="index"
          :type="item.sequence === `first` ? `` : `info`"
          closable
          :effect="useConfigStore().theme.currrentTheme"
          >{{ `${item.given} ${item.family}` }}
        </el-tag>
        <el-input
          v-if="authorEditable"
          ref="authorInput"
          v-model="inputAuthor"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleAuthorInputConfirm"
          @blur="handleAuthorInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showAuthorInput"
        >
          + author
        </el-button>
      </el-descriptions-item>
      <el-descriptions-item label="Abstract">
        <el-input
          type="textarea"
          v-model="Reference.abstract"
          :autosize="{ minRows: 2, maxRows: 5 }"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Subject">
        <el-tag
          style="margin: 5px"
          v-for="(item, index) in Reference.subject"
          :key="index"
          closable
          :effect="useConfigStore().theme.currrentTheme"
          >{{ item }}
        </el-tag>
        <el-input
          v-if="authorEditable"
          ref="authorInput"
          v-model="inputAuthor"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleAuthorInputConfirm"
          @blur="handleAuthorInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showAuthorInput"
        >
          + subject
        </el-button>
      </el-descriptions-item>
      <el-descriptions-item label="DOI">
        <el-input v-model="Reference.doi"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="ISSN">
        <el-input v-model="Reference.issn"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Volume">
        <el-input v-model="Reference.volume"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="url">
        <el-input v-model="Reference.url"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Page">
        <el-input v-model="Reference.page"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Publisher">
        <el-input v-model="Reference.publisher"></el-input>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { defineProps, nextTick, toRefs, ref } from "vue";
import { useConfigStore } from "@/store/config";
const props = defineProps({
  reference: Object,
  height: Number,
});
const authorInput = ref();
const { reference } = toRefs(props);
const inputAuthor = ref("");
const authorEditable = ref(false);

const showAuthorInput = () => {
  authorEditable.value = true;
  nextTick(() => {
    authorInput.value?.input?.focus();
  });
};

const handleAuthorInputConfirm = () => {
  if (inputAuthor.value) {
    console.log(Reference);
    Reference.authors.push(inputAuthor);
  }
  authorEditable.value = false;
  inputAuthor.value = "";
};
let Reference = reference;
console.log(Reference);
</script>
