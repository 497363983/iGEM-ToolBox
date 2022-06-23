<template>
  <div style="height: 90vh">
    <el-auto-resizer>
      <template #default="{ height }">
        <div>
          <el-input
            v-model="SearchValue"
            :placeholder="`Search by ${SearchKey}`"
            class="input-with-select"
          >
            <template #prepend>
              <el-select v-model="SearchKey" placeholder="Select" style="width: 115px">
                <el-option
                  v-for="(column,index) in columns"
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
                    >{{item.label}}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-input>
        </div>
        <el-table :height="height" :data="filterData" border>
          <el-table-column
            v-for="(column,index) in columns"
            :key="index"
            v-bind="column"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </template>
    </el-auto-resizer>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import { ElAutoResizer } from "element-plus";
import { ArrowDown, Files } from "@element-plus/icons-vue";

const SearchKey = ref("title");
const SearchValue = ref("");

defineProps({
  References: Object
});

let data = [
  {
    author:
      "Zlatev, Roumen;Magnin, Jean-Pierre;Ozil, Patrick;Stoytcheva, Margarita",
    year: 2006,
    title:
      "Bacterial sensors based on Acidithiobacillus ferrooxidans: Part I. Fe2+ and S2O32− determination",
    journal: "Biosensors and Bioelectronics",
    type: "Journal Article"
  },
  {
    author:
      "Zlatev, Roumen;Magnin, Jean-Pierre;Ozil, Patrick;Stoytcheva, Margarita",
    year: 2006,
    title:
      "Bacterial sensors based on Acidithiobacillus ferrooxidans: Part I. Fe2+ and S2O32− determination",
    journal: "Biosensors and Bioelectronics",
    type: "Article"
  }
];
const importOptions = [
  {
    label: "file",
    icon: Files,
    action: () => {}
  }
];

const getTypes = references => {
  let types = [...new Set(references.map(reference => reference.type))];
  return Array.from(types, type => ({
    text: type,
    value: type
  }));
};

const columns = [
  {
    label: "Author",
    prop: "author",
    sortable: true
  },
  {
    label: "Year",
    prop: "year",
    sortable: true
  },
  {
    label: "Title",
    prop: "title",
    sortable: true
  },
  {
    label: "Journal",
    prop: "journal",
    sortable: true
  },
  {
    label: "Type",
    prop: "type",
    filters: getTypes(data),
    filterMethod: (value, row, column) => {
      console.log(row);
      const property = column["property"];
      return row[property] === value;
    }
  }
];

// const sortState = ref({
//   "column-0": TableV2SortOrder.DESC,
//   "column-1": TableV2SortOrder.ASC
// });
// const onSort = ({ key, order }) => {
//   sortState.value[key] = order;
//   data.value = data.value.reverse();
// };

// const click = () => {
//   console.log("click");
// };
const filterData = computed(() => {
  return data.filter(item => {
    return (
      !SearchValue.value ||
      item[SearchKey.value]
        .toLowerCase()
        .includes(SearchValue.value.toLowerCase())
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
}
</style>