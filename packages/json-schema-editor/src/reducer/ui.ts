import { UIState, UIAction } from '../model';

const reducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'TOGGLE_FORM_VISIBLE':
      return { formVisible: state.formVisible, aaa: false };
    case 'increment':
      return state;
    case 'decrement':
      return state;
    default:
      return state;
  }
};

export default reducer;
