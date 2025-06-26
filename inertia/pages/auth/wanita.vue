<script setup lang="ts">
import { defineProps } from 'vue';
import { Link, router } from '@inertiajs/vue3'; // Import Link dan router

// Definisikan interface untuk produk yang diterima sebagai props
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string; // Tambahkan category jika ada dan ingin ditampilkan
}

// Definisikan props yang akan diterima dari controller AdonisJS
const props = defineProps<{
  products: Product[];
}>();

// Fungsi untuk menambah ke keranjang (bisa di-refactor ke composable jika sering dipakai)
const addToCart = (item: Product) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find((i: any) => i.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('storage')); // Untuk update badge di header jika ada
  router.visit('/cart'); // Navigasi ke halaman keranjang setelah menambah
};

// Fungsi untuk langsung membeli (bisa disesuaikan dengan alur checkout Anda)
const buyNow = (item: Product) => {
  // Anda bisa langsung mengarahkan ke halaman checkout dengan produk ini
  router.visit(`/checkout?productId=${item.id}`);
  // Atau, tambahkan ke keranjang lalu ke checkout
  // addToCart(item);
  // router.visit('/checkout');
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-md py-4 px-8 flex items-center justify-between">
      <nav class="flex-1 flex justify-center space-x-6">
        <Link href="/dashboard" class="text-gray-700 hover:underline">Beranda</Link>
        <Link href="/wanita" class="text-gray-700 font-bold hover:underline">Wanita</Link>
        <Link href="/pria" class="text-gray-700 hover:underline">Pria</Link>
        <Link href="/anak" class="text-gray-700 hover:underline">Anak</Link>
        <Link href="/bayi" class="text-gray-700 hover:underline">Bayi</Link>
      </nav>
      </header>

    <main class="p-8">
      <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">Koleksi Pakaian Wanita</h1>

        <div v-if="props.products.length === 0" class="text-center text-gray-600 py-8">
          Maaf, belum ada produk wanita yang tersedia saat ini.
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="product in props.products" :key="product.id" class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <img :src="product.image" :alt="product.name" class="rounded-lg mb-4 w-full h-40 object-cover">
            <h2 class="text-lg font-semibold text-gray-900 truncate">{{ product.name }}</h2>
            <p class="text-xl font-bold text-black mt-1">Rp {{ product.price.toLocaleString('id-ID') }}</p>
            <div class="flex flex-col space-y-2 mt-4">
              <button
                @click="addToCart(product)"
                class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300">
                Tambah ke Keranjang
              </button>
              <button
                @click="buyNow(product)"
                class="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Gaya khusus untuk halaman ini jika diperlukan */
</style>
