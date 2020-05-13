import { get, set, unset, remove, cloneDeep } from 'lodash-es';
import { SchemaType, SchemaState, SchemaAction, KeyRoute } from '../model';
import { defaultSchema, setAllFieldRequired } from '../utils/schema';

let fieldNum = 0;

const setSchema = (schema: SchemaState): SchemaState => {
  return schema;
};

const addRequired = (state: SchemaState, keyRoute: KeyRoute): SchemaState => {
  const schema = cloneDeep(state);

  const field = keyRoute[keyRoute.length - 1];
  const requiredKeyRoute = keyRoute.slice(0, -2).concat('required');
  const required = get(schema, requiredKeyRoute) || [];
  required.push(field);
  set(schema, requiredKeyRoute, required);

  return schema;
};

const removeRequired = (state: SchemaState, keyRoute: KeyRoute): SchemaState => {
  const schema = cloneDeep(state);

  const field = keyRoute[keyRoute.length - 1];
  const requiredKeyRoute = keyRoute.slice(0, -2).concat('required');
  const required = get(schema, requiredKeyRoute) || [];
  remove(required, (item) => item === field);
  set(schema, requiredKeyRoute, required);

  return schema;
};

const toggleAllChecked = (state: SchemaState, checked: boolean): SchemaState => {
  const schema = cloneDeep(state);

  setAllFieldRequired(schema, checked);

  return schema;
};

const addChildField = (state: SchemaState, keyRoute: KeyRoute): SchemaState => {
  fieldNum += 1;

  const newField = `field_${fieldNum}`;
  let schema = cloneDeep(state);

  // add new field - string
  const newKeyRoute = keyRoute.concat(newField);
  set(schema, newKeyRoute, defaultSchema.string);

  // add new filed to its parent's required
  schema = addRequired(schema, newKeyRoute);

  return schema;
};

const addSiblingField = (state: SchemaState, keyRoute: KeyRoute): SchemaState => {
  fieldNum += 1;

  const newField = `field_${fieldNum}`;
  let schema = cloneDeep(state);

  // add new field - string
  const newKeyRoute = keyRoute.slice(0, -1).concat(newField);
  set(schema, newKeyRoute, defaultSchema.string);

  // add new filed to its parent's required
  schema = addRequired(schema, newKeyRoute);

  return schema;
};

const removeField = (state: SchemaState, keyRoute: KeyRoute): SchemaState => {
  let schema = cloneDeep(state);

  // remove field
  unset(schema, keyRoute);

  // remove filed from its parent's required
  schema = removeRequired(schema, keyRoute);

  return schema;
};

const changeField = (state: SchemaState, keyRoute: KeyRoute, field: string): SchemaState => {
  let schema = cloneDeep(state);

  // temp old field's value and remove old field
  const temp = get(schema, keyRoute);
  unset(schema, keyRoute);

  // remove old filed from its parent's required
  schema = removeRequired(schema, keyRoute);

  // point to new field and add temp to it
  const fieldKeyRoute = keyRoute.slice(0, -1).concat(field);
  set(schema, fieldKeyRoute, temp);

  // add new filed to its parent's required
  schema = addRequired(schema, fieldKeyRoute);

  return schema;
};

const changeType = (state: SchemaState, keyRoute: KeyRoute, fieldType: SchemaType): SchemaState => {
  const schema = cloneDeep(state);

  // set field new value
  set(schema, keyRoute, defaultSchema[fieldType]);

  return schema;
};

const changeTitle = (state: SchemaState, keyRoute: KeyRoute, title: string): SchemaState => {
  const schema = cloneDeep(state);

  // point to title and set new value
  const titleKeyRoute = keyRoute.concat('title');
  set(schema, titleKeyRoute, title);

  return schema;
};

const changeDesc = (state: SchemaState, keyRoute: KeyRoute, desc: string): SchemaState => {
  const schema = cloneDeep(state);

  // point to desc and set new value
  const descKeyRoute = keyRoute.concat('description');
  set(schema, descKeyRoute, desc);

  return schema;
};

const reducer = (state: SchemaState, action: SchemaAction): SchemaState => {
  switch (action.type) {
    case 'SET_SCHEMA':
      return setSchema(action.schema);

    case 'ADD_CHILD_FIELD':
      return addChildField(state, action.keyRoute);

    case 'ADD_SIBLING_FIELD':
      return addSiblingField(state, action.keyRoute);

    case 'REMOVE_FIELD':
      return removeField(state, action.keyRoute);

    case 'TOGGLE_ALL_CHECKED':
      return toggleAllChecked(state, action.checked);

    case 'ADD_REQUIRED':
      return addRequired(state, action.keyRoute);

    case 'REMOVE_REQUIRED':
      return removeRequired(state, action.keyRoute);

    case 'CHANGE_FIELD':
      return changeField(state, action.keyRoute, action.field);

    case 'CHANGE_TYPE':
      return changeType(state, action.keyRoute, action.fieldType);

    case 'CHANGE_TITLE':
      return changeTitle(state, action.keyRoute, action.title);

    case 'CHANGE_DESC':
      return changeDesc(state, action.keyRoute, action.desc);

    default:
      return state;
  }
};

export default reducer;
