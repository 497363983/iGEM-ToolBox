<template>
  <div class="sideDirectory" v-if="content">
    <ul>
      <li
        v-for="(heading,key, index) in filterHeadings"
        :level="heading.attrs.level"
        :key="index"
        :class="'heading-' + heading.attrs.level"
      >
        <a
          class="text-truncate"
          href="javascript:void(0);"
          @click="scrollIntoHeading(heading.attrs.id)"
          :title="heading.content"
        >{{heading.content}}</a>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
@for $i from 1 through 6 {
  .heading-#{$i} {
    margin-left: 1em * ($i - 1);
  }
}
a {
  display: block;
  text-decoration: none;
  color: #000000;
  &:hover {
    color: skyblue;
  }
}
</style>
<script>
export default {
  props: {
    content: Object
  },
  data() {
    return {};
  },
  methods: {
    scrollIntoHeading: function(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start"
      });
      // document.getElementById("editorContainer").scrollTop = document.getElementById(id).offsetTop
    }
  },
  computed: {
    filterHeadings() {
      const heading = this.content
        ? this.content.filter(headings => headings.type == "heading")
        : [];
      for (let index in heading) {
        let item = heading[index];
        let length = item.content.length;
        if (length > 1) {
          let text = "";
          for (let h of item.content) {
            text += h.text;
          }
          heading[index].content = text;
        } else {
          heading[index].content = item.content[0].text;
        }
      }
      console.log("filter", heading);
      return heading;
    }
  }
};
</script>