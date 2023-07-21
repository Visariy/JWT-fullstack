<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    "
  >
    <TestForm />
  </div>
</template>

<script setup lang="ts">
import TestForm from 'src/components/RegisterForm.vue';
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
}
</style>
