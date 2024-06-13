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
      :filter-fields="['firstname', 'lastname', 'email']"
      placeholder="Select user"
      class="flex-1"
    >
      <template #option="{ option }">
        <div v-if="option.firstname || option.lastname" class="flex gap-1">
          <span v-if="option.firstname">{{ option.firstname }}</span>
          <span v-if="option.lastname">{{ option.lastname }}</span>
        </div>
        <div v-else>{{ option.email }}</div>
      </template>

      <template #value="{ value, placeholder }">
        <div v-if="!value">
          {{ placeholder }}
        </div>
        <div v-else>
          <div v-if="value.firstname || value.lastname" class="flex gap-1">
            <span v-if="value.firstname">{{ value.firstname }}</span>
            <span v-if="value.lastname">{{ value.lastname }}</span>
          </div>
          <div v-else>{{ value.email }}</div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
