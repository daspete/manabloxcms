<script setup lang="ts">
import { vDraggable } from 'vue-draggable-plus';
import { v4 as uuid4 } from 'uuid';
import type {
  BlockInput,
  ContentType,
} from '~/generated/graphql/graphql';

const confirm = useConfirm();

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

const confirmBlockDeletion = (event: MouseEvent, block: BlockInput) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    group: 'deleteBlockGroup',
    message: `Block will be deleted.`,
    accept: () => {
      deleteBlock(block);
    },
    reject: () => {},
  });
};

const deleteBlock = async (block: BlockInput) => {
  props.field.blocks = props.field.blocks.filter((blockItem: BlockInput) => {
    return blockItem.blockId !== block.blockId;
  });
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
          <div
            v-else
            v-draggable="[
              field.blocks,
              { handle: '.drag-handle', animation: 150 },
            ]"
            class="flex flex-col gap-2"
          >
            <Panel
              v-for="block in field.blocks"
              :key="block.blockId"
              toggleable
              collapsed
            >
              <template #header>
                <div class="flex items-center gap-2">
                  <div class="drag-handle">
                    <button class="flex items-center">
                      <i class="i-mdi-menu" />
                    </button>
                  </div>
                  <div class="flex-1 flex gap-2 items-center">
                    <span
                      v-if="getBlockType(block.type)?.icon"
                      class="flex items-center"
                      ><i :class="getBlockType(block.type)?.icon"
                    /></span>
                    <span>{{ getBlockType(block.type)?.name }}</span>
                  </div>
                </div>
              </template>

              <template #icons>
                <button
                  class="text-surface-600 dark:text-surface-0/80"
                  @click="confirmBlockDeletion($event, block)"
                >
                  <i class="i-mdi-trash" />
                </button>
              </template>

              <template #togglericon="{ collapsed }">
                <i
                  :class="collapsed ? 'i-mdi-chevron-down' : 'i-mdi-chevron-up'"
                />
              </template>

              <BlockEditor :block="block" />
            </Panel>
          </div>
        </div>
      </div>
    </Fieldset>

    <ConfirmPopup group="deleteBlockGroup">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="px-4 py-2">
          <div class="text-center font-bold">Are you sure?</div>
          <div>{{ message.message }}</div>
          <div class="flex gap-2 items-center justify-center mt-2">
            <Button
              label="Yes"
              size="small"
              icon="i-mdi-check"
              severity="danger"
              @click="acceptCallback"
            />
            <Button
              label="No"
              size="small"
              icon="i-mdi-window-close"
              severity="success"
              @click="rejectCallback"
            />
          </div>
        </div>
      </template>
    </ConfirmPopup>
  </div>
</template>
