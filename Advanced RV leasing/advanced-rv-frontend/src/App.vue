<template>
  <div class="app-container">
    <!-- Optional overlay if you want to darken the background -->
    <div class="background-overlay"></div>

    <nav class="nav-bar">
      <div class="nav-title">Advanced RV Leasing</div>
      <div class="nav-buttons">
        <router-link to="/lease" class="btn btn-primary">Lease an RV</router-link>
        <router-link to="/" class="btn btn-secondary">Available RVs</router-link>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// No script needed
</script>

<style scoped>
.app-container {
  position: relative;
  min-height: 100vh;
  background-image: url('@/assets/CampingIPhoneLayout.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--charcoal);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 0;
}



/* Layout still renders on top */
.nav-bar,
.main-content {
  position: relative;
  z-index: 2;
}

/* Navbar */
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--charcoal);
  padding: 1rem 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: var(--white);
}

.nav-title {
  font-weight: 700;
  font-size: 1.75rem;
  letter-spacing: 0.05em;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.btn-primary {
  background-color: var(--teal-dark);
  color: var(--white);
}

.btn-primary:hover {
  background-color: var(--taupe);
  color: var(--white);
}

.btn-secondary {
  background-color: var(--sage-gray);
  color: var(--charcoal);
}

.btn-secondary:hover {
  background-color: var(--taupe);
  color: var(--white);
}

/* Main Content */
.main-content {
  padding: 2rem;
}
</style>









