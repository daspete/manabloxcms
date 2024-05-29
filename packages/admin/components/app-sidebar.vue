<script setup lang="ts">
const router = useRouter();

const isOpen = ref(false);

const items = ref([
  {
    label: 'CMS',
    icon: 'i-mdi-file-document-edit',
    items: [
      {
        label: 'Contents',
        icon: 'i-mdi-file-tree',
        route: '/cms/contents',
      },
      {
        label: 'Content types',
        icon: 'i-mdi-file-tree',
        route: '/cms/content-types',
      },
    ],
  },
  {
    label: 'Users',
    icon: 'i-mdi-account-group',
    command: () => {
      router.push('/introduction');
    },
  },
  {
    label: 'Settings',
    icon: 'i-mdi-cog',
    items: [
      {
        label: 'Spaces',
        icon: 'i-mdi-cube',
        url: 'https://vuejs.org/',
      },
    ],
  },
]);
</script>

<template>
  <div
    :class="`sidebar ${isOpen ? 'w-40' : 'w-16'} bg-surface-950 flex flex-col items-center shadow-lg transition-all`"
  >
    <NuxtLink
      to="/"
      class="flex justify-center items-center h-12"
      title="ManaBlox"
    >
      <div class="text-primary font-extrabold text-2xl -rotate-6 ml-1">M</div>
      <div class="text-white font-extrabold text-2xl rotate-6 relative -left-1">
        B
      </div>
    </NuxtLink>
    <div>
      <Button
        text
        aria-label="Filter"
        title="Toggle menubar"
        @click="isOpen = !isOpen"
      >
        <i
          class="i-mdi-chevron-right transition-all"
          :class="isOpen ? 'rotate-180' : ''"
        />
      </Button>
    </div>

    <div>
      <PanelMenu
        :model="items"
        :pt-options="{
          mergeProps: true
        }"
        :pt="{
          headerContent: ({ context }) => ({
            class: {
              // 'bg-primary': context.active,
              // 'bg-black': !context.active,
              'bg-transparent': true,
              'text-white hover:text-primary': !context.active,
              'text-primary hover:text-white': context.active,
            }

          }),
          panel: 'border-0',
          menuContent: 'bg-transparent',
          content: ({ context }) => ({
            class: {
              'text-white': !context.active,
              'text-primary': context.active,

            }
          })
        }"
      >
        <template #item="{ item }">
          <NuxtLink
            v-if="item.route"
            :to="item.route"
          >
            <a
              v-ripple
              class="flex items-center cursor-pointer px-3 py-2"
            >
              <span :class="item.icon" />
              <span class="ml-2 text-color" v-if="isOpen">{{
                item.label
              }}</span>
            </a>
          </NuxtLink>
          <a
            v-else
            v-ripple
            class="flex items-center cursor-pointer px-3 py-2"
            :href="item.url"
            :target="item.target"
          >
            <span :class="item.icon" />
            <span class="ml-2" v-if="isOpen">{{ item.label }}</span>
            <span
              v-if="item.items"
              class="pi pi-angle-down ml-auto"
            />
          </a>
        </template>
      </PanelMenu>
    </div>
  </div>
</template>
