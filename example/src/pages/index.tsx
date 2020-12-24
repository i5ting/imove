import * as React from 'react';
import IMove from '../../../packages/core/dist/core.esm.js';

const onSave = (data: { nodes: any; edges: any }): void => {
  console.log(data);
};

function Arrange(): JSX.Element {
  return (
    <div style={{height: '100vh'}}>
      <IMove onSave={onSave}/>
    </div>
  );
}

export default Arrange;
