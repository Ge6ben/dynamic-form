<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { ref, watch } from 'vue';

import FieldWrapper from './field-wrapper.vue';
import {
  FieldMappableFilterInfo,
  FilterKeyValueMap,
  FilterSchema,
} from 'components/dynamic-form/types';
import {
  handleFilterFieldChange,
  initMappableFilterFields,
} from 'components/dynamic-form/helper';

export type RRemoteFormProps = {
  /** Hold schema that been suitable to render component */
  fieldsSchema: FilterSchema[];
  /** The model value of filtered values */
  filterValues: Record<string, unknown> | undefined;
  /** The Components Schema */
  validationSchema: unknown;
};
const props = withDefaults(defineProps<RRemoteFormProps>(), {});

const emits = defineEmits<{
  /** Emitted when filter values changes */
  (event: 'update:filterValues', value: Record<string, unknown>): Record<
    string,
    unknown
  >;
  /** Is a custom events fire when click on `apply` button */
  (event: 'click:apply-filter', value: FilterKeyValueMap): FilterKeyValueMap;
  /** emitted when filter values cleared */
  (event: 'click:clear-filter'): void;
}>();
const fieldMap = ref<FieldMappableFilterInfo[]>([]);

watch(
  () => props.filterValues,
  async () => {
    fieldMap.value = await initMappableFilterFields(
      props.fieldsSchema,
      props.filterValues
    );
  },
  { immediate: true, deep: true }
);

/**
 * Format Label
 * @param label
 * @param isRequired
 * */
function formatLabel(label = '', isRequired = false) {
  return label ? `${label} ${isRequired ? ' *' : ''}` : '';
}

function handleInputChange(
  field: FieldMappableFilterInfo,
  event: FieldMappableFilterInfo['value']
) {
  const newFilterKeyValueMap = handleFilterFieldChange(
    event,
    field,
    props.filterValues || {}
  );
  emits('update:filterValues', newFilterKeyValueMap);
}

const { handleSubmit, resetForm, errors } = useForm({
  validationSchema: props.validationSchema,
});
const onSubmit = handleSubmit((values) => {
  emits('update:filterValues', values);
  emits('click:apply-filter', values);
});

const handleResetForm = async () => {
  resetForm();
  emits('click:clear-filter');
  emits('update:filterValues', {});
};
</script>
<template>
  <!----------------------------------------- Filters Wrapper Components  ---------------------------------->
  <q-card class="q-ma-md q-pa-md">
    <form class="row" @submit.prevent="onSubmit">
      <div
        v-for="field in fieldMap"
        :key="field.key"
        :class="`col-${field?.col || 12} q-pa-sm`"
      >
        <FieldWrapper
          :class="field.class"
          :field-error="errors[field.key]"
          :field-name="field.key"
          :fieldInputType="field.type"
          :label="formatLabel(field?.label, field.required)"
          :model-value="field.value"
          :options="field.options"
          :type="field.type"
          :value="field.value"
          clearable
          outlined
          v-bind="field.props"
          @update:model-value="handleInputChange(field, $event)"
        />
      </div>

      <!----------------------------------------- Form Actions  -------------------------------------->
      <div class="col-12 q-mt-md" style="text-align: end">
        <q-btn class="q-mr-md" flat no-caps @click="handleResetForm"
          >Clear
        </q-btn>
        <q-btn color="primary" no-caps type="submit">Apply</q-btn>
      </div>
    </form>
  </q-card>
</template>
<style lang="scss" scoped></style>
