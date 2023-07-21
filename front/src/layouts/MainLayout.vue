<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
      <q-list>
        <q-item clickable v-ripple @click="router.push('/profile')">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section> Профиль </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section> Выйти </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container
      class="desktop-only"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100em;
      "
    >
      <router-view />
    </q-page-container>

    <q-page-container
      class="mobile-only"
      style="display: flex; justify-content: center; align-items: center"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const leftDrawerOpen = ref(false);

const router = useRouter();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const logout = async () => {
  await authStore.logout();
  await router.push('login');
};
</script>
