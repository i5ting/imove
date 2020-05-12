import { useState, Dispatch, SetStateAction } from 'react';
import { createContainer } from 'react-tracked';

export type State = {
  formVisible: boolean;
};

const initialData = { formVisible: true };

const useValue = (): [State, Dispatch<SetStateAction<State>>] => useState<State>(initialData);

export const {
  Provider: UIProvider,
  useTrackedState: useUIState,
  useUpdate: useSetUIState,
} = createContainer(useValue);
