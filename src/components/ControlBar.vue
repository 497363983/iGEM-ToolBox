<template>
  <div id="controlBar">
    <div class="left box"></div>
    <div class="right box">
      <span class="minimize" title="minimize" @click="minimize">
        <SvgIcon iconClass="minimize" />
      </span>
      <span class="toggleWindow" v-bind:title="state" @click="toggleWindow">
        <SvgIcon v-if="state == 'maximize'" iconClass="maximize" />
        <SvgIcon v-else iconClass="unmaximize" />
      </span>
      <span class="close" title="close" @click="closeMain">
        <SvgIcon iconClass="close" />
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#controlBar {
  position: relative;
  top: 0;
  // left: 0;
  width: 100%;
  height: 30px;
  -webkit-app-region: drag;
  background-color: #f5f6f7;
  padding: 0;
  .box {
    display: inline-block;
    position: absolute;
    top: 0;
    height: 100%;
    &.right {
      width: 120px;
      left: calc(100% - 120px);
      .close {
        &:hover {
          background-color: #d71526;
        }
      }
    }
    &.left {
      left: 0;
    }
    span {
      display: inline-block;
      height: 30px;
      width: 40px;
      text-align: center;
      cursor: pointer;
      -webkit-app-region: no-drag;
      svg {
        height: 30px;
      }
      &:hover {
        background-color: #eaebec;
      }
    }
  }
}
</style>
<script>
import { closeMain, maximize, minimize, unmaximize} from "../utils/useIPC";
export default {
  data() {
    return {
      state: "maximize"
    };
  },
  setup() {
    return {
      closeMain,
      maximize,
      minimize,
      unmaximize
    };
  },
  methods: {
    toggleWindow: function(){
      // console.log(this)
      let state = this.state == "maximize";
      if(state){
        maximize()
        this.state = "unmaximize"
      }else{
        unmaximize()
        this.state = "maximize"
      }
      
    }
  }
};
</script>