function getPosition(linePosition: number, height: number, bottom: number) {
  return height - (linePosition + bottom * -1);
}
function getAlignmentZone(line: Line, height: number) {
  if (!line.alignmentZone) return {};
  return {
    percent: (Math.abs(line.alignmentZone) * 100) / height,
    em: line.alignmentZone,
  };
}

export default function updateFont(
  fontname: string
): FontTransformed | undefined {
  const currentFont = fontlist.find((font) => font.name === fontname);

  if (!currentFont) return;
  const { top, bottom, baseline, capHeight, xHeight, ascender, descender } =
    currentFont.metrics;

  const height = currentFont.metrics.top + currentFont.metrics.bottom * -1;

  return {
    name: currentFont.name,
    baseline: {
      id: "baseline",
      label: "Baseline",
      position: (top * 100) / height,
      em: 0,
      ...getAlignmentZone(baseline, height),
    },
    capHeight: {
      id: "capHeight",
      label: "Cap Height",
      position:
        (getPosition(capHeight.position, height, bottom) * 100) / height,
      em: capHeight.position,
      ...getAlignmentZone(capHeight, height),
    },
    xHeight: {
      id: "xHeight",
      label: "X-Height",
      position: (getPosition(xHeight.position, height, bottom) * 100) / height,
      em: currentFont.metrics.xHeight.position,
      ...getAlignmentZone(xHeight, height),
    },
    ...(ascender && {
      ascender: {
        id: "ascender",
        label: "Ascender",
        position:
          (getPosition(ascender.position, height, bottom) * 100) / height,
        em: ascender.position,
        ...getAlignmentZone(ascender, height),
      },
    }),
    ...(descender && {
      descender: {
        id: "descender",
        label: "Descender",
        position:
          (getPosition(descender.position, height, bottom) * 100) / height,
        em: descender.position,
        ...getAlignmentZone(descender, height),
      },
    }),
  };
}
