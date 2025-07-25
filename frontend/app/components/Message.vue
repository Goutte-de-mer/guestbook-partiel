<template>
  <div
    class="border-green w-full max-w-2xl rounded-md border-l-5 bg-white px-4 py-2.5 shadow-md/5"
  >
    <p class="text-green mb-2 font-semibold">{{ message.name }}</p>
    <p>{{ message.message }}</p>
  </div>
</template>

<script setup>
const { message } = defineProps({
  message: Object,
});
</script>
