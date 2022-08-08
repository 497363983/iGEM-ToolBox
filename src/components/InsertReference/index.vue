<template>
  <div style="height: 90vh">
    <el-auto-resizer>
      <template #default="{ height }">
        <div>
          <el-input
            style="width: 90%"
            v-model="SearchValue"
            :placeholder="`Search by ${SearchKey}`"
            class="input-with-select"
          >
            <template #prepend>
              <el-select
                v-model="SearchKey"
                placeholder="Select"
                style="width: 115px"
              >
                <el-option
                  v-for="(column, index) in columns"
                  :key="index"
                  :label="column.label"
                  :value="column.prop"
                />
              </el-select>
            </template>
            <template #append>
              <el-dropdown>
                <el-button type="primary">
                  Import
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(item, index) in importOptions"
                      :key="index"
                      :icon="item.icon"
                      @click="item.action"
                    >
                      <label style="cursor: pointer" for>{{
                        item.label
                      }}</label>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-input>
          <el-button style="width: 10%" @click="refresh">
            <el-icon :class="{ 'is-loading': isloading }">
              <Refresh />
            </el-icon>
          </el-button>
        </div>
        <el-table
          :height="height"
          @row-dblclick="showReferenceInformation"
          highlight-current-row
          :data="filterData"
          border
        >
          <el-table-column
            v-for="(column, index) in columns"
            :key="index"
            v-bind="column"
            show-overflow-tooltip
          >
            <template
              v-if="column.label === `Author`"
              #default="{ row, column }"
            >
              <span
                v-for="(item, index) in row.authors"
                :key="index"
                :class="{ firstAuthor: item.sequence === `first` }"
                >{{ `${item.given} ${item.family}` }};</span
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-auto-resizer>
    <el-dialog
      v-model="showInformation"
      title="Reference"
      fullscreen
      destroy-on-close
      center
      style="height: 100vh"
    >
      <el-auto-resizer>
        <template #default>
          <ReferenceInformation :reference="currentReference" />
        </template>
      </el-auto-resizer>
    </el-dialog>
    <el-dialog
      v-model="importByDOI"
      title="Import by doi"
      destroy-on-close
      center
    >
      <el-input v-model="inputDOI" placeholder="Please input doi">
        <template #prepend>https://doi.org/</template>
      </el-input>
      <template #footer>
        <span>
          <el-button @click="importByDOI = false">Cancel</el-button>
          <el-button
            type="primary"
            style="margin-right: 10px"
            @click="importByDOIAction()"
            >Import</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ElMessage, ElAutoResizer } from "element-plus";
import { ArrowDown, Refresh, Files, Link } from "@element-plus/icons-vue";
import { columns } from "./config/table/columns.js";
import ReferenceInformation from "../ReferenceInformation";
// import getReference from "@/api/reference/getReference";
import { useReferenceStore } from "@/store";
const SearchKey = ref("title");
const SearchValue = ref("");
const isloading = ref(false);
let showInformation = ref(false);
let importByDOI = ref(false);
let inputDOI = ref("");
let currentReference = ref(0);

useReferenceStore().getReferences();

function showReferenceInformation(row) {
  console.log(row);
  useReferenceStore().references.forEach((item, index) => {
    if (item === row) {
      currentReference.value = index;
    }
  });
  // console.log(row, column, cell, event);
  // currentReference.value = row;
  // console.log(currentReference);
  showInformation.value = true;
}

function importByDOIAction() {
  if (inputDOI.value.trim() === "") {
    ElMessage({
      type: "warning",
      message: "Input cannot be empty!",
    });
  } else {
    useReferenceStore().importReferenceByDOI(inputDOI.value, () => {
      importByDOI.value = false;
      inputDOI.value = "";
    });
  }
}

const importOptions = [
  {
    label: "file",
    icon: Files,
    action: () => {},
  },
  {
    label: "DOI",
    icon: Link,
    action: () => {
      importByDOI.value = true;
    },
  },
];

function refresh() {
  isloading.value = true;
  useReferenceStore().getReferences(() => {
    isloading.value = false;
  });
}
//TODO:rewrite the method of search.
const filterData = computed(() => {
  return useReferenceStore().references.filter((item) => {
    console.log(typeof item[SearchKey.value]);
    return (
      !SearchValue.value ||
      (typeof item[SearchKey.value] === "string"
        ? item[SearchKey.value]
            .toLowerCase()
            .includes(SearchValue.value.toLowerCase())
        : () => {
            console.log("ii");
            if (SearchKey.value === "title") {
              return item[SearchKey.value][0]
                .toLowerCase()
                .includes(SearchValue.value.toLowerCase());
            } else {
              let authors = "";
              item[SearchKey.value].forEach((item) => {
                authors += `${item.given} ${item.family};`;
              });
              return authors
                .toLowerCase()
                .includes(SearchValue.value.toLowerCase());
            }
          })
    );
  });
});
</script>

<style lang="scss">
.el-table {
  .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-table__row:hover {
    cursor: pointer;
  }
  .firstAuthor {
    color: #79bbff;
  }
}
</style>
