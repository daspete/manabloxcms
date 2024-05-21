<script setup lang="ts">
const { refresh, contentTypes } = useContentTypesQuery();

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

if (!props.field.blockSettings) {
  props.field.blockSettings = {};
}

const blockTypes = computed(() => contentTypes.value.filter((contentType) => contentType.isBlockType === true));
</script>

<template>
  <div class="flex flex-col gap-8">
    <FieldTypeSettings :field="field" />

    <div class="flex gap-4 items-center">
        <label>Block type</label>
        <Dropdown v-model="field.blockSettings.blockType" :options="blockTypes" filter optionLabel="name" placeholder="Select a block type" class="flex-1">
            <template #value="{ value, placeholder }">
                <div v-if="value">
                    {{ value.name }}
                </div>
                <span v-else>
                    {{ placeholder }}
                </span>
            </template>
        </Dropdown>
    </div>
  </div>
</template>
