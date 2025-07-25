<template>
  <form @submit.prevent="handleSubmit" class="space-y-8">
    <p v-if="error" class="mb-2.5 font-medium text-red-400">{{ error }}</p>
    <div class="relative">
      <label
        for="name"
        class="absolute -top-2.5 left-3 bg-[#f9f9f9] px-2 text-sm"
        >Votre nom</label
      >
      <input
        type="text"
        name="name"
        id="name"
        v-model="formData.name"
        class="focus:border-green rounded-md border-2 border-gray-200 px-2.5 py-2 transition focus-visible:outline-0"
      />
    </div>
    <div class="relative">
      <label
        for="message"
        class="absolute -top-2.5 left-3 bg-[#f9f9f9] px-2 text-sm"
        >Votre message</label
      >
      <textarea
        name="message"
        id="message"
        v-model="formData.message"
        class="focus:border-green h-30 w-96 rounded-md border-2 border-gray-200 p-1 px-2.5 py-2 transition focus-visible:outline-0"
      ></textarea>
    </div>
    <button
      type="submit"
      :disabled="isLoading"
      class="from-green to-light-green flex cursor-pointer items-center gap-x-2 rounded-md bg-gradient-to-br px-5 py-2 text-white"
    >
      {{ isLoading ? "Envoie..." : "Envoyer" }}
      <PaperAirplaneIcon class="size-5" />
    </button>
  </form>
</template>

<script setup>
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import { postMessage } from "~/api";

const emit = defineEmits(["message-created"]);
const error = ref("");
const isLoading = ref(false);

const formData = reactive({
  name: "",
  message: "",
});

const handleSubmit = async () => {
  if (!formData.name) {
    return (error.value = "Le nom est obligatoire");
  }
  if (formData.message.trim().length < 5) {
    return (error.value = "Le message doit contenir au moins 5 caractères");
  }
  error.value = "";
  isLoading.value = true;
  try {
    const response = await postMessage(formData);
    if (!response.ok) {
      const data = await response.json();
      console.log(data.message);
      error.value = "Une erreur est survenue";
    } else {
      emit("message-created");
    }
  } catch (err) {
    error.value = "Une erreur inattendue est survenue.";
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};
</script>
