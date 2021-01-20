import React, { useMemo, useState, useEffect } from 'react';

import {
  monaco,
  EditorDidMount,
  ControlledEditor,
  ControlledEditorProps,
} from '@monaco-editor/react';

import monokaiTheme from './theme-monokai';

let KeyMod: any = {};
let KeyCode: any = {};
monaco.init().then((monaco) => {
  KeyMod = monaco.KeyMod;
  KeyCode = monaco.KeyCode;
  monaco.editor.defineTheme('monokai', monokaiTheme);
});

const CODE_EDITOR_OPTIONS = {
  fontSize: 14,
};

interface IProps extends ControlledEditorProps {
  onSave?: (code: string) => void;
}

export const CodeEditor: React.FC<IProps> = (props) => {
  const { options, editorDidMount, onSave, ...rest } = props;
  const [editorInst, setEditorInst] = useState<any>();

  const editorOptions = useMemo(() => {
    return Object.assign({}, CODE_EDITOR_OPTIONS, options);
  }, [options]);

  useEffect(() => {
    if (editorInst) {
      // NOTE: how to add command(https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html#addcommand)
      editorInst.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_S, () => {
        onSave && onSave(editorInst.getValue());
      });
    }
  }, [editorInst, onSave]);

  const onEditorDidMount: EditorDidMount = (getEditorValue, editor) => {
    setEditorInst(editor);
    editorDidMount && editorDidMount(getEditorValue, editor);
  };

  return (
    <ControlledEditor
      theme={'monokai'}
      language={'javascript'}
      options={editorOptions}
      editorDidMount={onEditorDidMount}
      {...rest}
    />
  );
};

export default CodeEditor;
