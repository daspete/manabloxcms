<script setup lang="ts">
// import { useDraggable } from 'vue-draggable-plus';
import { vDraggable } from 'vue-draggable-plus';
import { v4 as uuid4 } from "uuid";

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

if(!props.field.blocks) {
    props.field.blocks = [];
}

const blockSelectionMenu = ref();
const toggleBlockTypeDropdown = (event: Event) => {
  blockSelectionMenu.value.toggle(event);
};

const blockSelectionMenuItems = props.fieldType.blocksSettings.possibleBlockTypes.map(
  (blockType: any) => {

    return {
      label: blockType.name,
      command: () => {
        addBlock(blockType);
      },
    };
  }
);

const addBlock = (blockType: any) => {
  props.field.blocks.push({
    blockId: uuid4(),
    type: blockType.name,
    fields: []
  });
};
</script>

<template>
  <div>
    <Fieldset :legend="field.name" :toggleable="true">
      <div class="flex flex-col gap-4">
        <div>
          <Button
            type="button"
            label="Add new block"
            @click="toggleBlockTypeDropdown"
            icon="i-mdi-plus"
            size="small"
            aria-haspopup="true"
            aria-controls="block-selection-menu"
            severity="secondary"
          />
          <Menu
            ref="blockSelectionMenu"
            id="block-selection-menu"
            :popup="true"
            :model="blockSelectionMenuItems"
          />
        </div>

        <div>
          <div v-if="!field.blocks?.length">
            No blocks added yet.
          </div>
          <Accordion v-else :multiple="true" v-draggable="[field.blocks, { handle: '.drag-handle', animation: 150 }]">
            <AccordionTab
              v-for="block in field.blocks"
              :key="block.blockId"
            >
              <template #header>
                <div class="flex items-center gap-2">
                  <div class="drag-handle"><Button class="w-12 h-4" icon="i-mdi-menu" text rounded severity="secondary" /></div>
                  <div class="flex-1">{{ block.type }}</div>
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
