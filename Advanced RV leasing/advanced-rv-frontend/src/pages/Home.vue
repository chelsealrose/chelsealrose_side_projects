<template>
  <div class="container">
    <h1 class="title">
  Available RVs
  <span class="click-hint">Click images to learn more</span>
</h1>
    <div class="rv-grid">
      <div
        v-for="rv in displayedRvs"
        :key="rv.name"
        class="card"
        :class="{ disabled: rv.comingSoon }"
        @click="!rv.comingSoon && openPopup(rv.url)"
      >
        <div class="image-wrapper">
          <img :src="rv.image" :alt="rv.name" />
          <div v-if="rv.comingSoon" class="overlay">
            Coming Soon
          </div>
        </div>
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
// import escape from '@/assets/Escape-Web-Photo.png'
import freebird from '@/assets/Freebird-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
import gday from '@/assets/GDay-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
// import lucky2 from '@/assets/Lucky2-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
// import robert from '@/assets/Robert-Exterior-Custom-Camper-Van-Advanced-RV.png'
import rocky from '@/assets/Rocky-Preowned-Advanced-RV.png'
import vangough from '@/assets/Van-Gogh-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
// import vanish from '@/assets/Vanish-Inventory-Photo.png'
import safari from '@/assets/Woods-Safari-Preowned-Van-Advanced-RV.png'

const rvs = [
  { name: 'Woods', image: arvWoods, comingSoon: true, url: 'https://advanced-rv.com/preowned-woods/' },
  { name: 'Atlantis', image: atlantis, url: 'https://advanced-rv.com/atlantis/' },
  { name: 'Bam Bam', image: bambam, url: 'https://advanced-rv.com/preowned-bam-bam/' },
  { name: 'Blue Skies', image: blueskies, url: 'https://advanced-rv.com/preowned-blue-skies/' },
  { name: 'Boxy Lady', image: boxylady, comingSoon: true, url: 'https://advanced-rv.com/preowned-boxy-lady/' },
  // { name: 'Escape', image: escape },
  { name: 'Freebird', image: freebird, url: 'https://advanced-rv.com/preowned-freebird/' },
  { name: 'GDay', image: gday, url: 'https://advanced-rv.com/preowned-gday/' },
  // { name: 'Lucky2', image: lucky2 },
  // { name: 'Robert', image: robert },
  { name: 'Rocky', image: rocky,comingSoon: true, url: 'https://advanced-rv.com/preowned-rocky/' },
  { name: 'Van Gogh', image: vangough, url: 'https://advanced-rv.com/preowned-van-gogh/' },
  // { name: 'Vanish', image: vanish },
  { name: 'Woods Safari', image: safari, url: 'https://advanced-rv.com/preowned-woods-safari/' },
]

const displayedRvs = rvs.filter(rv => rv)

function openPopup(url) {
  const width = 800
  const height = 600
  const left = window.screenX + (window.innerWidth - width) / 2
  const top = window.screenY + (window.innerHeight - height) / 2
  window.open(
    url,
    'RVDetails',
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  )
}
</script>

<style scoped>
.container {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 2rem;
}

.click-hint {
  font-size: 0.9rem;
  color: #666;         /* muted gray */
  font-style: italic;
  user-select: none;
}


.rv-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

.card:hover:not(.disabled) {
  transform: translateY(-5px);
}

.card.disabled {
  cursor: default;
  opacity: 0.6;
}

.image-wrapper {
  position: relative;
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
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








