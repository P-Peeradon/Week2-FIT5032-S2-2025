<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Library Registration Form</h1>
        <p class="text-center">
          This form now includes validation. Registered users are displayed in a data table below
          (PrimeVue).
        </p>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">Username:</label><br />
              <input
                type="text"
                id="username"
                class="form-control"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                name="username"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
              <br />
            </div>

            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label><br />
              <select
                id="gender"
                @blur="() => validateGender(true)"
                @input="() => validateGender(false)"
                class="form-control"
                v-model="formData.gender"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="password" class="form-label">Password:</label><br />
              <input
                type="password"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                class="form-control"
                name="password"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              <br />
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                @blur="() => validateConfirmPassword(true)"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <label for="isAustralian">Australian Resident?</label><br />
              <input
                type="checkbox"
                id="isAustralian"
                name="isAustralian"
                v-model="formData.isAustralian"
              /><br />
            </div>
          </div>

          <div class="row-mb-3">
            <div class="col-md-12">
              <label for="reason">Reason For Joining:</label><br />
              <textarea
                id="reason"
                name="reason"
                rows="3"
                class="form-control"
                @blur="() => validateReason(true)"
                @input="() => validateReason(false)"
                v-model="formData.reason"
              ></textarea>
              <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
              <div v-if="haveFriends" class="text-success">{{ haveFriends }}</div>
              <br />
            </div>
          </div>

          <div class="row-mb-3">
            <label for="reason" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
        <div class="row mt-5" v-if="submittedCards.length">
          <div class="d-flex flex-wrap justify-content-start">
            <DataTable :value="submittedCards">
              <Column field="username" header="Username"></Column>
              <Column field="password" header="Password"></Column>
              <Column field="isAustralian" header="Australian Resident"></Column>
              <Column field="gender" header="Gender"></Column>
              <Column field="reason" header="Reason"></Column>
              <Column field="suburb" header="Suburb"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton',
})

const submittedCards = ref([])
const haveFriends = ref('')

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateGender(true)
  validateReason(true)
  validateConfirmPassword(true)
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.gender &&
    !errors.value.reason &&
    !errors.value.confirmPassword
  ) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const clearForm = () => {
  //submittedCards.value = []
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton',
  }
}

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null,
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters.'
  } else {
    errors.value.username = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>"]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please specify your gender.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  const reason = formData.value.reason

  if (reason.length < 10) {
    if (blur)
      errors.value.reason =
        'Please specify your reason. The length must be more than 10 characters.'
  } else if (reason.toLowerCase().includes('friend') || reason.toLowerCase().includes('friends')) {
    haveFriends.value = 'Great to have a friend'
  } else {
    errors.value.reason = null
  }
}
</script>

<style scoped></style>
