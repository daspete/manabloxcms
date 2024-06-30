<script setup lang="ts"></script>

<template>
  <div class="flex h-screen w-screen items-center">
    <div class="self-stretch w-1/2 shadow-xl shadow-black">
      <img src="/images/auth.jpg" class="w-full h-full object-cover" />
    </div>
    <div class="flex-1 px-4 flex justify-center">
      <NuxtPage />
    </div>
    <Toast position="top-center" />
  </div>
</template>
