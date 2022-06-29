<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="test">test</el-button>
  </div>
</template>

<script>
// import { runPythonByMain } from "../utils/useIPC";
// import { request } from "../api/request";
import { getReference } from "../api/reference";
export default {
  methods: {
    test: function() {
      getReference({doi:"10.1128/AEM.01156-08"});
    }
  }
};
</script>