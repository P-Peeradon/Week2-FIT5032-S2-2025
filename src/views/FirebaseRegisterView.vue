<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="email" v-model="email" /></p>
  <p><input type="password" placeholder="password" v-model="password" /></p>
  <div>
    <input type="radio" id="member" v-model="role" value="member" />
    <label for="member">Member</label><br />

    <input type="radio" id="librarian" v-model="role" value="librarian" />
    <label for="librarian">Librarian</label><br />

    <input type="radio" id="admin" v-model="role" value="admin" />
    <label for="admin">Admin</label><br />
  </div>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import db from '@/firebase/init'
import { useRouter } from 'vue-router'
import { addDoc, collection } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const role = ref('')
const router = useRouter()
const auth = getAuth()

const register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    await addDoc(collection(db, 'users'), {
      email: email.value,
      role: role.value,
    })
  } catch (error) {
    console.log(error.code)
    return
  }

  console.log('Firebase Register Sucessful!')
  router.push('/firelogin')
}
</script>

<style></style>
