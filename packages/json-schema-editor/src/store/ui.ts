import { useState, Dispatch, SetStateAction } from 'react';
import { createContainer } from 'react-tracked';
import { UIState } from '../model';

const initialData = { properties: true };

const useValue = (): [UIState, Dispatch<SetStateAction<UIState>>] => useState<UIState>(initialData);

export const {
  Provider: UIProvider,
  useTrackedState: useUIState,
  useUpdate: useSetUIState,
} = createContainer(useValue);
