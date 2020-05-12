/** @jsx jsx */
import { useEffect, memo, useRef } from 'react';
import { jsx } from '@emotion/core';
import { useUIState } from '../store/ui';

function SchemaForm(): JSX.Element {
  const uiState = useUIState();
  const { formVisible } = uiState;
  const renders = useRef(1);
  useEffect(() => {
    console.log(11111);
  });
  renders.current += 1;
  return (
    <div>
      {formVisible ? 3 : 0}
      (renders:{renders.current})
    </div>
  );
}

export default memo(SchemaForm);
