<template>
  <main
    class="flex min-h-screen w-full flex-col gap-8 bg-[#f9f9f9] p-5 md:flex-row md:p-10"
  >
    <div>
      <MessageForm @message-created="refreshMessages" />
    </div>
    <div class="h-full flex-1">
      <p v-if="loading" class="text-gray-400">Chargement des messages...</p>
      <ul v-else-if="messages.length > 0" class="space-y-8">
        <Message v-for="message in messages" :message />
      </ul>
      <p v-else>Aucun message</p>
    </div>
  </main>
</template>

<script setup>
import { getMessages } from "~/api";
const messages = ref([]);
const loading = ref(true);
const errorMessage = ref(null);

const fetchMessages = async () => {
  loading.value = true;
  try {
    const response = await getMessages();

    const data = await response.json();
    if (response.ok) {
      messages.value = data.messages;
      console.log(messages.value);
    } else {
      errorMessage.value = data.message;
    }
  } catch (error) {
    errorMessage.value = "Problème est survenu, veuillez réessayer";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchMessages();
});

const refreshMessages = async () => {
  await fetchMessages();
};
</script>
