<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from 'stores/auth';

const authStore = useAuthStore();

onMounted(() => {
  if (localStorage.getItem('accessToken')) {
    authStore.checkAuth();
  }
});
</script>
