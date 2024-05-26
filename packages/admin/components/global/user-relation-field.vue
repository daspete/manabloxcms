<script setup lang="ts">
const { users } = useUsersQuery();

const props = defineProps({
  fieldType: {
    type: Object,
    required: true,
  },
  field: {
    type: Object,
    required: true,
  },
});

if (!props.field.user) {
  if (props.fieldType.userSettings?.defaultValue) {
    props.field.user = props.fieldType.userSettings.defaultValue;
  }
}
</script>

<template>
  <div class="flex gap-4 items-center">
    <label :for="fieldType.fieldId">{{ fieldType.name }}</label>
    <Dropdown
      v-model="field.user"
      :options="users"
      show-clear
      filter
      option-label="username"
      placeholder="Select user"
      class="flex-1"
    />
  </div>
</template>
