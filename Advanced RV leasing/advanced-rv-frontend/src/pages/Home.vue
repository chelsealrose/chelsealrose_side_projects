<template>
  <div class="container">
    <h1 class="title">
      Available RVs
      <span class="click-hint">Click images to learn more</span>
    </h1>

    <menu class="filter-menu">
      <label>
        Drivetrain:
        <select v-model="filters.drivetrain">
          <option value="">All</option>
          <option v-for="option in drivetrainOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>

      <label>
        Engine:
        <select v-model="filters.engine">
          <option value="">All</option>
          <option v-for="option in engineOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>

      <label>
        Bed Setup:
        <select v-model="filters.bedSetup">
          <option value="">All</option>
          <option v-for="option in bedSetupOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>

      <button @click="resetFilters" class="btn-reset">Reset Filters</button>
    </menu>

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
import freebird from '@/assets/Freebird-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
import gday from '@/assets/GDay-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
import rocky from '@/assets/Rocky-Preowned-Advanced-RV.png'
import vangough from '@/assets/Van-Gogh-Exterior-Custom-Sprinter-Van-Advanced-RV.png'
import safari from '@/assets/Woods-Safari-Preowned-Van-Advanced-RV.png'

const rvs = [
  {
    name: 'Woods',
    image: arvWoods,
    comingSoon: true,
    url: 'https://advanced-rv.com/preowned-woods/',
    drivetrain: '2WD',
    engine: '4 cylinder turbodiesel',
    bedSetup: 'Electric sofa bed'
  },
  {
    name: 'Atlantis',
    image: atlantis,
    url: 'https://advanced-rv.com/atlantis/',
    drivetrain: 'AWD',
    engine: '4 cylinder bi-turbodiesel',
    bedSetup: 'Platform bed'
  },
  {
    name: 'Bam Bam',
    image: bambam,
    url: 'https://advanced-rv.com/preowned-bam-bam/',
    drivetrain: '2WD',
    engine: '6 cylinder turbodiesel',
    bedSetup: 'Electric sofa bed'
  },
  {
    name: 'Blue Skies',
    image: blueskies,
    url: 'https://advanced-rv.com/preowned-blue-skies/',
    drivetrain: '4X4',
    engine: '6 cylinder turbodiesel',
    bedSetup: 'Electric sofa bed'
  },
  {
    name: 'Boxy Lady',
    image: boxylady,
    comingSoon: true,
    url: 'https://advanced-rv.com/preowned-boxy-lady/',
    drivetrain: '2WD',
    engine: '6 cylinder turbodiesel',
    bedSetup: 'Twin bed'
  },
  {
    name: 'Freebird',
    image: freebird,
    url: 'https://advanced-rv.com/preowned-freebird/',
    drivetrain: '2WD',
    engine: '4 cylinder turbodiesel',
    bedSetup: 'Electric sofa bed'
  },
  {
    name: 'GDay',
    image: gday,
    url: 'https://advanced-rv.com/preowned-gday/',
    drivetrain: '2WD',
    engine: '6 cylinder turbodiesel',
    bedSetup: 'Electric sofa bed'
  },
  {
    name: 'Rocky',
    image: rocky,
    comingSoon: true,
    url: 'https://advanced-rv.com/preowned-rocky/',
    drivetrain: '',
    engine: '',
    bedSetup: ''
  },
  {
    name: 'Van Gogh',
    image: vangough,
    url: 'https://advanced-rv.com/preowned-van-gogh/',
    drivetrain: '2WD',
    engine: '6 cylinder turbodiesel',
    bedSetup: 'Electric sofa bed'
  },
  {
    name: 'Woods Safari',
    image: safari,
    url: 'https://advanced-rv.com/preowned-woods-safari/',
    drivetrain: 'AWD',
    engine: '4 cylinder bi-turbodiesel',
    bedSetup: 'Electric sofa bed'
  }
]

import { reactive, computed } from 'vue'

const filters = reactive({
  drivetrain: '',
  engine: '',
  bedSetup: ''
})

const drivetrainOptions = ['4X4', 'AWD', '2WD']
const engineOptions = ['6 cylinder turbodiesel', '4 cylinder turbodiesel', '4 cylinder bi-turbodiesel']
const bedSetupOptions = ['Electric sofa bed', 'Platform bed', 'Expanding slat bed', 'Twin bed']

const displayedRvs = computed(() => {
  return rvs.filter(rv => {
    return (
      (filters.drivetrain === '' || rv.drivetrain === filters.drivetrain) &&
      (filters.engine === '' || rv.engine === filters.engine) &&
      (filters.bedSetup === '' || rv.bedSetup === filters.bedSetup)
    )
  })
})

function resetFilters() {
  filters.drivetrain = ''
  filters.engine = ''
  filters.bedSetup = ''
}

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
  color: #666; /* muted gray */
  font-style: italic;
  user-select: none;
}

.filter-menu {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  background: #f0ebe3; /* light tan for calm feel */
  padding: 1rem 1.5rem;
  border-radius: 10px;
}

.filter-menu label {
  font-weight: 600;
  color: #444;
}

.filter-menu select {
  margin-left: 0.5rem;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.btn-reset {
  background-color: #286565;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-end; /* Align the button nicely in the menu */
  height: 32px;
}

.btn-reset:hover {
  background-color: #1f4b4b;
}


.rv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(40, 101, 101, 0.75);
  color: white;
  width: 100%;
  height: 100%;
  font-size: 1.3rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.card-body {
  padding: 1rem;
  text-align: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: #286565;
}
</style>











