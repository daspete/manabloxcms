<script setup lang="ts"></script>

<template>
  <div class="h-screen w-screen items-center">
    <img src="/images/auth.jpg" class="w-full h-full object-cover" />

    <div class="w-full h-full absolute top-0 left-0">
      <div class="container h-full">
        <div class="flex justify-end h-full w-full">
          <div
            class="px-4 flex justify-center bg-white/70 backdrop-blur w-[350px] shadow-white/80 shadow-xl"
          >
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>

    <Toast position="top-center" />
  </div>
</template>
