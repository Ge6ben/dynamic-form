<template>
  <q-btn @click="handleUpdate">Update form Values</q-btn>
  <DynamicForm
    v-model:filter-values="filterValues"
    :fields-schema="fieldsSchema"
    :validation-schema="validationSchema"
    @click:apply-filter="applyFilter"
    @click:apply-clear="applyClear"
  />
</template>

<script lang="ts" setup>
import { z } from 'zod';
import {
  AnyObject,
  FilterKeyValueMap,
  FilterSchema,
} from 'components/dynamic-form/types';
import DynamicForm from 'components/dynamic-form/dynamic-form.vue';
import { ref } from 'vue';
import { toTypedSchema } from '@vee-validate/zod';

function handleUpdate() {
  filterValues.value = {
    name: 'Kaka',
    class: 'apple',
    city: {
      label: 'Kirkuk',
      value: 'kirkuk',
    },
    category: {
      label: 'C',
      value: 'c',
    },
  };
}

const fieldsSchema = ref<FilterSchema[]>([
  {
    label: 'Name',
    type: 'string',
    key: 'name',
    props: {
      color: 'green ',
    },
    col: 6,
  },

  {
    label: 'Class',

    type: 'string',
    key: 'class',
    required: true,
    props: {
      color: 'green ',
    },
    col: 6,
  },
  {
    label: 'City',
    required: true,
    type: 'singleChoice',
    key: 'city',
    props: {
      color: 'blue',
    },
    options: [
      {
        label: 'Kirkuk',
        value: 'kirkuk',
      },
      {
        label: 'Erbil',
        value: 'erbil',
      },
    ],
    col: 6,
  },
  {
    label: 'Category',

    type: 'singleChoice',
    key: 'category',
    props: {
      color: 'blue',
    },
    options: [
      {
        label: 'C',
        value: 'c',
      },
      {
        label: 'D',
        value: 'd',
      },
    ],
    col: 6,
  },
]);
const validationSchema = toTypedSchema(
  z.object({
    class: z.string(),
    name: z.string().optional(),
    city: z.object({ value: z.string(), label: z.string() }),
    category: z.object({ value: z.string(), label: z.string() }).optional(),
  })
);
const filterValues = ref<AnyObject>();

const applyFilter = (e: FilterKeyValueMap) => {
  filterValues.value = e;
  console.log(e, 'Apply');
};
const applyClear = () => {
  console.log('Clear');
};
</script>
