export const computeCommentStyles = (depth: number) => {
  const computedWidth = 100 - depth * 2;
  const colorIntensity = Math.min(depth * 20, 200);
  const backgroundColor = `rgb(${255 - colorIntensity}, ${255 - colorIntensity}, ${255 - colorIntensity})`;
  
  return {
    width: `${computedWidth}%`,
    marginLeft: `${depth * 20}px`,
    backgroundColor,
  };
};