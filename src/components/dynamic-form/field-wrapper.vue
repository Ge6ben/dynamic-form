<script lang="ts" setup>
import { useField } from 'vee-validate';
import { watch } from 'vue';

import {
  AnyObject,
  FieldMappableFilterInfo,
  RemoteFormSchemaType,
} from 'components/dynamic-form/types';
import DropdownField from 'components/dynamic-form/sub-components/dropdown-field.vue';
import { QInput } from 'quasar';

/**
 * Maps field types to component names
 */
const typeToComponentMapper: AnyObject = {
  [RemoteFormSchemaType.string]: QInput,
  [RemoteFormSchemaType.singleChoice]: DropdownField,
};
type filterFiled = {
  /** Component type*/
  type: RemoteFormSchemaType;
  /** The name that used for validation*/
  fieldName: string;
  /** The model values for component*/
  modelValue: unknown;
  /** Validation Error */
  fieldError?: string;
};
const props = withDefaults(defineProps<filterFiled>(), {});

const emits = defineEmits<{
  /** Emitted when modelValue changes */
  (
    event: 'update:modelValue',
    value: FieldMappableFilterInfo['value']
  ): FieldMappableFilterInfo['value'];
}>();

/**
 * @param event
 * */
const onInput = (event: FieldMappableFilterInfo['value'] | Event) => {
  let newValue;
  newValue = event;

  emits('update:modelValue', newValue as FieldMappableFilterInfo['value']);
  handleChange(event, true);
};

const {
  value: inputValue,
  handleBlur,
  handleChange,
  setValue,
  resetField,
} = useField(props.fieldName);

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) setValue(props.modelValue);
  }
);
</script>
<template>
  <component
    :is="typeToComponentMapper[type]"
    :id="fieldName"
    :error="!!props.fieldError"
    :error-message="props.fieldError"
    :model-value="inputValue"
    :name="fieldName"
    dense
    v-bind="{ ...$attrs }"
    @blur="handleBlur"
    @clear="resetField()"
    @update:model-value="onInput($event)"
  />
</template>
