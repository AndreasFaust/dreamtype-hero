type Step = {
  text?: string;
  font?: string;
  speed?: number;
  end?: number;
  animation?: {
    type: string;
    speed: number;
    clear?: boolean;
  };
  erase?: number;
  reset?: boolean;
};

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
  { reset: true },
];

export default timeline;
