<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Link } from '@inertiajs/vue3'

// Definisikan totalCartItems sebagai ref dengan tipe number
const totalCartItems = ref<number>(0)

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  totalCartItems.value = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
}

onMounted(() => {
  updateCartCount()
  window.addEventListener('storage', updateCartCount)
})

// Optional: update badge setiap kali halaman di-klik (untuk SPA navigation)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') updateCartCount()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100 text-gray-800">
    <!-- Header (Navbar) -->
     <header class="bg-black text-white flex items-center justify-between px-8 py-4 shadow-md">
      <div class="flex items-center bg-black text-white space-x-2">
        <a href="/">
          <img src="https://i.pinimg.com/736x/c6/fa/8d/c6fa8dfb05047b8e6fe84d3c9a4d5f20.jpg" alt="Pemuda Hijrah Collection Logo" class="w-12 h-12 rounded-full shadow-md mr-2">
        </a>
        <h1 class="text-3xl font-bold">Pemuda Hijrah Collection</h1>
      </div>
      <nav class="flex space-x-6">
        <Link href="/cart" class="relative bg-black text-white px-2 py-2 rounded-lg hover:bg-yellow-500 mb-4 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <span
            v-if="totalCartItems > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
          >
            {{ totalCartItems }}
          </span>
        </Link>
        <Link href="/login" class="bg-black text-white px-2 py-2 rounded-lg hover:bg-yellow-500 mb-4 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>
      </nav>
    </header>

    <!-- Main content area for dynamic content (slot) -->
   <main class="flex-grow relative overflow-hidden bg-gray-900">
  <Transition
    enter-active-class="transition-all duration-700 ease-out"
    enter-from-class="opacity-0 backdrop-blur-none"
    enter-to-class="opacity-100 backdrop-blur-sm"
    leave-active-class="transition-all duration-700 ease-in"
    leave-from-class="opacity-100 backdrop-blur-sm"
    leave-to-class="opacity-0 backdrop-blur-none"
    mode="out-in"
  >
    <slot />
  </Transition>
</main>



    <!-- Floating WhatsApp Button -->
    <a
      href="https://wa.me/6285726755204"
      target="_blank"
      class="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 rounded-full shadow-lg p-4 flex items-center justify-center"
      style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)"
      aria-label="Chat WhatsApp"
    >
      <img
        src="https://www.svgrepo.com/show/303150/whatsapp-symbol-logo.svg"
        alt="WhatsApp"
        class="w-8 h-8"
      />
    </a>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black py-12 shadow-inner border-t border-yellow-600">
  <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

    <!-- Brand -->
    <div class="space-y-3">
      <img src="https://i.pinimg.com/736x/c6/fa/8d/c6fa8dfb05047b8e6fe84d3c9a4d5f20.jpg"
           alt="Logo"
           class="w-16 h-16 rounded-full shadow-lg">
      <h2 class="text-2xl font-bold">Pemuda Hijrah Collection</h2>
      <p class="text-sm text-black/80">Fashion Islami, Gaya Masa Kini</p>
    </div>

    <!-- Navigasi -->
    <div>
      <h3 class="font-semibold mb-3 text-lg">Navigasi</h3>
      <ul class="space-y-2">
        <li><a href="/" class="hover:text-white transition">Beranda</a></li>
        <li><a href="/dashboard" class="hover:text-white transition">Menu</a></li>
        <li><a href="/cart" class="hover:text-white transition">Keranjang</a></li>
      </ul>
    </div>

    <!-- Kategori -->
    <div>
      <h3 class="font-semibold mb-3 text-lg">Kategori</h3>
      <ul class="space-y-2">
        <li><a href="/wanita" class="hover:text-white transition">Wanita</a></li>
        <li><a href="/pria" class="hover:text-white transition">Pria</a></li>
        <li><a href="/anak" class="hover:text-white transition">Anak</a></li>
        <li><a href="/bayi" class="hover:text-white transition">Bayi</a></li>
      </ul>
    </div>

    <!-- Sosial Media -->
    <div>
      <h3 class="font-semibold mb-3 text-lg">Ikuti Kami</h3>
      <div class="flex space-x-4">
        <a href="https://instagram.com" target="_blank" aria-label="Instagram"
           class="hover:scale-110 transition transform">
          <img src="https://www.svgrepo.com/show/521711/instagram.svg" alt="Instagram" class="w-8 h-8">
        </a>
        <a href="https://facebook.com" target="_blank" aria-label="Facebook"
           class="hover:scale-110 transition transform">
          <img src="https://www.svgrepo.com/show/508815/facebook.svg" alt="Facebook" class="w-8 h-8">
        </a>
        <a href="https://wa.me/6285726755204" target="_blank" aria-label="WhatsApp"
           class="hover:scale-110 transition transform">
          <img src="https://www.svgrepo.com/show/510342/whatsapp.svg" alt="WhatsApp" class="w-8 h-8">
        </a>
      </div>
    </div>

  </div>

  <!-- Divider -->
  <div class="border-t border-yellow-600 mt-10 pt-4 text-center text-sm text-black/70">
    &copy; 2025 <span class="font-semibold">Pemuda Hijrah Collection</span>. All Rights Reserved.
  </div>
</footer>

  </div>
</template>

<style scoped>
/* Scoped styles dihapus atau diganti dengan Tailwind classes */
/* Minimal CSS jika diperlukan */
</style>
