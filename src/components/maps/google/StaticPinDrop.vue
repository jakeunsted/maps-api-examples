<template>
  <GoogleMap :api-key="api_key" style="width: 100%; height: 500px" :center="center" :zoom="10">
    <Marker v-for="(location, index) in locations" :key="index" :options="location" />
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const center = { lat: 50.861658, lng: -0.083969 }

const locations = [
  { position: { lat: 50.861658, lng: -0.083969 }, label: 'A', title: 'Location A' },
  { position: { lat: 50.821483, lng: -0.096042 }, label: 'B', title: 'Location B' },
  { position: { lat: 50.820338, lng: -0.384817 }, label: 'C', title: 'Location C' }
]
</script>
