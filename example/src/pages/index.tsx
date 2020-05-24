import * as React from 'react';
import IMove from '@imove/core';
import styled from '@emotion/styled';
import { DataItem } from '@imove/core/dist/types/data/cells';

const cells: DataItem[] = [
  {
    label: '查询是否登录',
    type: 'decision',
    style: {
      width: 48,
      height: 30,
      scale: 2,
    },
    data: {
      code:
        'import Base from "@ali/rax-base";\n\nconst queryLogin = (params) => {\n  return new Promise((resolve, reject) => {\n    Base.getUser((data) => {\n      if (data && data.userNumberId) {\n        resolve(true);\n      } else {\n        reject(false);\n      }\n    });\n  });\n};\n\nexport default queryLogin;\n',
      dependencies: [
        {
          '@ali/rax-base': '^2.1.9',
        },
      ],
    },
    schema: {
      type: 'object',
      required: [],
      properties: {},
    },
  },
];

const onSave = (data: { nodes: any; edges: any }): void => {
  console.log(data);
};

const Wrapper = styled.div`
  height: 100vh;
`;

function Arrange(): JSX.Element {
  return (
    <Wrapper>
      <IMove cells={cells} onSave={onSave} />
    </Wrapper>
  );
}

export default Arrange;
