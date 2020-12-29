import React, {useMemo} from 'react';

import {
  monaco,
  ControlledEditor,
  ControlledEditorProps
} from '@monaco-editor/react';

import monokaiTheme from './theme-monokai';

monaco.init().then((monaco) => {
  monaco.editor.defineTheme('monokai', monokaiTheme);
});

const CODE_EDITOR_OPTIONS = {
  fontSize: 14
};

export const CodeEditor: React.FC<ControlledEditorProps> = (props) => {
  const {options, ...rest} = props;
  const editorOptions = useMemo(() => {
    return Object.assign({}, CODE_EDITOR_OPTIONS, options);
  }, [options]);

  return (
    <ControlledEditor
      theme={'monokai'}
      language={'javascript'}
      options={editorOptions}
      {...rest}
    />
  );
};

export default CodeEditor;
