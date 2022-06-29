<template>
  <div>
    <el-descriptions :column="1" direction="vertical" size="large" border>
      <el-descriptions-item label="Type">
        <el-input v-model="Reference.type"></el-input>
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
      <el-descriptions-item label="Subject">
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
    </el-descriptions>
  </div>
</template>

<script setup>
import { defineProps, nextTick, toRefs, ref } from "vue";
import { useConfigStore } from "@/store/config";
const props = defineProps({
  reference: Object,
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
