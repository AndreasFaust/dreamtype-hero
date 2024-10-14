<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const {
  label,
  alignmentZone,
  labelPosition = "top",
} = defineProps<{
  id: string;
  label: string;
  position: number;
  em: number;
  alignmentZone?: {
    percent: number;
    em: number;
  };
  labelPosition?: "top" | "bottom";
  color: {
    text: string;
    line: string;
  };
}>();
</script>

<template>
  <div
    v-if="alignmentZone"
    :class="
      cn('absolute inset-x-0 block w-full opacity-50 transition-all', {
        'top-full': alignmentZone.em > 0,
        'bottom-full': alignmentZone.em < 0,
      })
    "
    :style="{
      top:
        alignmentZone.em > 0
          ? position - alignmentZone.percent + '%'
          : position + '%',
      height: alignmentZone.percent + '%',
      background: color.line,
    }"
  />
  <div
    :id
    class="absolute z-10 inset-x-0 h-px transition-all"
    :style="{
      top: position + '%',
      background: color.line,
    }"
  >
    <span
      class="absolute z-20 left-0 font-mono text-[10px] transition-all"
      :style="{
        top: labelPosition === 'top' ? '-18px' : '3px',
        color: color.text,
      }"
    >
      {{ label }}
    </span>
    <span
      class="absolute z-20 right-0 font-mono text-[10px] transition-all"
      :style="{
        top: labelPosition === 'top' ? '-18px' : '3px',
        color: color.text,
      }"
    >
      {{ em }}
    </span>
  </div>
</template>
