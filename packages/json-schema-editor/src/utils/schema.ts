import { SchemaItem } from '../model';

export const defaultSchema = {
  string: {
    type: 'string',
  },
  number: {
    type: 'number',
  },
  array: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  object: {
    type: 'object',
    properties: {},
  },
  boolean: {
    type: 'boolean',
  },
  integer: {
    type: 'integer',
  },
};

export const schemaType = ['string', 'number', 'array', 'object', 'boolean', 'integer'];

export const setAllFieldRequired = (schema: SchemaItem, checked: boolean): void => {
  if (schema.type === 'object') {
    const { properties } = schema;
    const fields = Object.keys(properties);

    if (checked) {
      schema.required = fields;
    } else {
      delete schema.required;
    }

    fields.forEach((field) => {
      const childSchema = properties[field];
      if (['object', 'array'].includes(childSchema.type)) {
        setAllFieldRequired(childSchema, checked);
      }
    });
  } else if (schema.type === 'array') {
    setAllFieldRequired(schema.items, checked);
  }
};
