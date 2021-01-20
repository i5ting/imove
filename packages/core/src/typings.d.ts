declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'fr-generator' {
  import React from 'react';
  export interface FRProps {
    settings?: object;
  }
  class FormRender extends React.Component<FRProps> {}
  export default FRGenerator;
}
