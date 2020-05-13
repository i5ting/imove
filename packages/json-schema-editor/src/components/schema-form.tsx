/** @jsx jsx */
import { jsx } from '@emotion/core';
import { isUndefined } from 'lodash-es';
import SchemaItem from './schema-item';
import { ObjectSchemaItem, KeyRoute } from '../model';

interface SchemaFormProps {
  data: ObjectSchemaItem;
  keyRoute: KeyRoute;
}

function SchemaForm({ data, keyRoute }: SchemaFormProps): JSX.Element {
  const { required, properties } = data;

  return (
    <div>
      {Object.keys(properties).map((field) => {
        const itemData = properties[field];
        const isRequired = required && required.includes(field);
        const fieldKeyRoute = keyRoute.concat(field);

        return (
          <SchemaItem
            key={field}
            field={field}
            data={itemData}
            required={isRequired}
            keyRoute={fieldKeyRoute}
          >
            {itemData.type === 'object' && !isUndefined(itemData.properties) ? (
              <SchemaForm data={itemData} keyRoute={fieldKeyRoute.concat('properties')} />
            ) : null}
          </SchemaItem>
        );
      })}
    </div>
  );
}

export default SchemaForm;
