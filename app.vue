<script setup lang="ts">
import fontlist from "./utils/fontlist";

const color = { background: "#011408", lines: "#18401d", text: "#6bf88a" };

const charIndex = ref(0);
const stepIndex = ref(0);
const step = ref(timeline[stepIndex.value]);
const typeValue = ref("");
const font = computed(() => {
  const fontname = step.value?.font || "mirage";
  const currentFont = fontlist.find((font) => font.name === fontname);
  // console.log("fontlist", fontlist);
  // console.log("currentFont", currentFont);
  if (!currentFont) return;
  const height = currentFont.metrics.top + currentFont.metrics.bottom * -1;
  // console.log("top", currentFont.metrics.top);
  // console.log("bottom", currentFont.metrics.bottom);
  // console.log("height", height);

  const capHeightFromTop =
    height - (currentFont.metrics.capHeight + currentFont.metrics.bottom * -1);
  const xHeightFromTop =
    height - (currentFont.metrics.xHeight + currentFont.metrics.bottom * -1);

  return {
    name: currentFont.name,
    baseline: (currentFont.metrics.top * 100) / height,
    capHeight: (capHeightFromTop * 100) / height,
    xHeight: (xHeightFromTop * 100) / height,
  };
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
      <div
        class="relative w-full"
        :style="{
          borderTop: `1px solid ${color.lines}`,
          borderBottom: `1px solid ${color.lines}`,
        }"
      >
        <p
          class="relative z-20 text-center text-[10vw] flex items-center justify-center whitespace-pre"
          :style="{
            color: color.text,
            lineHeight: 'normal',
            fontFamily: font?.name,
          }"
        >
          &shy;
          <span
            v-for="(glyph, index) in typeValue"
            :key="glyph + index"
            :style="{
              animation:
                step.animation &&
                `${step.animation.type} ${step.animation.speed}ms`,
            }"
            >{{ glyph }}</span
          >
          <span
            :style="{
              animation: `blink 1s infinite`,
            }"
            class="block h-[1em] w-4 bg-blue-500"
          />
        </p>
        <div
          id="baseline"
          class="absolute z-10 inset-x-0 h-px transition-all"
          :style="{
            top: font?.baseline + '%',
            background: color.lines,
          }"
        />
        <div
          id="xHeight"
          class="absolute z-10 inset-x-0 h-px transition-all"
          :style="{
            top: font?.xHeight + '%',
            background: color.lines,
          }"
        />
        <div
          id="capHeight"
          class="absolute z-10 inset-x-0 h-px transition-all"
          :style="{
            top: font?.capHeight + '%',
            background: color.lines,
          }"
        />
      </div>
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
