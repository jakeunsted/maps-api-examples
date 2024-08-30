<template>
  <!-- pin drop on static-->
  <Card class="py-5">
    <template #title>Static Pin Map Image</template>
    <template #content>
      <div class="rounded bg-gray-200 col-span-1 row-span-2 h-96">
        <IframePinMap />
      </div>
    </template>
  </Card>
</template>

<script setup>
import IframePinMap from '../components/maps/openStreetMaps/IframePinMap.vue'
import Card from 'primevue/card'
</script>
