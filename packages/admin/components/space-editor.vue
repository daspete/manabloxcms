<script setup lang="ts">
import type { ContentType, Space } from '~/generated/graphql/graphql';
import { v4 as uuid4 } from 'uuid';

const { contentTypes } = useContentTypesQuery();

const props = defineProps({
  space: {
    type: Object as PropType<Partial<Space>>,
    required: true,
  },
});

const blockTypes = computed(() =>
  contentTypes.value.filter((contentType) => contentType.isBlockType === true),
);

const onSettingsBlockTypeChange = (value: ContentType) => {
  if (!value) {
    props.space.settings = undefined;
  } else {
    props.space.settings = {
      blockId: uuid4(),
      type: value.name,
      fields: [],
    };
  }
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <div>
      <label for="space-name">Name</label>
      <InputText id="space-name" v-model="space.name" class="w-full" />
    </div>
    <div>
      <label for="space-technical-name">Technical name</label>
      <InputText
        id="space-technical-name"
        v-model="space.technicalName"
        class="w-full"
      />
    </div>

    <div>
      <label for="space-description">Description</label>
      <InputText
        id="space-description"
        v-model="space.description"
        class="w-full"
      />
    </div>

    <div>
      <label for="space-url">Url</label>
      <InputText id="space-url" v-model="space.url" class="w-full" />
    </div>

    <div class="flex gap-2 items-center">
      <div>
        <label for="space-settings-block-type">Settings block type</label>
      </div>
      <Dropdown
        id="space-settings-block-type"
        v-model="space.settingsBlockType"
        :options="blockTypes"
        filter
        option-label="name"
        placeholder="Select a block type for your space settings"
        class="flex-1"
        @update:model-value="onSettingsBlockTypeChange"
      >
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

    <div v-if="space.settings?.type">
      <BlockEditor :block="space.settings" />
    </div>
  </div>
</template>
