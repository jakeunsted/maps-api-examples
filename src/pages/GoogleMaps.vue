<template>
  <!-- pin drop on static-->
  <Card class="py-5">
    <template #title>Interactive pin drop</template>
    <template #subtitle>Maps JS API</template>
    <template #content>
      <div class="rounded bg-gray-200 col-span-1 row-span-2 h-96">
        <InteractivePinDrop />
      </div>
    </template>
  </Card>

  <Card class="pt-20">
    <template #title>Static Pin drop</template>
    <template #subtitle>Static Maps API</template>
    <template #content>
      <div class="rounded bg-gray-200 col-span-1 row-span-2 h-96">
        <StaticMapPinDrop />
      </div>
    </template>
  </Card>

  <Card class="pt-20">
    <template #title>Static Area Select</template>
    <template #subtitle>Static Maps API</template>
    <template #content>
      <div class="rounded bg-gray-200 col-span-1 row-span-2 h-96">
        <StaticAreaSelect location="Worthing, West Sussex" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import InteractivePinDrop from '../components/maps/google/InteractivePinDrop.vue'
import StaticMapPinDrop from '../components/maps/google/StaticMapPinDrop.vue'
import StaticAreaSelect from '@/components/maps/google/StaticAreaSelect.vue';
import Card from 'primevue/card'
</script>
