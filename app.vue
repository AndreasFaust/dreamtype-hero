<script setup lang="ts">

import Glyph from "./components/Glyph.vue";

const color = { background: "#011408", lines: "#18401d", text: "#6bf88a" };

const charIndex = ref(0);
const stepIndex = ref(0);
const step = ref(timeline[stepIndex.value]);
const typeValue = ref("");
const font = computed(() => {
  const fontname = step.value?.font || "mirage";
  const currentFont = fonts[fontname];
  console.log("currentFont", currentFont)

  const height = currentFont.metrics.top + (+currentFont.metrics.bottom);
  console.log("height", height)
  return {
    name: currentFont.name,
    baseline: (currentFont.metrics.bottom * -100) / height,
  }
});

function nextStep() {
  step.value = timeline[stepIndex.value + 1];
  stepIndex.value += 1;
  if (!step.value) return;
  if (step.value.reset) {
    stepIndex.value = 0;
    charIndex.value = 0;
  }
  if (step.value?.text) {
    typeText();
  } else {
    eraseText();
  }
}

function typeText() {
  if (charIndex.value < step.value.text.length) {
    typeValue.value += step.value.text[charIndex.value];
    charIndex.value += 1;
    setTimeout(typeText, step.value.speed);
  } else {
    setTimeout(nextStep, step.value.end);
  }
}

function eraseText() {
  if (charIndex.value > 0) {
    typeValue.value = typeValue.value.substring(0, charIndex.value - 1);
    charIndex.value -= 1;
    setTimeout(eraseText, step.value.erase);
  } else {
    setTimeout(nextStep, step.value.end);
  }
}

onMounted(() => {
  setTimeout(typeText, step.value.speed);
});
</script>

<template>
  <main
    class="p-10 w-screen h-screen flex items-center justify-center"
    :style="{
      background: color.background,
    }"
  >
  <ClientOnly>
    <p
      class="relative w-full text-center text-[10vw] flex items-center justify-center whitespace-pre"
      :style="{
        color: color.text,
        borderTop: `1px solid ${color.lines}`,
        borderBottom: `1px solid ${color.lines}`,
      }"
    >
      &shy;
      <Glyph
        v-for="(glyph, index) in typeValue"
        :key="glyph + index"
        :glyph
        :animation="step?.animation"
      />
      <span
        :style="{
          animation: `blink 1s infinite`,
        }"
        class="block h-[1em] w-4 bg-blue-500"
      />
      <div id="baseline" class="absolute inset-x-0 h-[2px]" 
        :style="{
          top: font.baseline + '%', 
          background: color.lines
        }" 
      />
      <!-- <div id="xHeight" />
      <div id="capHeight" /> -->
    </p>
  </ClientOnly>
  </main>
</template>

<style lang="css">
@keyframes blink {
  from,
  to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
