<script setup lang="ts">
const userMenuItems = ref([
  {
    label: "Profile",
    route: "/profile",
  },
  {
    label: "Logout",
    route: "/logout",
  },
]);

const userMenu = ref();
const toggleUserMenu = (event: Event) => userMenu.value.toggle(event);
</script>

<template>
  <div class="usermenu">
    <a v-ripple>
      <Avatar
        class="cursor-pointer"
        icon="i-mdi-user"
        shape="circle"
        @click="toggleUserMenu"
        aria-haspopup="true"
        aria-controls="usermenu"
      />
    </a>
    <Menu ref="userMenu" id="usermenu" :model="userMenuItems" :popup="true" />
  </div>
</template>
