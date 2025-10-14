<template>
  <div id="app">
    <h1>Book Counter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <pre>{{ jsondata }}</pre>
    <pre>{{ allBooks }}</pre>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const jsondata = ref(null)
const allBooks = ref(null)
const error = ref('')
const showHeader = computed(() => {
  return useRoute().name !== 'CountBookAPI'
})

const getBookCountAPI = async () => {
  try {
    const response = await axios.get('https://countbook-756jw5b2ja-uc.a.run.app')
    jsondata.value = response.data
    error.value = null
  } catch (err) {
    console.error('Error fetching book count:', err)
    error.value = err
    jsondata.value = null
  }
}

const getAllBookAPI = async () => {
  try {
    const response = await axios.get('https://getallbooks-756jw5b2ja-uc.a.run.app')
    allBooks.value = response.data
    error.value = null
  } catch (err) {
    console.error('Error fetching book count:', err)
    error.value = err
    allBooks.value = null
  }
}

onMounted(() => {
  getBookCountAPI()
  getAllBookAPI()
})
</script>

<style></style>
