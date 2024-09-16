type Font = {
  name: string;
  metrics: {
    bottom: number;
    baseline: number;
    xHeight: number;
    capHeight: number;
    top: number;
  };
};

const fontlist: Font[] = [
  {
    name: "mirage",
    metrics: {
      bottom: -494,
      baseline: 0,
      xHeight: 1066,
      capHeight: 1440,
      top: 1950,
    },
  },
  {
    name: "index",
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
