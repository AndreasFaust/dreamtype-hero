export type Font = {
  name: string;
  metrics: {
    bottom: number;
    baseline: number;
    xHeight: number;
    capHeight: number;
    top: number;
  };
  weight?: {
    default: number;
    min: number;
    max: number;
  };
};

const fontlist: Font[] = [
  {
    name: "Mirage",
    metrics: {
      bottom: -494,
      baseline: 0,
      xHeight: 1066,
      capHeight: 1440,
      top: 1950,
    },
    weight: {
      default: 400,
      min: 100,
      max: 900,
    },
  },
  {
    name: "Index",
    metrics: {
      bottom: -620,
      baseline: 0,
      xHeight: 1453,
      capHeight: 1966,
      top: 2196,
    },
  },
];

export default fontlist;
