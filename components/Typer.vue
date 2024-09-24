<script setup lang="ts">
import { nanoid } from "nanoid";
import type { Font, Step } from "./types";
import Line from "./Line.vue";

defineProps<{
  fontList: Font[];
  timeline: Step[];
}>();

type FontTransformed = {
  name: string;
  baseline: number;
  capHeight: number;
  xHeight: number;
};

const color = { background: "#011408", lines: "#18401d", text: "#6bf88a" };

const charIndex = ref(0);
const stepIndex = ref(0);
const step = ref(timeline[stepIndex.value]);
const typeValue = ref(
  [] as {
    id: string;
    value: string;
    animation?: { type: string; speed: number; clear?: boolean };
  }[]
);
const font = ref<FontTransformed | undefined>(
  updateFont(timeline[0].font || "Mirage")
);

function updateFont(fontname: string): FontTransformed | undefined {
  const currentFont = fontlist.find((font) => font.name === fontname);

  if (!currentFont) return;

  const height = currentFont.metrics.top + currentFont.metrics.bottom * -1;

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
}

const typerBlink = ref(false);

function nextStep() {
  step.value = timeline[stepIndex.value + 1];
  stepIndex.value += 1;
  if (!step.value) return;
  if (step.value.font && step.value.font !== font.value?.name) {
    font.value = updateFont(step.value.font);
  }
  if (step.value.reset) {
    typerBlink.value = true;
    stepIndex.value = 0;
    charIndex.value = 0;
  }
  if (step.value?.text) {
    typerBlink.value = false;
    typeText();
  }
  if (step.value?.erase) {
    typerBlink.value = false;
    eraseText();
  }
  if (step.value?.animation) {
    typerBlink.value = true;
    if (step.value?.animation.type === "weight") {
      charIndex.value = 0;
      animateWeight();
    }
  }
}

function animateWeight() {
  if (charIndex.value < (typeValue.value?.length || 0)) {
    charIndex.value += 1;
    typeValue.value[charIndex.value - 1].id = nanoid();
    typeValue.value[charIndex.value - 1].animation = step.value.animation;
    setTimeout(animateWeight, step.value.speed);
  } else {
    setTimeout(nextStep, step.value.end);
  }
}

function typeText() {
  if (charIndex.value < (step.value.text?.length || 0)) {
    if (step.value.text?.[charIndex.value]) {
      typeValue.value.push({
        id: nanoid(),
        value: step.value.text?.[charIndex.value],
        animation: step.value.animation,
      });
    }
    charIndex.value += 1;
    setTimeout(typeText, step.value.speed);
  } else {
    typerBlink.value = true;
    setTimeout(nextStep, step.value.end);
  }
}

function eraseText() {
  if (charIndex.value > 0) {
    typeValue.value.pop();
    charIndex.value -= 1;
    setTimeout(eraseText, step.value.erase);
  } else {
    typerBlink.value = true;
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
          <span>&shy;</span>
          <span
            v-for="{ id, value, animation } in typeValue"
            :key="id"
            :style="{
              animation:
                animation && `${animation.type} ${animation.speed}ms forwards`,
            }"
            @animationend="
              () => {
                if (animation?.clear) {
                  const thisGlyph = typeValue.find((value) => value.id === id);
                  if (thisGlyph) {
                    thisGlyph.animation = undefined;
                  }
                }
              }
            "
            >{{ value }}</span
          >

          <span
            :style="{
              animation: `blink 1s infinite`,
              animationPlayState: typerBlink ? 'running' : 'paused',
            }"
            class="block h-[1em] w-4 bg-blue-500 rounded-full"
          />
        </p>
        <Line
          id="baseline"
          label="Baseline"
          :position="font?.baseline"
          :color="{ text: color.text, line: color.lines }"
        />
        <Line
          id="xHeight"
          label="X-Height"
          :position="font?.xHeight"
          :color="{ text: color.text, line: color.lines }"
        />
        <Line
          id="capHeight"
          label="Cap Height"
          :position="font?.capHeight"
          :color="{ text: color.text, line: color.lines }"
        />
      </div>
    </ClientOnly>
  </main>
</template>

<style lang="css">
@keyframes blink {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
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
@keyframes weight {
  0% {
    font-variation-settings: "wght" 400;
  }
  100% {
    font-variation-settings: "wght" 900;
  }
}
</style>
