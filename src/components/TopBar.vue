<template>
  <div id="topBar" class="navbar navbar-light bg-light">
      <SvgIcon iconClass="back" />
      <div></div>
  </div>
</template>
<style lang="scss" scoped>
#topBar {
  height: 5vh;
  box-shadow: 0px 0px 2px #cec9c9;
  svg {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    left: 20px;
    &:hover {
      cursor: pointer;
      color: rgb(51, 142, 245);
    }
  }
}
</style>
<script>
export default {
  name: "TopBar"
};
</script>