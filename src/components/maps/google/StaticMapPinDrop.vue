<template>
  <div>
    <img :src="mapUrl" :alt="altText" style="width: 100%; height: auto" />
  </div>
</template>

<script setup>
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const center = '50.861658,-0.083969' // Center of the map (latitude, longitude)
const zoom = 10 // Zoom level
const size = '600x300&scale=2' // Size of the map image (width x height)
const altText = 'Static map with multiple markers'

const markers = [
  'color:blue|label:A|50.861658,-0.083969', // Marker A with blue color
  'color:green|label:B|50.821483,-0.096042', // Marker B with green color
  'color:red|label:C|50.820338,-0.384817' // Marker C with red color
]

const markersParam = markers.map((marker) => `markers=${encodeURIComponent(marker)}`).join('&')

const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&${markersParam}&key=${apiKey}`
</script>
