/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const StartCell = ({ scale = 1 }: { scale?: number }): JSX.Element => {
  const width = 48 * scale;
  const height = 30 * scale;
  return (
    <svg
      css={css`
        width: ${width}px;
        height: ${height}px;
      `}
    >
      1,15 24,29 47,15 24,1
      <polygon
        css={css`
          fill: #fef0dd;
          stroke: #fccd8e;
        `}
        points={`${1 * scale},${15 * scale} ${24 * scale},${29 * scale} ${47 * scale},${
          15 * scale
        } ${24 * scale},${1 * scale}`}
        strokeWidth="2"
      />
    </svg>
  );
};

export default StartCell;
