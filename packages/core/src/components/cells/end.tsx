/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { CellProps } from '../../model';

const EndCell = ({ scale = 1 }: CellProps): JSX.Element => {
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
        css={{ fill: '#f55753' }}
        cx={radius}
        cy={radius}
        r={radius}
        strokeWidth={2 * scale}
      />
      <circle css={{ fill: '#faaba9' }} cx={radius} cy={radius} r={8 * scale} />
    </svg>
  );
};

export default EndCell;
