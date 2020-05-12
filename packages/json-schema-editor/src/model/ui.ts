export interface UIState {
  formVisible: boolean;
  aaa: boolean;
}

export interface UIAction {
  type: string;
}

export interface UIContext {
  uiState: UIState;
  uiDispatch: React.Dispatch<UIAction>;
}
