import type { Font } from "~/utils/types";

const fontlist: Font[] = [
  {
    name: "Mirage",
    metrics: {
      top: 1942,
      bottom: -502,
      descender: { position: -360 },
      baseline: { position: 0, alignmentZone: -26 },
      xHeight: { position: 1066, alignmentZone: 18 },
      capHeight: { position: 1440, alignmentZone: 26 },
      ascender: { position: 1542 },
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
      top: 1937,
      bottom: -507,
      baseline: { position: 0 },
      xHeight: { position: 1057 },
      capHeight: { position: 1430 },
    },
  },
];

export default fontlist;
