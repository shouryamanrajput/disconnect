// The brand's "Pixel Smile" rebuilt as an inline SVG (no purple square
// behind it), so it can sit on any surface at any size.
export default function PixelSmiley({
  className = "h-8 w-8",
}: {
  className?: string;
}) {
  const lime = "#CDFF5C";
  const purple = "#6C4FF0";
  // Face rows: [y, xStart, xEnd]
  const rows: Array<[number, number, number]> = [
    [0, 4, 7],
    [1, 2, 9],
    [2, 1, 10],
    [3, 1, 10],
    [4, 0, 11],
    [5, 0, 11],
    [6, 0, 11],
    [7, 0, 11],
    [8, 1, 10],
    [9, 1, 10],
    [10, 2, 9],
    [11, 4, 7],
  ];
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className={className}
      shapeRendering="crispEdges"
    >
      {rows.map(([y, x0, x1]) => (
        <rect
          key={y}
          x={x0}
          y={y}
          width={x1 - x0 + 1}
          height={1}
          fill={lime}
        />
      ))}
      {/* eyes */}
      <rect x={3} y={3} width={2} height={2} fill={purple} />
      <rect x={7} y={3} width={2} height={2} fill={purple} />
      {/* smile */}
      <rect x={3} y={7} width={1} height={1} fill={purple} />
      <rect x={4} y={8} width={4} height={1} fill={purple} />
      <rect x={8} y={7} width={1} height={1} fill={purple} />
    </svg>
  );
}
