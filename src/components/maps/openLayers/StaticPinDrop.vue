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
import { fromLonLat } from 'ol/proj'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'

const mapRoot = ref(null)

onMounted(() => {
  const coordinates = [
    [50.861658, -0.083969],
    [50.821483, -0.096042],
    [50.820338, -0.384817]
  ]

  // Create features for each coordinate
  const features = coordinates.map(
    (coord) =>
      new Feature({
        geometry: new Point(fromLonLat([coord[1], coord[0]]))
      })
  )

  const map = new Map({
    target: mapRoot.value,
    layers: [
      new TileLayer({
        source: new OSM()
      }),
      new VectorLayer({
        source: new VectorSource({
          features: features
        }),
        style: new Style({
          image: new Icon({
            src: '../../../../public/location.png',
            anchor: [0.5, 1],
            scale: 0.05
          })
        })
      })
    ],
    view: new View({
      center: fromLonLat([-0.083969, 50.861658]), // Center around the first pin
      zoom: 10,
      constrainResolution: true
    })
  })

  map.getInteractions()
})
</script>

<style scoped>
.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}
</style>
