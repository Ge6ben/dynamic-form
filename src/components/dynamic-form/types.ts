/**
 * The definition of filterable fields
 */
export interface FilterSchema {
  key: string;
  label?: string;
  type: FilterSchemaType;
  placeholder?: string;
  options?: Record<'label' | 'value', unknown>[] | unknown[];
  required?: boolean;
  props?: Record<string, unknown>;
  class?: string;
  col?: number;
  title?: string;
}

export type AnyObject = Record<string, unknown>;
export type FilterSchemaType = 'string' | 'singleChoice';

/**
 * A type to hold data suitable to be mapped to dynamic form field component
 */
export interface FieldMappableFilterInfo {
  key: FilterSchema['key'];
  type: RemoteFormSchemaType;
  label?: string;
  options?: Record<'label' | 'value', unknown>[];
  required?: boolean;
  value: null | string | string[] | number | number[] | Date;
  loading?: boolean;
  props?: Record<string, unknown>;
  class?: string;
  col?: number;
  tooltip?: string;
  placeholder?: string;
}

export enum RemoteFormSchemaType {
  string = 'string',
  singleChoice = 'singleChoice',
}

/**'
 * A type used for internal representation of applied filters
 */
export type FilterKeyValueMap = Record<
  FilterSchema['key'],
  null | string | string[] | number | number[] | Record<string, number | Date>
>;
