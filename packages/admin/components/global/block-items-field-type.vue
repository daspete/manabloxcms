<script setup lang="ts">
const { contentTypes } = useContentTypesQuery();

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

if (!props.field.blocksSettings) {
  props.field.blocksSettings = {};
}

const blockTypes = computed(() => contentTypes.value.filter((contentType) => contentType.isBlockType === true));
</script>

<template>
  <div class="flex flex-col gap-8">
    <FieldTypeSettings :field="field" />

    <div class="flex gap-4 items-center">
      <label>Possible block types</label>
      <MultiSelect v-model="field.blocksSettings.possibleBlockTypes" :options="blockTypes" filter display="chip" optionLabel="name" placeholder="Select possible block types" class="flex-1" />
    </div>
  </div>
</template>
