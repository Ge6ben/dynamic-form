import {
  FieldMappableFilterInfo,
  FilterSchema,
  RemoteFormSchemaType,
} from 'components/dynamic-form/types';

/**
 * a utility function to initialize a filterable field schema into an array
 * that can be mapped into different component fields. Note this does not
 * populate choice items with data
 * @param filterSchemas
 * @param filterValues
 */
export async function initMappableFilterFields(
  filterSchemas: FilterSchema[],
  filterValues: Record<string, unknown> | undefined
): Promise<FieldMappableFilterInfo[]> {
  const result = [] as FieldMappableFilterInfo[];

  for (const schema of filterSchemas) {
    switch (schema.type) {
      case RemoteFormSchemaType.string:
      case RemoteFormSchemaType.singleChoice: {
        result.push({
          ...schema,
          value: filterValues ? filterValues[schema.key] : null,
        } as FieldMappableFilterInfo);
        break;
      }

      default:
        throw new Error(`
          Unknown filter type:  ${schema.type}`);
    }
  }
  return result;
}

/**
 * Handles the change for individual filter field value changes. Note: It does
 * not update the value in each field object. It mutates the filter fields
 * and returns a new filter key value map. mutateFilterFields util function
 * is responsible for updating the values in filter fields
 * @param newValue
 * @param field
 * @param filterKeyValueMap
 */
export function handleFilterFieldChange(
  newValue: FieldMappableFilterInfo['value'],
  field: FieldMappableFilterInfo,
  filterKeyValueMap: Record<string, unknown>
): Record<string, unknown> {
  const newFilterKeyValueMap = { ...filterKeyValueMap };
  switch (field.type) {
    case RemoteFormSchemaType.string:
    case RemoteFormSchemaType.singleChoice:
      if (!newValue && newFilterKeyValueMap[field.key]) {
        delete newFilterKeyValueMap[field.key];
      } else
        newFilterKeyValueMap[field.key] = newValue as
          | string
          | number
          | string[]
          | number[]
          | null;
      break;
    default:
      throw new Error(`invalid field filter type:  ${field.type} `);
  }
  return newFilterKeyValueMap;
}
