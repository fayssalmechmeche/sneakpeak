<script setup lang="ts">
import BasePage from '@/components/BasePage.vue'
import { useRoute } from 'vue-router'

import { ref, onMounted } from 'vue'
const route = useRoute()
const reference = route.params.reference
const linkPaiement = ref('')
const BASE_URL = import.meta.env.VITE_API_URL
onMounted(async () => {
  const response = await fetch(`${BASE_URL}/checkout/cancel/${reference}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  linkPaiement.value = data.url
})
</script>

<template>
  <BasePage>
    <div class="my-auto h-full w-full text-center">
      <h1 class="text-2xl font-semibold">Votre paiement a échoué</h1>

      <p class="mt-4">Votre paiement a échoué. Veuillez réessayer.</p>

      <button type="button" class="my-4 bg-black p-3 px-5 text-white">
        <a :href="linkPaiement">Retourner à la page de paiement</a>
      </button>
    </div>
  </BasePage>
</template>

<style scoped></style>
