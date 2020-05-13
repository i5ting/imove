export type SchemaType = 'string' | 'number' | 'object' | 'array' | 'boolean' | 'integer';

type basicSchemaType = 'string' | 'number' | 'boolean' | 'integer';

interface BasicSchemaItem {
  title?: string;
  description?: string;
  type: basicSchemaType;
}

export interface ObjectSchemaItem {
  title?: string;
  description?: string;
  type: 'object';
  properties: {
    [field: string]: SchemaItem;
  };
  required: string[];
}

export interface ArraySchemaItem {
  title?: string;
  description?: string;
  type: 'array';
  items: SchemaItem;
}

export type SchemaItem = BasicSchemaItem | ObjectSchemaItem | ArraySchemaItem;

export type SchemaState = ObjectSchemaItem;

export type KeyRoute = (string | number)[];

export type SchemaAction =
  | { type: 'SET_SCHEMA'; schema: SchemaState }
  | { type: 'ADD_CHILD_FIELD'; keyRoute: KeyRoute }
  | { type: 'ADD_SIBLING_FIELD'; keyRoute: KeyRoute }
  | { type: 'REMOVE_FIELD'; keyRoute: KeyRoute }
  | { type: 'TOGGLE_ALL_CHECKED'; checked: boolean }
  | { type: 'ADD_REQUIRED'; keyRoute: KeyRoute }
  | { type: 'REMOVE_REQUIRED'; keyRoute: KeyRoute }
  | { type: 'CHANGE_FIELD'; keyRoute: KeyRoute; field: string }
  | { type: 'CHANGE_TYPE'; keyRoute: KeyRoute; fieldType: SchemaType }
  | { type: 'CHANGE_TITLE'; keyRoute: KeyRoute; title: string }
  | { type: 'CHANGE_DESC'; keyRoute: KeyRoute; desc: string };
