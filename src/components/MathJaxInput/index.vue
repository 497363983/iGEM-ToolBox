<template>
  <div class="mathjaxInput">
    <textarea v-model="math" type="text" @input="input"></textarea>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: String
    },
    command: {
      type: Function
    }
  },
  data() {
    return {
      math: this.items
    };
  },
  methods: {
    input: function() {
      this.command({ latex: this.math });
    }
  },
  computed: {
    // math: function() {
    //   return this.latex;
    // }
  }
};
</script>