<template>
  <div ref="mapRoot" class="w-full h-full"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'

const mapRoot = ref(null)

onMounted(() => {
  console.log('map mounted')
  new Map({
    target: mapRoot.value,
    layers: [
      // adding a background tiled layer
      new TileLayer({
        source: new OSM()
      })
    ],

    // show the whole world
    view: new View({
      zoom: 0,
      center: [0, 0],
      constrainResolution: true
    })
  })
})
</script>
