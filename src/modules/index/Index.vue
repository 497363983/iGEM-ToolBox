<template>
  <div class="container-fluid p-0">
    <ControlBar />
    <div id="nav" class="nav position-absolute top-0 m-0">
      <a href="javascript:void(0);">
        <SvgIcon iconClass="list" />
      </a>
      <router-link to="/">
        <SvgIcon iconClass="home" />
        <span>Home</span>
      </router-link>
      <router-link to="/wiki">
        <SvgIcon iconClass="wiki" />
        <span>Wiki</span>
      </router-link>
      <router-link to="/team">
        <SvgIcon iconClass="team" />
        <span>Team</span>
      </router-link>
      <router-link to="/user">
        <SvgIcon iconClass="user" />
        <span>User</span>
      </router-link>
      <router-link to="/setting">
        <SvgIcon iconClass="setting" />
        <span>Settings</span>
      </router-link>
      <router-link to="/about">
        <SvgIcon iconClass="about" />
        <span>About</span>
      </router-link>
    </div>
    <div class="content m-0">
      <div class="content-manage">
        <router-view />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
body {
  overflow: hidden;
}
*:focus-visible {
  outline: 0;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.nav {
  left: 0;
  width: 100px;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  // position: absolute;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(17, 24, 39);
  // border-radius: 10px;
  transition: 0.3s;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  a {
    text-decoration: none;
    display: block;
    flex: 1;
    // min-height: 60px;
    padding: 10px;
    width: 85%;
    margin: 9px;
    border-radius: 5px;
    position: relative;
    transition: 0.3s;
    // font-size: 20px;
    color: rgb(160, 160, 175);
    svg {
      font-size: 30px;
      width: 1em;
      display: block;
      position: absolute;
      margin-left: 13px;
      top: 50%;
      transform: translate(0, -50%);
    }
    span {
      display: block;
      position: relative;
      top: 50%;
      left: 80px;
      transform: translate(0, -50%);
      // font: 500 20px "";
      font-weight: 600;
      opacity: 0;
      transition: 0.1s;
    }
    &:nth-child(1)::before,
    &:nth-child(5)::before {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background-color: rgb(55, 65, 81);
      position: absolute;
      bottom: -10px;
    }
    &:hover,
    &.router-link-active {
      background-color: rgb(55, 65, 81);
      color: #fff;
    }
  }
  &:hover {
    width: 270px;
    span {
      opacity: 1;
    }
  }
}
.content {
  display: inline-block;
  // padding-top: 20px;
  width: calc(100% - 100px);
  height: 100vh;
  top: 0;
  left: 100px;
  position: relative;
  .content-manage {
    box-sizing: border-box;
    padding: 20px;
    // height: 100%;
    width: 100%;

    font-size: 14px;
    top: 26px;
  }
  .close {
    font-size: 26px;
    float: right;
    margin-right: 30px;
    cursor: pointer;
  }
}
</style>
<script>
// import SvgIcon from "@/components/SvgIcon";
// import ControlBar from "@/components/ControlBar";
import "../../icons";

import "bootstrap/dist/css/bootstrap.min.css";

export default {
  // components: {
  //   SvgIcon,
  //   ControlBar
  // },
  setup() {

    return {};
  },
  mounted() {}
};
</script>
