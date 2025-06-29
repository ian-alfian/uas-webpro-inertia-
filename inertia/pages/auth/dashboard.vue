<script setup lang="ts">
import { ref, computed } from 'vue'
import { Link, router } from '@inertiajs/vue3'

interface MenuItem {
  id: number
  name: string
  price: number
  image: string
  category: string
}

const menuItems = ref<MenuItem[]>([
  {
    id: 1,
    name: 'Manfinity Hypemode Men Striped Print Shirt Without Tee',
    price: 200000,
    image: 'https://i.pinimg.com/736x/0a/71/e1/0a71e197488f4690afae3424e917152c.jpg',
    category: 'Pria'
  }, // <-- Perhatikan koma antar item
  {
    id: 2,
    name: 'Celana Rileks Linen Blend',
    price: 300000,
    image: 'https://via.placeholder.com/300x200/aabbcc/ffffff?text=Celana',
    category: 'Wanita'
  } // <-- Tidak ada koma di item terakhir
]) // <-- Kurung siku penutup

const activeCategory = ref('Semua')
const isMobileMenuOpen = ref(false)

function setActiveCategory(category: string) {
  activeCategory.value = category
  isMobileMenuOpen.value = false
}

const filteredMenuItems = computed(() => {
  return activeCategory.value === 'Semua'
    ? menuItems.value
    : menuItems.value.filter(item => item.category === activeCategory.value)
})

const addToCart = (item: MenuItem) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const existing = cart.find((i: any) => i.id === item.id)

  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('storage'))
  router.visit('/cart')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 font-inter">
    <header
      class="bg-white shadow-lg py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap"
    >
      <div class="flex items-center justify-between w-full lg:w-auto">
        <!-- Hamburger Menu for Mobile -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="block lg:hidden px-3 py-2 border rounded text-gray-500 border-gray-400 hover:text-gray-800 hover:border-gray-800 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path v-if="!isMobileMenuOpen" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            <path
              v-else
              d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
            />
          </svg>
        </button>
      </div>

      <!-- Main Navigation & Category Filters -->
      <nav
        :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
        class="w-full lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0 lg:flex-row flex-col items-center justify-center"
      >
        <!-- Top Navigation Links -->

        <!-- Category Filter Buttons (Responsive) -->
        <div
          class="flex flex-wrap justify-center lg:justify-center gap-2 bg-gray-200 rounded-full p-2 w-full lg:w-auto"
        >
          <button
            @click="setActiveCategory('Semua')"
            :class="{
              'bg-blue-600 text-white': activeCategory === 'Semua',
              'bg-gray-300 text-gray-700 hover:bg-gray-400': activeCategory !== 'Semua',
            }"
            class="px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-base"
          >
            SEMUA
          </button>
          <button
            @click="setActiveCategory('Pria')"
            :class="{
              'bg-blue-600 text-white': activeCategory === 'Pria',
              'bg-gray-300 text-gray-700 hover:bg-gray-400': activeCategory !== 'Pria',
            }"
            class="px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-base"
          >
            PRIA
          </button>
          <button
            @click="setActiveCategory('Wanita')"
            :class="{
              'bg-blue-600 text-white': activeCategory === 'Wanita',
              'bg-gray-300 text-gray-700 hover:bg-gray-400': activeCategory !== 'Wanita',
            }"
            class="px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-base"
          >
            WANITA
          </button>
          <button
            @click="setActiveCategory('Anak')"
            :class="{
              'bg-blue-600 text-white': activeCategory === 'Anak',
              'bg-gray-300 text-gray-700 hover:bg-gray-400': activeCategory !== 'Anak',
            }"
            class="px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-base"
          >
            ANAK
          </button>
          <button
            @click="setActiveCategory('Bayi')"
            :class="{
              'bg-blue-600 text-white': activeCategory === 'Bayi',
              'bg-gray-300 text-gray-700 hover:bg-gray-400': activeCategory !== 'Bayi',
            }"
            class="px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-base"
          >
            BAYI
          </button>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="bg-white shadow-xl rounded-lg p-6 sm:p-8 mb-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-900 text-center">
          Koleksi Produk {{ activeCategory === 'Semua' ? 'Lengkap' : activeCategory }}
        </h1>

        <div
          v-if="filteredMenuItems.length === 0"
          class="text-center text-gray-600 text-lg py-10 border rounded-lg bg-gray-50"
        >
          <p>Belum ada produk di kategori ini.</p>
          <Link
            href="/"
            class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >Kembali ke Beranda</Link
          >
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredMenuItems"
            :key="product.id"
            class="border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col transform transition-all hover:scale-105 duration-300 bg-white"
          >
            <img
              :src="product.image || 'https://placehold.co/300x200/cccccc/333333?text=Produk'"
              :alt="product.name"
              class="w-full h-48 object-cover"
            />
            <div class="p-4 flex-grow flex flex-col">
              <h2 class="text-lg font-semibold text-gray-800 mb-2 truncate">{{ product.name }}</h2>
              <p class="text-blue-600 font-bold text-xl mb-4">
                Rp {{ product.price.toLocaleString('id-ID') }}
              </p>

              <div class="mt-auto flex flex-col sm:flex-row gap-2">
                <button
                  @click="addToCart(product)"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full font-medium transition-colors shadow-md"
                >
                  Tambah ke Keranjang
                </button>
                <!-- Tombol 'Beli' bisa diarahkan langsung ke checkout atau detail produk -->
                <Link
                  :href="`/product/${product.id}/buy`"
                  class="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full font-medium transition-colors shadow-md"
                >
                  Beli
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-gray-800 text-white text-center p-4 text-sm mt-8">
      &copy; 2025 Toko Online. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
/* Scoped styles dihapus atau diganti dengan Tailwind classes */
</style>
