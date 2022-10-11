<template>
  <a :href="href" @click.prevent="openLink(href)">
    <slot></slot>
    <SvgIcon iconClass="out_link" />
  </a>
</template>

<script setup>
import { defineProps } from "vue";
import { openLink } from "@/utils/useIPC";
defineProps({
  href: String,
});
</script>
