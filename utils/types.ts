export type Step = {
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
  repeat?: boolean;
};

export type Line = { position: number; alignmentZone?: number };

export type Font = {
  name: string;
  metrics: {
    bottom: number;
    baseline: Line;
    xHeight: Line;
    capHeight: Line;
    ascender?: Line;
    descender?: Line;
    top: number;
  };
  weight?: {
    default: number;
    min: number;
    max: number;
  };
};

export type FontTransformed = {
  name: string;
  baseline: {
    id: string;
    label: string;
    position: number;
    em: number;
    alignmentZone?: { percent: number; em: number };
  };
  xHeight: {
    id: string;
    label: string;
    position: number;
    em: number;
    alignmentZone?: { percent: number; em: number };
  };
  capHeight: {
    id: string;
    label: string;
    position: number;
    em: number;
    alignmentZone?: { percent: number; em: number };
  };
  ascender?: {
    id: string;
    label: string;
    position: number;
    em: number;
    alignmentZone?: { percent: number; em: number };
  };
  descender?: {
    id: string;
    label: string;
    position: number;
    em: number;
    alignmentZone?: { percent: number; em: number };
  };
};
