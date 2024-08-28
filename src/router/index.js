import { createWebHistory, createRouter } from 'vue-router'
import Home from '../pages/HomePage.vue'
import OpenLayer from '../pages/OpenLayer.vue'
import GoogleMaps from '../pages/GoogleMaps.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/openlayer',
    name: 'Open Layers Maps',
    component: OpenLayer
  },
  {
    path: '/googlemaps',
    name: 'Google Maps',
    component: GoogleMaps
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
