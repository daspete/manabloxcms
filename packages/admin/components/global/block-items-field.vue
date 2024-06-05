<script setup lang="ts">
import { vDraggable } from 'vue-draggable-plus';
import { v4 as uuid4 } from 'uuid';
import type { ContentType } from '~/generated/graphql/graphql';

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

if (!props.field.blocks) {
  props.field.blocks = [];
}

const blockSelectionMenu = ref();
const toggleBlockTypeDropdown = (event: Event) => {
  blockSelectionMenu.value.toggle(event);
};

const blockSelectionMenuItems =
  props.fieldType.blocksSettings.possibleBlockTypes.map(
    (blockType: ContentType) => {
      return {
        label: blockType.name,
        command: () => {
          addBlock(blockType);
        },
      };
    },
  );

const addBlock = (blockType: ContentType) => {
  props.field.blocks.push({
    blockId: uuid4(),
    type: blockType.contentTypeId,
    fields: [],
  });
};

const getBlockType = (contentTypeId: string) => {
  return props.fieldType.blocksSettings.possibleBlockTypes.find(
    (blockType: ContentType) => {
      return blockType.contentTypeId === contentTypeId;
    },
  );
};
</script>

<template>
  <div>
    <Fieldset :legend="field.name" :toggleable="true">
      <div class="flex flex-col gap-4">
        <div v-if="fieldType.blocksSettings.possibleBlockTypes.length > 1">
          <Button
            type="button"
            label="Add new block"
            icon="i-mdi-plus"
            size="small"
            aria-haspopup="true"
            aria-controls="block-selection-menu"
            severity="secondary"
            @click="toggleBlockTypeDropdown"
          />
          <Menu
            id="block-selection-menu"
            ref="blockSelectionMenu"
            :popup="true"
            :model="blockSelectionMenuItems"
          />
        </div>
        <div
          v-else-if="fieldType.blocksSettings.possibleBlockTypes.length === 1"
        >
          <Button
            type="button"
            :label="`Add new ${fieldType.blocksSettings.possibleBlockTypes[0].name}`"
            icon="i-mdi-plus"
            size="small"
            aria-haspopup="true"
            aria-controls="block-selection-menu"
            severity="secondary"
            @click="addBlock(fieldType.blocksSettings.possibleBlockTypes[0])"
          />
        </div>

        <div>
          <div v-if="!field.blocks?.length">No blocks added yet.</div>
          <Accordion
            v-else
            v-draggable="[
              field.blocks,
              { handle: '.drag-handle', animation: 150 },
            ]"
            :multiple="true"
          >
            <AccordionTab v-for="block in field.blocks" :key="block.blockId">
              <template #header>
                <div class="flex items-center gap-2">
                  <div class="drag-handle">
                    <Button
                      class="w-12 h-4"
                      icon="i-mdi-menu"
                      text
                      rounded
                      severity="secondary"
                    />
                  </div>
                  <div class="flex-1">{{ getBlockType(block.type)?.name }}</div>
                </div>
              </template>
              <div class="ml-14">
                <BlockEditor :block="block" />
              </div>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </Fieldset>
  </div>
</template>
