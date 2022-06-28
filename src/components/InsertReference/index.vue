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
          <el-button style="width: 10%">
            <el-icon class>
              <Refresh />
            </el-icon>
          </el-button>
        </div>
        <el-table
          :height="height"
          @row-dblclick="showRefernenceInformation"
          highlight-current-row
          :data="filterData"
          border
        >
          <el-table-column
            v-for="(column, index) in columns"
            :key="index"
            v-bind="column"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </template>
    </el-auto-resizer>
    <el-dialog
      v-model="showInformation"
      title="Reference"
      fullscreen
      destroy-on-close
      center
    >
      <ReferenceInformation v-model="currentReference" />
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
import { defineProps, ref, computed } from "vue";
import { ElAutoResizer, ElMessage } from "element-plus";
import { ArrowDown, Refresh } from "@element-plus/icons-vue";
import { columns } from "./config/table/columns.js";
import ReferenceInformation from "../ReferenceInformation";
import { readJSONFile } from "../../utils/index";
import getReference from "@/api/reference/getReference";
import { importOptions } from "./config";
let data = ref([]);
const SearchKey = ref("title");
const SearchValue = ref("");
let showInformation = ref(false);
let importByDOI = ref(false);
let inputDOI = ref("");
let currentReference = {};

function showRefernenceInformation(row) {
  currentReference = row;
  showInformation.value = true;
}

function importByDOIAction() {
  if (inputDOI.value === "") {
    ElMessage({
      type: "warning",
      message: "Input cannot be empty!",
    });
  } else {
    getReference(inputDOI.value);
  }
}

// function refresh() {
//   readJSONFile(
//     "E:\\iGEM\\igem2022\\iGEMWorkSpace\\iGEM-ToolBox\\testData\\references.json",
//     content => {
//       data.value = JSON.parse(content);
//     }
//   );
// }

defineProps({
  References: Object,
});

const filterData = computed(() => {
  return data.value.filter((item) => {
    return (
      !SearchValue.value ||
      item[SearchKey.value]
        .toLowerCase()
        .includes(SearchValue.value.toLowerCase())
    );
  });
});
readJSONFile(
  "E:\\iGEM\\igem2022\\iGEMWorkSpace\\iGEM-ToolBox\\testData\\references.json",
  (content) => {
    data.value = JSON.parse(content);
  }
);
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
}
</style>