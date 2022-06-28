<template>
  <div class="home">
    <el-calendar >
      <template #dateCell="{data}">
        <p>{{data.day.split('-').slice(1)[1]}}</p>
        <p>
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script setup>



</script>
