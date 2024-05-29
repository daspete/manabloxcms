<script setup lang="ts">
const router = useRouter();

const isOpen = ref(false);

const items = ref([
    {
        label: 'Router',
        icon: 'pi pi-palette',
        items: [
            {
                label: 'Styled',
                icon: 'pi pi-eraser',
                route: '/theming'
            },
            {
                label: 'Unstyled',
                icon: 'pi pi-heart',
                route: '/unstyled'
            }
        ]
    },
    {
        label: 'Programmatic',
        icon: 'pi pi-link',
        command: () => {
            router.push('/introduction');
        }
    },
    {
        label: 'External',
        icon: 'pi pi-home',
        items: [
            {
                label: 'Vue.js',
                icon: 'pi pi-star',
                url: 'https://vuejs.org/'
            },
            {
                label: 'Vite.js',
                icon: 'pi pi-bookmark',
                url: 'https://vuejs.org/'
            }
        ]
    }
]);
</script>

<template>
  <div
    :class="`sidebar ${isOpen ? 'w-32' : 'w-16'} bg-surface-950 flex flex-col items-center shadow-lg transition-all`"
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
      <PanelMenu :model="items" class="w-full" :pt="{ headerContent: 'bg-black' }">
        <template #item="{ item }">
          <router-link
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a
              v-ripple
              class="flex items-center cursor-pointer text-primary px-3 py-2"
              :href="href"
              @click="navigate"
            >
              <span :class="item.icon" />
              <span class="ml-2 text-color" v-if="isOpen">{{ item.label }}</span>
            </a>
          </router-link>
          <a
            v-else
            v-ripple
            class="flex items-center cursor-pointer text-primary px-3 py-2"
            :href="item.url"
            :target="item.target"
          >
            <span :class="item.icon" />
            <span class="ml-2" v-if="isOpen">{{ item.label }}</span>
            <span
              v-if="item.items"
              class="pi pi-angle-down text-primary ml-auto"
            />
          </a>
        </template>
      </PanelMenu>
    </div>
  </div>
</template>
