<script setup lang="ts">
import type {
  Block,
  BlockItemsField,
  BlockItemsFieldType,
  Content,
  ContentType,
} from '~/generated/graphql/graphql';

const { currentSpace } = useCurrentSpace();

const iframe = ref<HTMLIFrameElement | null>(null);

const props = defineProps({
  contentType: {
    type: Object as PropType<ContentType>,
    required: true,
  },
  content: {
    type: Object as PropType<Partial<Content>>,
    required: true,
  },
});

if (!props.content.type) {
  props.content.type = props.contentType;
}

defineEmits(['on-close']);

const pagecomponentsFieldName = ref<string | null | undefined>(null);

const contentFields = computed(() => {
  return props.content.fields?.filter((field) => {
    return !!getFieldType(props.contentType, field);
  });
});

const pagecomponentsField = computed(() => {
  return contentFields.value?.find((field) => {
    return field.name === pagecomponentsFieldName.value;
  }) as BlockItemsField | undefined;
});

type ChangePagecomponentPositionMessageData = {
  oldPagecomponentIndex: number;
  newPagecomponentIndex: number;
  pagecomponentsFieldName: string;
};

type InitializedMessageData = {
  pagecomponentsFieldName: string;
};

type MessageData = {
  event: string;
  content?: ChangePagecomponentPositionMessageData | InitializedMessageData;
};

onMounted(() => {
  iframe.value = document.querySelector('#contentpreview');

  window.addEventListener('message', postMessageHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', postMessageHandler);
});

watch(props.content, () => {
  iframe.value?.contentWindow?.postMessage(
    {
      event: 'setcontent',
      content: {
        content: clone(props.content),
        contentType: clone(props.contentType),
      },
    },
    '*',
  );
});

const postMessageHandler = (event: MessageEvent<MessageData>) => {
  switch (event.data.event) {
    case 'initialized': {
      pagecomponentsFieldName.value =
        event.data.content?.pagecomponentsFieldName;

      iframe.value?.contentWindow?.postMessage(
        {
          event: 'setcontent',
          content: {
            content: clone(props.content),
            contentType: clone(props.contentType),
          },
        },
        '*',
      );
      break;
    }

    case 'changepagecomponentposition': {
      const changeData = event.data
        .content as ChangePagecomponentPositionMessageData;

      props.content.fields = props.content.fields?.map((field) => {
        if (field.name === pagecomponentsFieldName.value) {
          const blocks = (field as BlockItemsField).blocks;
          return {
            ...field,
            blocks: blocks.map((block: Block, blockIndex: number) => {
              if (blockIndex === changeData.oldPagecomponentIndex) {
                return blocks[changeData.newPagecomponentIndex];
              }

              if (blockIndex === changeData.newPagecomponentIndex) {
                return blocks[changeData.oldPagecomponentIndex];
              }

              return block;
            }),
          };
        }

        return field;
      });

      iframe.value?.contentWindow?.postMessage(
        {
          event: 'setcontent',
          content: {
            content: clone(props.content),
            contentType: clone(props.contentType),
          },
        },
        '*',
      );

      break;
    }
  }
};
</script>

<template>
  <div
    class="w-full h-full bg-white absolute left-0 top-0 flex flex-col justify-stretch"
  >
    <div class="flex justify-end shadow w-full">
      <div class="px-4 py-2">
        <Button label="Close visual editor" @click="$emit('on-close')" />
      </div>
    </div>
    <div class="flex-1 flex items-stretch">
      <div class="w-96">bla</div>
      <div class="flex-1">
        <iframe
          id="contentpreview"
          :src="`${currentSpace?.url}/preview`"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
          class="w-full h-full"
        />
      </div>
      <div class="w-[440px] px-4 py-4">
        <div v-if="!pagecomponentsField">
          There are no pagecomponents on this {{ contentType.name }}
        </div>
        <div v-else>
          <BlockItemsField
            :field-type="
              getFieldType(
                contentType,
                pagecomponentsField,
              ) as BlockItemsFieldType
            "
            :field="pagecomponentsField"
          />
        </div>
      </div>
    </div>
  </div>
</template>
