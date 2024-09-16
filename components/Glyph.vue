<script setup lang="tsx">
defineProps<{
  glyph: string;
  animation?: {
    type: string;
    speed: number;
  };
}>();
</script>

<template>
  <span
    :style="{
      animation: animation && `${animation.type} ${animation.speed}ms`,
    }"
    >{{ glyph }}</span
  >
</template>

<style lang="css">
@keyframes blur {
  from {
    opacity: 0;
    filter: blur(10px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
  }
}
</style>
