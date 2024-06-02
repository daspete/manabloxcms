<script setup lang="ts">
import type OverlayPanel from 'primevue/overlaypanel';

const props = defineProps({
  parent: {
    type: String,
    default: null,
  },
});

const { loading, contentTree } = useContentTreeQuery({
  parentId: props.parent || null,
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
  console.log(menuOverlays);
  menuOverlays.value[index].toggle(event);
};
</script>
<template>
  <div>
    <div v-if="loading" class="text-center">
      <Skeleton class="mb-2" />
    </div>
    <div v-else>
      <ul class="list-none p-0 m-0 dark:text-white">
        <li v-for="(item, itemIndex) in contentTree" :key="item.contentId">
          <div class="flex gap-2 items-center">
            <button
              class="flex items-center h-6 w-4"
              @click="toggleOpen(item.contentId)"
            >
              <i
                :class="
                  isOpen(item.contentId)
                    ? 'i-mdi-minus-box-outline'
                    : 'i-mdi-plus-box-outline'
                "
              />
            </button>
            <div class="flex-1 text-sm">
              <NuxtLink
                :to="`/cms/contents/${item.type.contentTypeId}/${item.contentId}`"
                >{{ item.title }}</NuxtLink
              >
            </div>
            <div>
              <Button
                text
                size="small"
                severity="info"
                :pt="{ root: 'pl-6' }"
                @click="toggleMenuOverlay($event, itemIndex)"
              >
                <i class="i-mdi-dots-vertical" />
              </Button>
              <OverlayPanel
                ref="menuOverlays"
                :pt="{ content: 'px-2 py-1 -mt-1' }"
              >
                <NuxtLink
                  :to="`/cms/contents/create/${item.contentId}/${item.type.contentTypeId}`"
                >
                  Create new page
                </NuxtLink>
              </OverlayPanel>
            </div>
          </div>
          <div v-if="isOpen(item.contentId)" class="pl-2">
            <ContentTree :parent="item.contentId" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
