<template>
  <div>
    <div v-if="loading">Loading map...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <img :src="mapUrl" :alt="altText" style="width: 100%; height: auto" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  location: {
    type: String,
    default: 'New York City',
  },
});

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapUrl = ref('');
const loading = ref(true);
const error = ref(null);
const altText = ref(`Static map with ${props.location} boundaries`);

onMounted(() => {
  fetchMapData(props.location);
});

// Watch for changes to the location prop
watch(() => props.location, (newLocation) => {
  loading.value = true;
  error.value = null;
  altText.value = `Static map with ${newLocation} boundaries`;
  fetchMapData(newLocation);
});

/**
 * Fetches map data for a given location.
 *
 * @param {Object} location - The location object containing details for the map data request.
 * @returns {Promise<Object>} A promise that resolves to the map data for the specified location.
 */
async function fetchMapData(location) {
  try {
    // Fetch boundary data from Nominatim API
    const nominatimUrl = 'https://nominatim.openstreetmap.org/search.php';
    const params = {
      q: location,
      format: 'jsonv2',
      polygon_geojson: 1,
    };

    const response = await axios.get(nominatimUrl, {
      params,
    });

    if (response.data.length === 0) {
      throw new Error(`Location "${location}" not found.`);
    }

    const result = response.data[0];
    const geojson = result.geojson;
    const centerLat = parseFloat(result.lat);
    const centerLon = parseFloat(result.lon);

    // Process coordinates
    let coordinates = [];
    if (geojson.type === 'Polygon') {
      coordinates = geojson.coordinates[0];
    } else if (geojson.type === 'MultiPolygon') {
      // Flatten the MultiPolygon into a single array
      coordinates = geojson.coordinates.flat(2);
    } else {
      throw new Error(`Unsupported GeoJSON type: ${geojson.type}`);
    }

    // Swap longitude and latitude
    const latLngs = coordinates.map((coord) => [coord[1], coord[0]]);

    // Simplify the polygon to reduce the number of points. Tolerance value is in degrees.
    const simplifiedLatLngs = simplifyPath(latLngs, 0.001);

    // Encode the coordinates using Google's polyline algorithm
    const encodedPath = encodePolyline(simplifiedLatLngs);

    const pathParam = `path=enc:${encodedPath}`;

    // Set the center using the location's coordinates
    const center = `${centerLat},${centerLon}`;
    const zoom = 10; // You may adjust the zoom level or calculate it based on the bounding box

    const size = '600x300&scale=2'; // Size of the map image (width x height)

    mapUrl.value = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&${pathParam}&key=${apiKey}`;
  } catch (err) {
    error.value = 'Failed to load map data.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}


/**
 * Encodes an array of points into a polyline string.
 * 
 * @param {Array} points - An array of points where each point is an object with latitude and longitude properties.
 * @returns {string} - The encoded polyline string.
 */
function encodePolyline(points) {
  let result = '';
  let prevLat = 0;
  let prevLng = 0;

  for (let i = 0; i < points.length; i++) {
    let lat = Math.round(points[i][0] * 1e5);
    let lng = Math.round(points[i][1] * 1e5);

    let dLat = lat - prevLat;
    let dLng = lng - prevLng;

    result += encodeSignedNumber(dLat) + encodeSignedNumber(dLng);

    prevLat = lat;
    prevLng = lng;
  }

  return result;
}

/**
 * Encodes a signed number using Google's polyline encoding algorithm.
 *
 * @param {number} num - The signed number to encode.
 * @returns {string} The encoded string representing the signed number.
 */
function encodeSignedNumber(num) {
  let sgnNum = num << 1;
  if (num < 0) {
    sgnNum = ~sgnNum;
  }
  return encodeNumber(sgnNum);
}

/**
 * Encodes a given number into a specific format.
 *
 * @param {number} num - The number to be encoded.
 * @returns {string} The encoded string representation of the number.
 */
function encodeNumber(num) {
  let result = '';
  while (num >= 0x20) {
    result += String.fromCharCode((0x20 | (num & 0x1f)) + 63);
    num >>= 5;
  }
  result += String.fromCharCode(num + 63);
  return result;
}

/**
 * Simplifies a path by reducing the number of points based on the given tolerance.
 *
 * @param {Array} points - An array of points representing the path to be simplified.
 * @param {number} tolerance - The tolerance level to determine the degree of simplification.
 * @returns {Array} - A simplified array of points.
 */
function simplifyPath(points, tolerance) {
  if (points.length <= 2) {
    return points;
  }

  const sqTolerance = tolerance * tolerance;

  // Stage 1: Vertex reduction
  const reducedPoints = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    if (getSqDist(points[i], points[i - 1]) > sqTolerance) {
      reducedPoints.push(points[i]);
    }
  }
  reducedPoints.push(points[points.length - 1]);

  // Stage 2: Douglas-Peucker simplification
  const simplified = [reducedPoints[0]];
  simplifyDPStep(reducedPoints, 0, reducedPoints.length - 1, sqTolerance, simplified);
  simplified.push(reducedPoints[reducedPoints.length - 1]);

  return simplified;
}

/**
 * Calculates the squared distance between two points.
 *
 * @param {Object} p1 - The first point with properties x and y.
 * @param {Object} p2 - The second point with properties x and y.
 * @returns {number} The squared distance between the two points.
 */
function getSqDist(p1, p2) {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  return dx * dx + dy * dy;
}

/**
 * Calculates the square of the distance from a point to a segment.
 *
 * @param {Object} p - The point with properties x and y.
 * @param {Object} p1 - The first endpoint of the segment with properties x and y.
 * @param {Object} p2 - The second endpoint of the segment with properties x and y.
 * @returns {number} The square of the distance from the point to the segment.
 */
function getSqSegDist(p, p1, p2) {
  let x = p1[0];
  let y = p1[1];
  let dx = p2[0] - x;
  let dy = p2[1] - y;

  if (dx !== 0 || dy !== 0) {
    const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      x = p2[0];
      y = p2[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }

  dx = p[0] - x;
  dy = p[1] - y;

  return dx * dx + dy * dy;
}

/**
 * Simplifies a section of a polyline using the Douglas-Peucker algorithm.
 *
 * @param {Array} points - The array of points representing the polyline.
 * @param {number} first - The index of the first point in the section to be simplified.
 * @param {number} last - The index of the last point in the section to be simplified.
 * @param {number} sqTolerance - The square of the tolerance distance for simplification.
 * @param {Array} simplified - The array to store the simplified points.
 */
function simplifyDPStep(points, first, last, sqTolerance, simplified) {
  let maxSqDist = sqTolerance;
  let index = null;

  for (let i = first + 1; i < last; i++) {
    const sqDist = getSqSegDist(points[i], points[first], points[last]);

    if (sqDist > maxSqDist) {
      index = i;
      maxSqDist = sqDist;
    }
  }

  if (index !== null) {
    // Recursively simplify
    if (index - first > 1) {
      simplifyDPStep(points, first, index, sqTolerance, simplified);
    }
    simplified.push(points[index]);
    if (last - index > 1) {
      simplifyDPStep(points, index, last, sqTolerance, simplified);
    }
  }
}
</script>
