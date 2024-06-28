<script setup lang="ts">
import { vDraggable } from 'vue-draggable-plus';

import type {
  Block,
  BlockItemsField,
  BlockItemsFieldType,
  Content,
  ContentFieldUnion,
  ContentType,
  ContentTypeFieldUnion,
} from '~/generated/graphql/graphql';

type ContentData = {
  content: Content;
  contentType: ContentType;
};
type MessageData = {
  event: string;
  content?: ContentData;
};

const content = ref<Content | null | undefined>(null);
const contentType = ref<ContentType | null | undefined>(null);

const pagecomponents = computed(() => {
  const _pagecomponents = content.value?.fields?.find(
    (field: ContentFieldUnion) => {
      return field.name === 'components';
    },
  ) as BlockItemsField | undefined;

  const pagecomponentContentType = contentType.value?.fields?.find(
    (contentTypeField: ContentTypeFieldUnion) => {
      return contentTypeField.name === 'components';
    },
  ) as BlockItemsFieldType | undefined;

  const pagecomponentTypes =
    pagecomponentContentType?.blocksSettings?.possibleBlockTypes;

  if (_pagecomponents) {
    return _pagecomponents.blocks.map((block: Block) => {
      return {
        blockId: block.blockId,
        fields: block.fields,
        type: pagecomponentTypes?.find((type: ContentType) => {
          return type.contentTypeId === block.type;
        }),
      };
    });
  }

  return [];
});

onMounted(() => {
  window.parent.postMessage(
    {
      event: 'initialized',
      content: {
        pagecomponentsFieldName: 'components',
      },
    },
    '*',
  );

  window.addEventListener('message', postMessageHandler);
});

const postMessageHandler = (event: MessageEvent<MessageData>) => {
  switch (event.data.event) {
    case 'setcontent': {
      content.value = event.data.content?.content;
      contentType.value = event.data.content?.contentType;
      break;
    }
  }
};

const onChangePagecomponentPosition = (event: {
  oldIndex: number;
  newIndex: number;
}) => {
  if (event.oldIndex === event.newIndex) return;

  window.parent.postMessage(
    {
      event: 'changepagecomponentposition',
      content: {
        oldPagecomponentIndex: event.oldIndex,
        newPagecomponentIndex: event.newIndex,
      },
    },
    '*',
  );
};
</script>

<template>
  <div
    v-draggable="[
      pagecomponents,
      {
        handle: '.pagecomponent-drag-handle',
        animation: 150,
        onUpdate: onChangePagecomponentPosition,
      },
    ]"
  >
    <div
      v-for="(pagecomponent, pagecomponentIndex) in pagecomponents"
      :key="pagecomponent.blockId"
      class="group relative hover:outline outline-1 hover:outline-blue-500 min-h-12"
    >
      <component
        :is="`Lazy${pagecomponent.type.name}`"
        v-if="pagecomponent.type"
        :fields="pagecomponent.fields"
      />

      <div
        class="absolute top-0 left-0 right-0 bottom-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-all"
      />

      <div
        class="absolute top-0 right-0 left-0 opacity-0 group-hover:opacity-100 transition-all"
      >
        <div class="flex justify-between items-start">
          <div class="flex text-white">
            <div
              v-if="pagecomponents.length > 1"
              class="flex flex-col bg-blue-500"
            >
              <button
                v-if="pagecomponentIndex > 0"
                @click="
                  onChangePagecomponentPosition({
                    oldIndex: pagecomponentIndex,
                    newIndex: pagecomponentIndex - 1,
                  })
                "
              >
                <i class="i-mdi-chevron-up" />
              </button>
              <button class="pagecomponent-drag-handle">
                <i class="i-mdi-menu" />
              </button>
              <button
                v-if="pagecomponentIndex < pagecomponents.length - 1"
                @click="
                  onChangePagecomponentPosition({
                    oldIndex: pagecomponentIndex,
                    newIndex: pagecomponentIndex + 1,
                  })
                "
              >
                <i class="i-mdi-chevron-down" />
              </button>
            </div>
            <div class="bg-blue-500 pl-1 flex gap-2" />
          </div>
          <div class="bg-blue-500">a b c</div>
        </div>
      </div>
    </div>
  </div>
</template>
