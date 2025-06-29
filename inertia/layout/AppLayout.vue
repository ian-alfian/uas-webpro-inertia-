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
    <header
      class="bg-blue-600 text-white flex items-center justify-between px-4 sm:px-8 py-4 shadow-md flex-wrap"
    >
      <div class="flex items-center space-x-2 mb-2 sm:mb-0">
        <a href="/">
          <img
            src="https://i.pinimg.com/736x/c6/fa/8d/c6fa8dfb05047b8e6fe84d3c9a4d5f20.jpg"
            alt="Pemuda Hijrah Collection Logo"
            class="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md mr-2"
          />
        </a>
        <h1 class="text-xl sm:text-3xl font-bold">Pemuda Hijrah Collection</h1>
      </div>
      <nav class="flex items-center space-x-4 sm:space-x-6">
        <Link
          href="/cart"
          class="relative text-white px-2 py-2 rounded-lg hover:bg-blue-900 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-shopping-cart"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path
              d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
            />
          </svg>
          <span
            v-if="totalCartItems > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
          >
            {{ totalCartItems }}
          </span>
        </Link>
        <Link href="/login" class="text-white px-2 py-2 rounded-lg hover:bg-blue-900 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-user"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>
      </nav>
    </header>

    <!-- Main content area for dynamic content (slot) -->
    <main class="flex-grow">
      <slot />
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
    <footer class="bg-blue-600 text-white py-10 mt-8 shadow-inner">
      <div
        class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div class="flex flex-col items-center md:items-start">
          <img
            src="https://i.pinimg.com/736x/c6/fa/8d/c6fa8dfb05047b8e6fe84d3c9a4d5f20.jpg"
            alt="Logo"
            class="w-16 h-16 rounded-full mb-2 shadow-lg"
          />
          <h2 class="text-2xl font-bold">Pemuda Hijrah Collection</h2>
          <p class="text-sm mt-2 text-blue-100">Fashion Islami, Gaya Masa Kini</p>
        </div>
        <div class="flex flex-col items-center">
          <h3 class="font-semibold mb-2 text-white">Navigasi</h3>
          <ul class="space-y-1">
            <li>
              <Link
                href="/"
                class="hover:underline text-blue-100 hover:text-white transition-colors"
                >Beranda</Link
              >
            </li>
            <li>
              <Link
                href="/dashboard"
                class="hover:underline text-blue-100 hover:text-white transition-colors"
                >Menu</Link
              >
            </li>
            <li>
              <Link
                href="/cart"
                class="hover:underline text-blue-100 hover:text-white transition-colors"
                >Keranjang</Link
              >
            </li>
          </ul>
        </div>
        <div class="flex flex-col items-center">
          <h3 class="font-semibold mb-2 text-white">Kategori</h3>
          <ul class="space-y-1">
            <li>
              <Link
                href="/wanita"
                class="hover:underline text-blue-100 hover:text-white transition-colors"
                >Wanita</Link
              >
            </li>
            <li>
              <Link
                href="/pria"
                class="hover:underline text-blue-100 hover:text-white transition-colors"
                >Pria</Link
              >
            </li>
            <li>
              <Link
                href="/anak"
                class="hover:underline text-blue-100 hover:text-white transition-colors"
                >Anak</Link
              >
            </li>
            <li>
              <Link
                href="/bayi"
                class="hover:underline text-blue-100 hover:text-white transition-colors"
                >Bayi</Link
              >
            </li>
          </ul>
        </div>
        <div class="flex flex-col items-center">
          <h3 class="font-semibold mb-2 text-white">Ikuti Kami</h3>
          <div class="flex space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              class="text-blue-100 hover:text-white transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/521711/instagram.svg"
                alt="Instagram"
                class="w-8 h-8"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              class="text-blue-100 hover:text-white transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/508815/facebook.svg"
                alt="Facebook"
                class="w-8 h-8"
              />
            </a>
            <a
              href="https://wa.me/6285726755204"
              target="_blank"
              aria-label="WhatsApp"
              class="text-blue-100 hover:text-white transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/510342/whatsapp.svg"
                alt="WhatsApp"
                class="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="mt-8 pt-4 text-center border-t border-blue-500">
        <p class="text-center text-blue-100">
          &copy; 2025 PEMUDA HIJRAH COLLECTION. All Rights Reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Scoped styles dihapus atau diganti dengan Tailwind classes */
/* Minimal CSS jika diperlukan */
</style>
