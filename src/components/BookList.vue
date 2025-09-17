<template>
  <div>
    <h1>Book with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }} <button @click="deleteBook(book)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '@/firebase/init'
import {
  collection,
  orderBy,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  limit,
} from 'firebase/firestore'

const books = ref([])
const fetchBooks = async () => {
  try {
    const booksRef = collection(db, 'books')

    const q = query(booksRef, where('isbn', '>', 1000), orderBy('isbn'), limit(10))
    const querySnapshot = await getDocs(q)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
  } catch (error) {
    console.error('Error fetcing books: ', error)
  }
}

const deleteBook = async (book) => {
  try {
    const docRef = doc(db, 'books', book.id)

    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error in deleting book: ', error)
  }

  alert('Book successfully deleted.')
}

onMounted(() => {
  fetchBooks()
})
</script>

<style></style>
