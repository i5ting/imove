import * as React from 'react';
import IMove from '@imove/core';
import styled from '@emotion/styled';

const onSave = (data: { nodes: any; edges: any }): void => {
  console.log(data);
};

const Wrapper = styled.div`
  height: 100vh;
`;

function Arrange(): JSX.Element {
  return (
    <Wrapper>
      <IMove onSave={onSave}/>
    </Wrapper>
  );
}

export default Arrange;
