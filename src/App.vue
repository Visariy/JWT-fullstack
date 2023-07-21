<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter()

const authStore = useAuthStore();

onMounted( async () => {
  try {
    if (localStorage.getItem('accessToken')) {
      await authStore.checkAuth();
    }
  } catch (e) {
    await router.push('/login')
  }
});
</script>
