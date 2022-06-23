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
// import axios from "axios";
export default {
  methods: {
    test: function() {
      // runPythonByMain("./py/hello.py", {
      //   args:[11,2,3]
      // }, (err, results) => {
      //   console.log(err, results);
      //   console.log(JSON.parse(results[0].replace(/'/g, `"`)));
      // });
      // axios
      //   .get("http://api.crossref.org/works/10.1186/s13045-020-00910-5")
      //   .then(res => {
      //     console.log(res);
      //   });
      // request.get({
      //   url: "http://api.crossref.org/works/10.1186/s13045-020-00910-5",
      //   success: res => {
      //     console.log(res);
      //   },
      //   failure: err => {
      //     console.error(err);
      //   }
      // });
      // console.log(getReference("10.1016/j.molcel.2018.01.003"))
      getReference("10.1128/AEM.01156-08");
    }
  }
};
</script>