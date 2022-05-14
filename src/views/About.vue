<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="test">test</el-button>
  </div>
</template>

<script>
import { runPythonByMain } from "../utils/useIPC";
export default {
  methods: {
    test: function() {
      runPythonByMain("./py/hello.py", {
        args:[11,2,3]
      }, (err, results) => {
        console.log(err, results);
        console.log(JSON.parse(results[0].replace(/'/g, `"`)));
      });
    }
  }
};
</script>