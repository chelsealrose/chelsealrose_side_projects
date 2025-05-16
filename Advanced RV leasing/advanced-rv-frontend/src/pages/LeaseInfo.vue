<template>
  <div class="page-padding">
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
      <form>
        <div>
          <label for="name">Name</label>
          <input id="name" type="text" />
        </div>

        <div>
          <label for="email">Email</label>
          <input id="email" type="email" />
        </div>

        <div>
          <label for="message">Message</label>
          <textarea id="message" rows="4"></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Optional spacing override to make it cleaner within scoped styles */
form > div {
  margin-bottom: 1.5rem;
}
</style>

