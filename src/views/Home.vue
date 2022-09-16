<template>
  <div class="home" style="height: 100%">
    <el-container style="height: 100%">
      <el-main>
        <el-scrollbar height="100%">
          <el-calendar>
            <template #dateCell="{ data }">
              <p>{{ data.day.split("-").slice(1)[1] }}</p>
              <p></p>
            </template>
          </el-calendar>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script setup></script>
