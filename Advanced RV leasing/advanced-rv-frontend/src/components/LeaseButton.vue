
<template>
  <div class="lease-button-wrapper">
    <router-link to="/lease" class="lease-button">Lease an RV</router-link>
  </div>
</template>

<style scoped>
.lease-button-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.lease-button {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.lease-button:hover {
  background-color: #0056b3;
}
</style>

