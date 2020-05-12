import * as React from 'react';
import { createContext, useContext, useReducer } from 'react';
import uiReducer from '../reducer/ui';
import { UIContext } from '../model';

interface ProviderProps {
  children: React.ReactChild;
}

const initialData = { formVisible: true, aaa: true };

const Context = createContext({ uiState: initialData } as UIContext);

export const UIProvider = ({ children }: ProviderProps): JSX.Element => {
  const [uiState, uiDispatch] = useReducer(uiReducer, initialData);

  return <Context.Provider value={{ uiState, uiDispatch }}>{children}</Context.Provider>;
};

export const useUI = (): UIContext => useContext(Context);
