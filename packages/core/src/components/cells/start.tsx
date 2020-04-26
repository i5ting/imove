/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const StartCell = ({ scale = 1 }: { scale?: number }): JSX.Element => {
  const width = 20 * scale;
  const radius = 10 * scale;
  return (
    <svg
      css={css`
        width: ${width}px;
        height: ${width}px;
      `}
    >
      <circle
        css={{ fill: '#76ca02' }}
        cx={radius}
        cy={radius}
        r={radius}
        strokeWidth={2 * scale}
      />
      <circle css={{ fill: '#bbe581' }} cx={radius} cy={radius} r={8 * scale} />
    </svg>
  );
};

export default StartCell;
