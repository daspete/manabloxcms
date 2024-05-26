<script setup lang="ts">
const { users } = useUsersQuery();

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

if (!props.field.userSettings) {
  props.field.userSettings = {};
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <FieldTypeSettings :field="field" />

    <div class="flex gap-4 items-center">
      <label for="user-relation">Default user</label>
      <Dropdown
        v-model="field.userSettings.defaultValue"
        :options="users"
        show-clear
        filter
        option-label="username"
        placeholder="Select default user"
        class="flex-1"
      />
    </div>
  </div>
</template>
