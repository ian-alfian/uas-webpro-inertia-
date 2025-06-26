<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { ref, onMounted, onUnmounted } from 'vue'

// Gambar untuk carousel
const images = ref([
  '/images/11.jpg',
  '/images/22.jpg',
  '/images/33.jpg',
  '/images/44.jpg',
  '/images/55.jpg',
])

const currentIndex = ref(0)

// Fungsi untuk mengatur pergeseran gambar
const shiftImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

// Atur timer untuk pergeseran otomatis
let interval: ReturnType<typeof setInterval>
onMounted(() => {
  interval = setInterval(shiftImage, 5000) // Pergeseran setiap 5 detik
})
onUnmounted(() => {
  clearInterval(interval) // Hapus interval saat komponen dihancurkan
})
</script>

<template>
  <Head title="Pemuda Hijrah Collection" />
  <div class="min-h-screen flex flex-col bg-black text-white">
    <!-- Header (bisa diisi logo atau navigasi jika perlu) -->
    <header>
  </header>

    <main class="flex flex-col items-center justify-center flex-grow px-8">
      <!-- Carousel -->
      <div class="w-full md:w-2/3 lg:w-1/2 relative overflow-hidden mb-8">
        <div
          class="flex transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <img
            v-for="(image, index) in images"
            :key="index"
            :src="image"
            alt="Slide"
            class="w-full rounded-lg shadow-lg flex-shrink-0"
          />
        </div>
        <!-- Navigasi manual carousel (opsional) -->
        <div class="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
          <button
            v-for="(images, idx) in images"
            :key="idx"
            @click="currentIndex = idx"
            :class="[
              'w-3 h-3 rounded-full',
              currentIndex === idx ? 'bg-yellow-500' : 'bg-gray-400'
            ]"
          ></button>
        </div>
      </div>

      <!-- Konten Teks -->
      <div class="text-center">
        <h2 class="text-4xl font-bold text-yellow-500 mb-4">LIMITED EDITION</h2>
        <h3 class="text-3xl font-bold text-white mb-2">THE LEGEND OF COLLECTION</h3>
        <p class="text-lg text-white mb-6">Extra COTTON</p>
        <p class="text-2xl font-bold text-yellow-500 mb-4">Rp 200.000</p>
        <p class="text-sm text-gray-300">Fashion</p>
        <Link href="/dashboard" class="inline-block mt-6 bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition">
          Lihat Produk
        </Link>
      </div>
    </main>
  </div>
</template>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
