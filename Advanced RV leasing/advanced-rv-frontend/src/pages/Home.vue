<template>
  <div class="container">
    <h1>Available RVs</h1>
    <div class="rv-grid">
      <div v-for="rv in rvs" :key="rv.name" class="card">
        <img :src="rv.image" :alt="rv.name" />
        <div class="card-body">
          <h3>{{ rv.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import arvWoods from '@/assets/ARV-Woods.jpg'
import atlantis from '@/assets/Atlantis-exterior-available-advanced-rv.png'
import bambam from '@/assets/BamBam-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
import blueskies from '@/assets/Blue-Skies-Preowned-Advanced-RV.png'
import boxylady from '@/assets/Boxy-Lady-Preowned-Advanced-RV.png'
import escape from '@/assets/Escape-Web-Photo.png'
import freebird from '@/assets/Freebird-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
import gday from '@/assets/GDay-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
import lucky2 from '@/assets/Lucky2-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
import robert from '@/assets/Robert-Exterior-Custom-Camper-Van-Advanced-RV.png'
import rocky from '@/assets/Rocky-Preowned-Advanced-RV.png'
import vangough from '@/assets/Van-Gogh-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
import vanish from '@/assets/Vanish-Inventory-Photo.png'
import safari from '@/assets/Woods-Safari-Preowned-Van-Advanced-RV.png'



const rvs = [
  { name: 'Woods', image: arvWoods },
  { name: 'Atlantis', image: atlantis },
  { name: 'Bam Bam', image: bambam },
  { name: 'Blue Skies', image: blueskies },
  { name: 'Boxy Lady', image: boxylady },
  { name: 'Escape', image: escape },
  { name: 'Freebird', image: freebird },
  { name: 'GDay', image: gday },
  { name: 'Lucky2', image: lucky2 },
  {name: 'Robert', image: robert },
  {name: 'Rocky', image: rocky},
  {name: 'Van Gogh', image:vangough },
  {name: 'Vanish', image: vanish},
  {name: 'Woods Safari', image: safari},
]
</script>

<style scoped>
.container {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.rv-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
  flex-grow: 1;
}

.card-body h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}
</style>







