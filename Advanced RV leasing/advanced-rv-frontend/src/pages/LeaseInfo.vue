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
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Name</label>
          <input id="name" type="text" />
        </div>

        <div>
          <label for="email">Email</label>
          <input id="email" type="email" />
        </div>
        
        <div>
          <label for="phone">Phone Number</label>
          <input id="phone" type="tel" />
        </div>

        <div>
          <label for="message">Message</label>
          <textarea id="message" rows="4"></textarea>
        </div>

        <button type="submit" class="btn-submit">Send Message</button>
      </form>
    </section>
  </div>
</template>

<script setup>
function submitForm() {
  alert('Form submitted! (functionality to be implemented)');
}
</script>

<style scoped>
.page-padding {
  padding: 2rem;
  max-width: 700px;
  margin: 2rem auto;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.65);
  color: #E0E0E0; /* Soft light gray font color */
}

.content-wrapper h1,
.content-wrapper h2,
.content-wrapper p,
.content-wrapper label {
  color: #E0E0E0; /* Consistent font color */
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
  box-shadow: 0 0 8px 2px #6799a8; /* subtle blue glow */
}

textarea {
  resize: vertical;
}

.btn-submit {
  background-color: #286565; /* tealish dark color */
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
</style>


