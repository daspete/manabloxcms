<script setup lang="ts">
const mainMenuItems = ref([
  {
    label: 'Home',
    icon: 'i-mdi-home',
    route: '/'
  },
  {
    label: 'CMS',
    icon: 'i-mdi-file-document-edit',
    items: [
      {
        label: 'Content',
        icon: 'i-mdi-file-tree',
        route: '/cms/contents'
      },
      {
        label: 'Content Types',
        icon: 'i-mdi-file-cog',
        route: '/cms/content-types'
      }
    ]
  },
  {
    label: 'User',
    icon: 'i-mdi-account-group',
    route: '/users',
  },
  {
    label: 'Settings',
    icon: 'i-mdi-cog',
    items: [
      {
        label: 'Spaces',
        icon: 'i-mdi-cube',
        route: '/settings/spaces'
      }
    ]
  }
]);
</script>

<template>
  <div class="mainmenu sticky top-0 z-20 shadow">
    <Menubar :model="mainMenuItems">
      <template #start>
        <div class="uppercase font-bold text-xl mr-4">
          <span class="text-primary">Mana</span>
          <span class="text-primary">blox</span>
        </div>
      </template>

      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="i-mdi-chevron-down ml-2" />
        </a>
      </template>

      <template #end>
        <div class="flex items-center gap-2">
          <MainSearch />
          <UserMenu />
        </div>
      </template>
    </Menubar>
  </div>
</template>
