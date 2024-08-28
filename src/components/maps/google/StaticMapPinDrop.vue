<template>
  <div>
    <img :src="mapUrl" :alt="altText" style="width: 100%; height: auto" />
  </div>
</template>

<script setup>
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const center = '50.861658,-0.083969' // Center of the map (latitude, longitude)
const zoom = 10 // Zoom level
const size = '800x400' // Size of the map image (width x height)
const markers = [
  '50.861658,-0.083969', // Marker 1
  '50.821483,-0.096042', // Marker 2
  '50.820338,-0.384817' // Marker 3
]
const altText = 'Static map with multiple markers'

// Construct the markers parameter for the URL
const markersParam = markers.map((marker) => `markers=color:red%7C${marker}`).join('&')

// Generate the Google Maps Static API URL
const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&${markersParam}&key=${apiKey}`
</script>
