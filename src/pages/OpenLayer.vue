<template>
  <!-- World map, draggable -->
  <Card class="py-5">
    <template #title>World map</template>
    <template #content>
      <div class="rounded bg-gray-200 col-span-1 row-span-2 h-96">
        <WorldMap />
      </div>
    </template>
  </Card>

  <!-- pin drop on static-->
  <Card class="pb-10">
    <template #title>Static pin drop</template>
    <template #content>
      <div class="rounded bg-gray-200 col-span-1 row-span-2 h-96">
        <StaticPinDrop />
      </div>
    </template>
  </Card>
</template>

<script setup>
import WorldMap from '../components/maps/openLayers/WorldMap.vue'
import StaticPinDrop from '../components/maps/openLayers/StaticPinDrop.vue'
import Card from 'primevue/card'
</script>
