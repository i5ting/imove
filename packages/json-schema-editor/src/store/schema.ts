import { Dispatch, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { SchemaState, SchemaAction } from '../model';
import reducer from '../reducer/schema';

interface StoreProps {
  initialData: SchemaState;
}

const defaultData: SchemaState = {
  type: 'object',
  properties: {},
  required: [],
};

const useValue = ({ initialData }: StoreProps): [SchemaState, Dispatch<SchemaAction>] =>
  useReducer(reducer, initialData || defaultData);

export const {
  Provider: SchemaProvider,
  useTrackedState: useSchemaState,
  useUpdate: useSchemaDispatch,
} = createContainer(useValue);
