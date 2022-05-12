<template>
  <div class="home">
    <el-calendar >
      <template #dateCell="{data}">
        <p>{{data.day.split('-').slice(1)[1]}}</p>
        <p>
          <ul>
          </ul>
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
