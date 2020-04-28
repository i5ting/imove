/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { CellProps } from '../../model';
import Label from '../../utils/styles/cells';

const StateCell = ({ label, scale = 1 }: CellProps): JSX.Element => {
  const width = 48 * scale;
  const height = 30 * scale;
  return (
    <div>
      <svg
        css={css`
          width: ${width}px;
          height: ${height}px;
        `}
      >
        <rect
          css={css`
            fill: #daeffa;
            stroke: #82caed;
          `}
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          strokeWidth="2"
        />
      </svg>
      {label && <Label>{label}</Label>}
    </div>
  );
};

export default StateCell;
