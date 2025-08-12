<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form / Credentials</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username">Username:</label><br />
              <input type="text" id="username" name="username" v-model="formData.username" /><br />
            </div>

            <div class="col-md-6">
              <label for="password">Password:</label><br />
              <input
                type="password"
                id="password"
                name="password"
                v-model="formData.password"
              /><br />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="isAustralian">Australian Resident?</label><br />
              <input
                type="checkbox"
                id="isAustralian"
                name="isAustralian"
                v-model="formData.isAustralian"
              /><br />
            </div>

            <div class="col-md-6">
              <label for="gender">Gender</label><br />
              <select id="gender" v-model="formData.gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason">Reason For Joining:</label><br />
            <textarea id="reason" name="reason" rows="3" v-model="formData.reason"></textarea><br />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// Our logic will go here
</script>

<style scoped></style>
