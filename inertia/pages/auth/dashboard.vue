<script setup lang="ts">
import { ref, computed } from 'vue'
import { Link, router } from '@inertiajs/vue3'

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string; // Pastikan ini ada dan string
}

const menuItems = ref<MenuItem[]>([
  { id: 1, name: 'Manfinity Hypemode Men Striped Print Shirt Without Tee', price: 200000, image: 'https://i.pinimg.com/736x/0a/71/e1/0a71e197488f4690afae3424e917152c.jpg', category: 'Pria' },
  { id: 2, name: 'Celana Rileks Linen Blend', price: 300000, image: 'https://via.placeholder.com/150', category: 'Wanita' },
  { id: 3, name: 'Kemeja Lengan Panjang', price: 250000, image: 'https://via.placeholder.com/150', category: 'Pria' },
  { id: 4, name: 'Jaket Hoodie Casual', price: 350000, image: 'https://via.placeholder.com/150', category: 'Anak' },
  { id: 5, name: 'Sepatu Sneakers Casual', price: 400000, image: 'https://via.placeholder.com/150', category: 'Pria' },
  { id: 6, name: 'Tas Ransel Stylish', price: 450000, image: 'https://via.placeholder.com/150', category: 'Wanita' },
  { id: 7, name: 'Men Short-Sleeved T-shirt with Tree Fox Printing', price: 505000, image: 'https://i.pinimg.com/736x/e4/b8/7e/e4b87ef5bc5041bd7b8a30236fabac3b.jpg', category: 'Pria' },
  // Tambahan produk dengan kategori yang jelas untuk demo filter
  { id: 8, name: 'Dress Musim Panas Wanita', price: 320000, image: 'https://via.placeholder.com/150/FFC0CB/000000?text=Dress', category: 'Wanita' },
  { id: 9, name: 'Blus Formal Wanita', price: 280000, image: 'https://via.placeholder.com/150/FFC0CB/000000?text=Blus', category: 'Wanita' },
  { id: 10, name: 'Kaos Anak Karakter', price: 150000, image: 'https://via.placeholder.com/150/ADD8E6/000000?text=Kaos+Anak', category: 'Anak' },
  { id: 11, name: 'Baju Tidur Bayi', price: 120000, image: 'https://via.placeholder.com/150/F0F8FF/000000?text=Baju+Bayi', category: 'Bayi' },
])

// State untuk kategori yang aktif, default ke 'Semua' agar semua produk tampil awalnya
const activeCategory = ref('Semua')

// Fungsi untuk mengubah kategori aktif
function setActiveCategory(category: string) {
  activeCategory.value = category
}

// Computed property untuk memfilter menuItems berdasarkan kategori aktif
const filteredMenuItems = computed(() => {
  if (activeCategory.value === 'Semua') {
    return menuItems.value
  } else {
    return menuItems.value.filter(item => item.category === activeCategory.value)
  }
})

// Ambil jumlah item di keranjang dari localStorage
const totalCartItems = computed(() => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  return cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
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
  window.dispatchEvent(new Event('storage')) // Update badge di header
  router.visit('/cart')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-md py-4 px-8 flex items-center justify-between">
      <nav class="flex-1 flex justify-center space-x-6">
        <Link href="#" class="text-gray-700 hover:underline" @click="setActiveCategory('Wanita')">Wanita</Link>
        <Link href="#" class="text-gray-700 hover:underline" @click="setActiveCategory('Pria')">Pria</Link>
        <Link href="#" class="text-gray-700 hover:underline" @click="setActiveCategory('Anak')">Anak</Link>
        <Link href="#" class="text-gray-700 hover:underline" @click="setActiveCategory('Bayi')">Bayi</Link>
        <Link href="#" class="text-gray-700 hover:underline" @click="setActiveCategory('Semua')">Semua</Link>
      </nav>

      <div class="flex justify-center space-x-2 mb-8 bg-black rounded-full px-4 py-2">
        <button @click="setActiveCategory('Wanita')" :class="{'bg-yellow-500': activeCategory === 'Wanita', 'bg-black': activeCategory !== 'Wanita'}" class="px-4 py-2 text-white rounded-full">WANITA</button>
        <button @click="setActiveCategory('Pria')" :class="{'bg-yellow-500': activeCategory === 'Pria', 'bg-black': activeCategory !== 'Pria'}" class="px-4 py-2 text-white rounded-full">PRIA</button>
        <button @click="setActiveCategory('Anak')" :class="{'bg-yellow-500': activeCategory === 'Anak', 'bg-black': activeCategory !== 'Anak'}" class="px-4 py-2 text-white rounded-full">ANAK</button>
        <button @click="setActiveCategory('Bayi')" :class="{'bg-yellow-500': activeCategory === 'Bayi', 'bg-black': activeCategory !== 'Bayi'}" class="px-4 py-2 text-white rounded-full">BAYI</button>
        <button @click="setActiveCategory('Semua')" :class="{'bg-yellow-500': activeCategory === 'Semua', 'bg-black': activeCategory !== 'Semua'}" class="px-4 py-2 text-white rounded-full">SEMUA</button>
      </div>
      </header>

    <main class="p-8">
      <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">
          Koleksi {{ activeCategory === 'Semua' ? 'Semua' : activeCategory }} Produk
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="product in filteredMenuItems" :key="product.id" class="border rounded-lg p-4">
            <img :src="product.image" :alt="product.name" class="rounded-lg mb-4 w-full h-40 object-cover">
            <h2 class="text-lg font-semibold">{{ product.name }}</h2> <p class="text-black">Rp {{ product.price.toLocaleString() }}</p>
            <button
              @click="addToCart(product)"
              class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Tambah ke Keranjang
            </button>
            <button
              @click="addToCart(product)"
              class="mt-6 bg-green-500 text-white py-2 px-2 rounded hover:bg-green-600">
              Beli
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
header {
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
}

button {
  transition: background-color 0.3s;
}

button:hover {
  cursor: pointer;
}

footer {
  font-size: 0.9rem;
}

.relative {
  position: relative;
}
</style>
