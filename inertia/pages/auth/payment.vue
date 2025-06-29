<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { computed } from 'vue'

// Definisikan props yang diterima dari backend
const props = defineProps<{
  totalAmount: number // Total nominal pembayaran
  orderId?: number // ID pesanan, opsional
}>()

// Formatter untuk menampilkan nominal Rupiah
const formattedTotalAmount = computed(() => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(props.totalAmount)
})

const formattedOrderId = computed(() => {
  return props.orderId ? `Pesanan ID: #${props.orderId}` : ''
})
</script>

<template>
  <Head title="Pembayaran Berhasil" />

  <div
    class="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
  >
    <div
      class="bg-white rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12 w-full max-w-lg text-center transform transition-all hover:scale-105 duration-300"
    >
      <div class="mb-8">
        <!-- Success Icon -->
        <svg
          class="w-24 h-24 text-green-500 mx-auto mb-4 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4">Pembayaran Berhasil!</h1>
        <p class="text-lg text-gray-700">Terima kasih atas pesanan Anda.</p>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold text-green-800 mb-3">Detail Pembayaran</h2>
        <p class="text-xl font-bold text-gray-800 mb-2">Total yang Dibayar:</p>
        <p class="text-4xl font-extrabold text-green-600">{{ formattedTotalAmount }}</p>
        <p v-if="orderId" class="text-gray-600 mt-2 text-sm">{{ formattedOrderId }}</p>
      </div>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <!-- Tombol Besar untuk Kembali ke Dashboard -->
        <Link
          href="/dashboard"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xl"
        >
          Kembali ke Dashboard
        </Link>
        <!-- Tombol Lainnya, dibuat lebih kecil -->
        <Link
          v-if="orderId"
          :href="`/orders/${orderId}`"
          class="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 mt-2 sm:mt-0"
        >
          Lihat Pesanan Saya
        </Link>
        <Link
          href="/"
          class="w-full sm:w-auto bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 mt-2 sm:mt-0"
        >
          Belanja Lagi
        </Link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Custom styles if absolutely necessary */
</style>
