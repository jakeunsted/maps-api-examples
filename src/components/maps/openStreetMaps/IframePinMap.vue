<template>
  <div>
    <iframe
      :src="mapUrl"
      width="100%"
      height="400"
      frameborder="0"
      style="border: 0"
      allowfullscreen
      loading="lazy"
    ></iframe>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Define the map parameters
const latitude = 50.861658
const longitude = -0.083969
const zoom = 10

// Construct the URL for the embedded map
const mapUrl = ref(
  `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.1},${latitude - 0.1},${longitude + 0.1},${latitude + 0.1}&layer=mapnik&marker=${latitude},${longitude}`
)
</script>
