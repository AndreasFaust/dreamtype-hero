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
};

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
