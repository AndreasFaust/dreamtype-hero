type Step = {
  text?: string;
  font?: string;
  speed?: number;
  end?: number;
  animation?: {
    type: string;
    speed: number;
  };
  erase?: number;
  reset?: boolean;
};

const timeline: Step[] = [
  {
    text: "Hello World!",
    font: "mirage",
    speed: 100,
    end: 1000,
    animation: {
      type: "blur",
      speed: 500,
    },
  },
  {
    erase: 100,
    end: 400,
  },
  {
    text: "I bims!",
    font: "index",
    speed: 100,
    end: 1000,
  },
  // {
  //   erase: 100,
  // },
  // { reset: true },
];

export default timeline;
