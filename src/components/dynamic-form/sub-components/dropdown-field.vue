<script lang="ts" setup>
import { ref, watch } from 'vue';

type FieldProps = {
  modelValue?: number | unknown;
  error?: boolean;
  errorMessage?: string;
};
const emit = defineEmits(['update:modelValue']);

const localValue = ref();
const props = withDefaults(defineProps<FieldProps>(), {});

const handleUpdate = () => {
  emit('update:modelValue', localValue.value);
};

watch(
  () => props.modelValue,
  (value) => {
    if (JSON.stringify(value) === '{}') {
      localValue.value = null;
    } else localValue.value = value;
  },
  { immediate: true }
);
</script>

<template>
  <q-select
    v-model="localValue"
    :error="!!props.errorMessage"
    :error-message="props.errorMessage"
    v-bind="$attrs"
    @update:model-value="handleUpdate"
  ></q-select>
</template>
