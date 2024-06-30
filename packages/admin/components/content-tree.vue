<script setup lang="ts">
import type OverlayPanel from 'primevue/overlaypanel';
import type { Content, ContentType } from '~/generated/graphql/graphql';
import deleteContentMutation from '~/graphql/contents/delete-content.mutation.gql';

const props = defineProps({
  parent: {
    type: String,
    default: null,
  },
  children: {
    type: Array<Content>,
    default: [],
  },
  level: {
    type: Number,
    default: 1,
  },
  contentTypes: {
    type: Array<ContentType>,
    default: [],
  },
});

const toast = useToast();
const confirm = useConfirm();
const { loading, contentTree, refetch } = useContentTreeQuery({
  parentId: props.parent || null,
});

const { on } = useGlobalEventBus();

on('content:created', (payload) => {
  const parentId = payload.parentId || null;
  const contentId = payload.contentId;

  if (!contentId) return;

  const child = props.children.find((item) => item.contentId === contentId);

  if (child) {
    refetch({
      parentId: props.parent || null,
    });

    return;
  }

  if (props.parent === null && parentId === null) {
    refetch({
      parentId: null,
    });

    return;
  }

  if (parentId === props.parent) {
    refetch({
      parentId: props.parent || null,
    });

    return;
  }

  for (let i = 0; i < props.children.length; i++) {
    if (props.children[i].contentId === parentId) {
      refetch({
        parentId: props.parent || null,
      });

      return;
    }
  }
});
on('content:updated', (payload) => {
  const contentId = payload.contentId;

  if (!contentId) return;

  const child = props.children.find((item) => item.contentId === contentId);

  if (!child) return;

  refetch({
    parentId: props.parent || null,
  });
});

const openTreeContents = ref<Array<string>>([]);

const toggleOpen = (contentId: string) => {
  const index = openTreeContents.value.indexOf(contentId);
  if (index === -1) {
    openTreeContents.value.push(contentId);
  } else {
    openTreeContents.value.splice(index, 1);
  }
};

const menuOverlays = ref<Array<OverlayPanel>>([]);

const isOpen = (contentId: string) => {
  return openTreeContents.value.includes(contentId);
};

const toggleMenuOverlay = (event: MouseEvent, index: number) => {
  menuOverlays.value[index].toggle(event);
};

const treeMenuTypes = computed(() => {
  return props.contentTypes.filter((contentType) => {
    return contentType.isVisibleInTree;
  });
});

const isDeleting = ref(false);

const deleteContent = async (content: Partial<Content>) => {
  isDeleting.value = true;

  const { mutate } = await useMutation(deleteContentMutation, {
    variables: { contentId: content.contentId },
  });

  try {
    await mutate();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Content type ${content.title} deleted.`,
      life: 2000,
    });

    refetch({
      parentId: props.parent || null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: 'Error while deleting content type',
      detail: err.message,
      life: 3000,
    });
  } finally {
    isDeleting.value = false;
  }
};

const confirmContentDeletion = (event: MouseEvent, content: Content) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    group: 'deleteContentGroup',
    message: `Content ${content.title} will be deleted.`,
    accept: () => {
      deleteContent(content);
    },
    reject: () => {},
  });
};
</script>
<template>
  <div>
    <div v-if="loading">
      <div
        v-for="childIndex in children.length > 0 ? children.length : 1"
        :key="`loading-${childIndex}-${parent}`"
        class="py-2 border-t"
      >
        <Skeleton />
      </div>
    </div>
    <div v-else class="dark:text-white">
      <div v-if="contentTree.length === 0">No content added yet.</div>
      <ul v-else class="list-none p-0 m-0">
        <li
          v-for="(item, itemIndex) in contentTree"
          :key="item.content.contentId"
          class="border-t"
        >
          <div
            class="flex gap-2 items-center py-1"
            :style="`padding-left: ${0.5 * level}rem`"
          >
            <button
              v-if="item.children.length > 0"
              class="flex items-center h-6 w-4"
              @click="toggleOpen(item.content.contentId)"
            >
              <i
                :class="
                  isOpen(item.content.contentId)
                    ? 'i-mdi-minus-circle'
                    : 'i-mdi-plus-circle'
                "
              />
            </button>
            <div v-else class="w-4" />

            <span
              v-if="item.content.type.icon"
              class="flex items-center relative"
            >
              <i :class="item.content.type.icon" />
            </span>

            <div class="flex-1 text-sm truncate">
              <NuxtLink
                :to="`/cms/contents/${item.content.type.contentTypeId}/${item.content.contentId}`"
              >
                {{ item.content.title }}
              </NuxtLink>
            </div>

            <div class="flex items-center gap-1">
              <Badge
                value=""
                :severity="
                  item.content.publishedContent ? 'success' : 'warning'
                "
              />
            </div>

            <div>
              <Button
                text
                size="small"
                severity="info"
                :pt="{ root: 'px-1' }"
                @click="toggleMenuOverlay($event, itemIndex)"
              >
                <i class="i-mdi-dots-vertical" />
              </Button>

              <OverlayPanel
                ref="menuOverlays"
                :pt="{ content: 'px-3 py-2 -mt-1' }"
              >
                <NuxtLink
                  v-for="contentType in treeMenuTypes"
                  :key="`tree-menu-${contentType.contentTypeId}`"
                  :to="`/cms/contents/create/${item.content.contentId}/${contentType.contentTypeId}`"
                  class="flex gap-2 items-center py-1"
                >
                  <i v-if="contentType.icon" :class="contentType.icon" />
                  <span>Create new {{ contentType.name }}</span>
                </NuxtLink>
                <button
                  class="flex gap-2 items-center py-1"
                  @click="confirmContentDeletion($event, item.content)"
                >
                  <i class="i-mdi-trash" />
                  <span>Delete</span>
                </button>
              </OverlayPanel>
            </div>
          </div>

          <div v-if="isOpen(item.content.contentId)">
            <ContentTree
              :parent="item.content.contentId"
              :children="item.children"
              :content-types="contentTypes"
              :level="level + 1"
            />
          </div>
        </li>
      </ul>
    </div>

    <ConfirmPopup group="deleteContentGroup">
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
