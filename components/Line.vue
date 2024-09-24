<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  position?: number;
  color: {
    text: string;
    line: string;
  };
}>();
</script>

<template>
  <div
    :id
    class="absolute z-10 inset-x-0 h-px transition-all"
    :style="{
      top: position + '%',
      background: color.line,
    }"
  >
    <span
      class="absolute left-0 -top-5 font-mono text-xs"
      :style="{
        color: color.text,
      }"
    >
      {{ label }}
    </span>
  </div>
</template>
