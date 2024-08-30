<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="slotProps">
        <router-link :to="slotProps.item.to">
          <i :class="slotProps.item.icon" class="!mr-2"></i>
          <span>{{ slotProps.item.label }}</span>
        </router-link>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menubar from 'primevue/menubar'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: '/'
  },
  {
    label: 'Open Layer',
    icon: 'pi pi-map',
    to: '/openlayer'
  },
  {
    label: 'Google Maps',
    icon: 'pi pi-map',
    to: '/googlemaps'
  },
  {
    label: 'Open Street Maps',
    icon: 'pi pi-map',
    to: '/osm'
  }
])
</script>
