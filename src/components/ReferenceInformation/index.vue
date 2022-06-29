<template>
  <div style="height">
    <el-descriptions :column="1" direction="vertical" size="large" border>
      <el-descriptions-item label="Type">
        <el-input
          v-model="useReferenceStore().references[reference].type"
          @change="useReferenceStore().saveReferences()"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Title">
        <el-input
          v-model="useReferenceStore().references[reference].title"
          @change="useReferenceStore().saveReferences()"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Year">
        <el-input
          v-model="useReferenceStore().references[reference].year"
          @change="useReferenceStore().saveReferences()"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Author">
        <el-tag
          style="margin: 5px"
          v-for="(item, index) in useReferenceStore().references[reference]
            .authors"
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
          v-model="useReferenceStore().references[reference].abstract"
          :autosize="{ minRows: 2, maxRows: 5 }"
          @change="useReferenceStore().saveReferences()"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Subject">
        <el-tag
          style="margin: 5px"
          v-for="(item, index) in useReferenceStore().references[reference]
            .subject"
          :key="index"
          closable
          :effect="useConfigStore().theme.currrentTheme"
          @close="handleClose(index)"
          >{{ item }}
        </el-tag>
        <el-input
          v-if="subjectEditable"
          ref="subjectInput"
          v-model="inputSubject"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleSubjectInputConfirm"
          @blur="handleSubjectInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showSubjectInput"
        >
          + subject
        </el-button>
      </el-descriptions-item>
      <el-descriptions-item label="DOI">
        <el-input
          v-model="useReferenceStore().references[reference].doi"
          @change="useReferenceStore().saveReferences()"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="ISSN">
        <el-input
          v-model="useReferenceStore().references[reference].issn"
          @change="useReferenceStore().saveReferences()"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Volume">
        <el-input
          v-model="useReferenceStore().references[reference].volume"
          @change="useReferenceStore().saveReferences()"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="url">
        <el-input
          v-model="useReferenceStore().references[reference].url"
          @change="useReferenceStore().saveReferences()"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Page">
        <el-input
          v-model="useReferenceStore().references[reference].page"
          @change="useReferenceStore().saveReferences()"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="Publisher">
        <el-input
          v-model="useReferenceStore().references[reference].publisher"
          @change="useReferenceStore().saveReferences()"
        ></el-input>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { defineProps, nextTick, toRefs, ref, computed } from "vue";
import { useConfigStore, useReferenceStore } from "@/store";
const props = defineProps({
  reference: Number,
  height: Number,
});
const subjectInput = ref();
const authorInput = ref();
const { reference } = toRefs(props);
const inputAuthor = ref("");
const inputSubject = ref("");
const authorEditable = ref(false);
const subjectEditable = ref(false);

const showAuthorInput = () => {
  authorEditable.value = true;
  nextTick(() => {
    authorInput.value?.input?.focus();
  });
};

const showSubjectInput = () => {
  subjectEditable.value = true;
  nextTick(() => {
    subjectInput.value?.input?.focus();
  });
};

const handleAuthorInputConfirm = () => {
  //TODO:the edit of given and family name
  if (inputAuthor.value) {
    // console.log(useReferenceStore().references[reference]);
    // useReferenceStore().references[reference].authors.push(inputAuthor);
  }
  authorEditable.value = false;
  inputAuthor.value = "";
  useReferenceStore().saveReferences();
};
const handleSubjectInputConfirm = () => {
  const references = computed(() => useReferenceStore().references);
  if (inputSubject.value) {
    console.log(references.value[reference.value], reference);
    references.value[reference.value].subject.push(inputSubject.value);
  }
  subjectEditable.value = false;
  inputSubject.value = "";
  useReferenceStore().saveReferences();
};

const handleClose = (index) => {
  console.log(index,useReferenceStore().references[reference.value]);
  useReferenceStore().references[reference.value].subject.splice(index,1);
  useReferenceStore().saveReferences();
};
</script>
