<template>
  <div class="page-padding content-wrapper">
    <h1 class="text-2xl font-bold mb-6">Lease an RV</h1>

    <section>
      <h2 class="text-xl font-semibold mb-2">Leasing Program Info</h2>
      <p>
        Our monthly RV leasing program includes full insurance verification,
        mileage allowances, and maintenance support. Customize your lease based on your travel needs.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-xl font-semibold mb-2">Contact Us</h2>
      <form @submit.prevent="submitForm" class="contact-form" novalidate>
        <div>
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            v-model="form.name"
            placeholder="Your full name"
            :class="{ 'input-error': errors.name }"
          />
          <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
        </div>

        <div>
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            placeholder="you@example.com"
            :class="{ 'input-error': errors.email }"
          />
          <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
        </div>
        
        <div>
          <label for="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            v-model="form.phone"
            placeholder="+1 555 123 4567"
            :class="{ 'input-error': errors.phone }"
          />
          <span v-if="errors.phone" class="error-msg">{{ errors.phone }}</span>
        </div>

        <div>
          <label for="message">Message</label>
          <textarea
            id="message"
            rows="4"
            v-model="form.message"
            placeholder="Write your message here"
            :class="{ 'input-error': errors.message }"
          ></textarea>
          <span v-if="errors.message" class="error-msg">{{ errors.message }}</span>
        </div>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Sending...' : 'Send Message' }}
        </button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const loading = ref(false)

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validateForm() {
  let valid = true
  errors.name = form.name.trim() ? '' : 'Name is required.'
  errors.email = form.email.trim()
    ? validateEmail(form.email)
      ? ''
      : 'Invalid email format.'
    : 'Email is required.'
  errors.phone = form.phone.trim() ? '' : 'Phone number is required.'
  errors.message = form.message.trim() ? '' : 'Message is required.'

  for (const key in errors) {
    if (errors[key]) valid = false
  }
  return valid
}

async function submitForm() {
  if (!validateForm()) return

  loading.value = true

  try {
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await response.json()

    if (data.success) {
      alert('Form submitted successfully!')
      form.name = ''
      form.email = ''
      form.phone = ''
      form.message = ''
    } else {
      alert('Failed to send email: ' + (data.error || 'Unknown error'))
    }
  } catch (error) {
    alert('Error sending form. Please try again later.')
    console.error('Submit error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Your existing styles here */
.page-padding {
  padding: 2rem;
  max-width: 700px;
  margin: 2rem auto;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.65);
  color: #E0E0E0;
}

.content-wrapper h1,
.content-wrapper h2,
.content-wrapper p,
.content-wrapper label {
  color: #E0E0E0;
}

form > div {
  margin-bottom: 1.5rem;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: #f5f5f5;
  color: #222;
  transition: box-shadow 0.2s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 8px 2px #6799a8;
}

textarea {
  resize: vertical;
}

.btn-submit {
  background-color: #286565;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover,
.btn-submit:focus {
  background-color: #194441;
  outline: none;
}

.input-error {
  box-shadow: 0 0 6px 2px #ef4444;
  border-radius: 6px;
}

.error-msg {
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

button.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.contact-form {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.03);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>


