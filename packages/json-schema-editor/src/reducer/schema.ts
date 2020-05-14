import produce, { Draft } from 'immer';
import { get, set, unset, remove } from 'lodash-es';
import { SchemaType, SchemaItem, SchemaState, SchemaAction, KeyRoute } from '../model';
import { defaultSchema, setAllFieldRequired } from '../utils/schema';

let fieldNum = 0;

const setSchema = (schema: SchemaState): SchemaState => {
  return schema;
};

const addRequired = (state: SchemaState, keyRoute: KeyRoute): void => {
  const field = keyRoute.slice(-1)[0];
  const requiredKeyRoute = keyRoute.slice(0, -2).concat('required');
  const required = get(state, requiredKeyRoute) || [];
  required.push(field);
  set(state, requiredKeyRoute, required);
};

const removeRequired = (state: SchemaState, keyRoute: KeyRoute): void => {
  const field = keyRoute.slice(-1)[0];
  const requiredKeyRoute = keyRoute.slice(0, -2).concat('required');
  const required = get(state, requiredKeyRoute) || [];
  remove(required, (item) => item === field);
  set(state, requiredKeyRoute, required);
};

const changeRequiredField = (state: SchemaState, oldKeyRoute: KeyRoute, newField: string): void => {
  const oldField = oldKeyRoute.slice(-1)[0];
  const requiredKeyRoute = oldKeyRoute.slice(0, -2).concat('required');
  const required = get(state, requiredKeyRoute) || [];
  const oldFieldIndex = required.indexOf(oldField);

  // new field extend the old field
  if (oldFieldIndex > -1) {
    required.splice(oldFieldIndex, 1, newField);
    set(state, requiredKeyRoute, required);
  }
};

const toggleAllChecked = (state: SchemaState, checked: boolean): void => {
  setAllFieldRequired(state, checked);
};

const addChildField = (state: Draft<SchemaState>, keyRoute: KeyRoute): void => {
  fieldNum += 1;

  const newField = `field_${fieldNum}`;

  // add new field - string
  const newKeyRoute = keyRoute.concat(newField);
  set(state, newKeyRoute, defaultSchema.string);

  // add new filed to its parent's required
  addRequired(state, newKeyRoute);
};

const addSiblingField = (state: SchemaState, keyRoute: KeyRoute): void => {
  fieldNum += 1;

  const newField = `field_${fieldNum}`;

  // add new field - string
  const newKeyRoute = keyRoute.slice(0, -1).concat(newField);
  set(state, newKeyRoute, defaultSchema.string);

  // add new filed to its parent's required
  addRequired(state, newKeyRoute);
};

const removeField = (state: SchemaState, keyRoute: KeyRoute): void => {
  // remove field
  unset(state, keyRoute);

  // remove filed from its parent's required
  removeRequired(state, keyRoute);
};

const changeField = (state: SchemaState, keyRoute: KeyRoute, newField: string): void => {
  const oldField = keyRoute.slice(-1)[0];
  const parentKeyRoute = keyRoute.slice(0, -1);
  const properties = get(state, parentKeyRoute);
  const newProperties: { [key: string]: SchemaItem } = {};

  // keep the order of fields

  // eslint-disable-next-line no-restricted-syntax
  for (const field in properties) {
    if (field === oldField) {
      newProperties[newField] = properties[field];
    } else {
      newProperties[field] = properties[field];
    }
  }

  set(state, parentKeyRoute, newProperties);

  // replace old field with new field in required
  changeRequiredField(state, keyRoute, newField);
};

const changeType = (state: SchemaState, keyRoute: KeyRoute, fieldType: SchemaType): void => {
  // set field new value
  set(state, keyRoute, defaultSchema[fieldType]);
};

const changeTitle = (state: SchemaState, keyRoute: KeyRoute, title: string): void => {
  // point to title and set new value
  const titleKeyRoute = keyRoute.concat('title');
  set(state, titleKeyRoute, title);
};

const changeDesc = (state: SchemaState, keyRoute: KeyRoute, desc: string): void => {
  // point to desc and set new value
  const descKeyRoute = keyRoute.concat('description');
  set(state, descKeyRoute, desc);
};

const reducer = (state: SchemaState, action: SchemaAction): SchemaState =>
  produce(state, (draft: Draft<SchemaState>) => {
    switch (action.type) {
      case 'SET_SCHEMA':
        setSchema(action.schema);
        break;

      case 'ADD_CHILD_FIELD':
        addChildField(draft, action.keyRoute);
        break;

      case 'ADD_SIBLING_FIELD':
        addSiblingField(draft, action.keyRoute);
        break;

      case 'REMOVE_FIELD':
        removeField(draft, action.keyRoute);
        break;

      case 'TOGGLE_ALL_CHECKED':
        toggleAllChecked(draft, action.checked);
        break;

      case 'ADD_REQUIRED':
        addRequired(draft, action.keyRoute);
        break;

      case 'REMOVE_REQUIRED':
        removeRequired(draft, action.keyRoute);
        break;

      case 'CHANGE_FIELD':
        changeField(draft, action.keyRoute, action.field);
        break;

      case 'CHANGE_TYPE':
        changeType(draft, action.keyRoute, action.fieldType);
        break;

      case 'CHANGE_TITLE':
        changeTitle(draft, action.keyRoute, action.title);
        break;

      case 'CHANGE_DESC':
        changeDesc(draft, action.keyRoute, action.desc);
        break;

      default:
        break;
    }
  });

export default reducer;
