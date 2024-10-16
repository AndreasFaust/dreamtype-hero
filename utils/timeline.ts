import type { Step } from "~/utils/types";

const timeline: Step[] = [
  {
    text: "Hello World!",
    font: "Mirage",
    speed: 100,
    animation: {
      type: "blur",
      speed: 500,
      clear: true,
    },
  },
  {
    speed: 200,
    end: 1000,
    animation: {
      type: "weight",
      speed: 1000,
    },
  },
  {
    erase: 100,
    end: 400,
  },
  {
    text: "I bims!",
    font: "Index",
    speed: 100,
    end: 1000,
  },
  {
    erase: 100,
  },
  { repeat: true },
];

export default timeline;
