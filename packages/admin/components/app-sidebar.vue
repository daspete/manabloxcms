<script setup lang="ts">
const { isOpen, toggle } = useSidebar();

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
        label: 'Types',
        icon: 'i-mdi-file-cog',
        route: '/cms/content-types',
      },
    ],
  },
  {
    label: 'Settings',
    icon: 'i-mdi-cog',
    items: [
      {
        label: 'Spaces',
        icon: 'i-mdi-cube',
        route: '/settings/spaces',
      },
      {
        label: 'Users',
        icon: 'i-mdi-account-group',
        route: '/users',
      },
    ],
  },
]);
</script>

<template>
  <div
    :class="`sidebar ${isOpen ? 'w-40' : 'w-16'} bg-surface-950 flex flex-col items-center shadow-lg transition-all`"
  >
    <div class="w-full">
      <Menu
        :model="items"
        :pt="{ root: '', submenuHeader: 'px-2 mt-8 mb-2', content: '' }"
      >
        <template #start>
          <div class="flex flex-col gap-4 items-center">
            <NuxtLink
              to="/"
              class="flex gap-2 items-center h-12 bg-surface-800 w-full justify-center"
            >
              <div class="flex justify-center items-center">
                <div
                  class="text-primary font-extrabold text-2xl -rotate-6 ml-1"
                >
                  M
                </div>
                <div
                  class="text-white font-extrabold text-2xl rotate-6 relative -left-1"
                >
                  B
                </div>
              </div>
              <div v-if="isOpen" class="font-bold">
                <span class="text-primary">MANA</span>
                <span class="text-white">BLOX</span>
              </div>
            </NuxtLink>

            <Button
              text
              aria-label="Filter"
              title="Toggle menubar"
              @click="toggle"
            >
              <i
                class="i-mdi-chevron-right transition-all"
                :class="isOpen ? 'rotate-180' : ''"
              />
            </Button>
          </div>
        </template>

        <template #submenuheader="{ item }">
          <span
            :title="item.label"
            :class="`text-white font-bold leading-none flex gap-2 items-center ${!isOpen ? 'justify-center' : ''}`"
          >
            <i :class="item.icon" />
            <span v-if="isOpen">{{ item.label }}</span>
          </span>
        </template>

        <template #item="{ item }">
          <NuxtLink
            :title="item.label"
            :to="item.route"
            :class="`flex items-center gap-2 py-2 text-primary hover:text-white ${!isOpen ? 'justify-center pl-0' : 'pl-2'}`"
          >
            <span class="h-6 flex items-center"><i :class="item.icon" /></span>
            <span v-if="isOpen">{{ item.label }}</span>
          </NuxtLink>
        </template>
      </Menu>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-primary text-white;
}
</style>
