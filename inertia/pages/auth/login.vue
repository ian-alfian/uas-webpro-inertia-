<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Link, router } from '@inertiajs/vue3'

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive<{ email?: string; password?: string }>({})
const notification = ref('')

function submitForm(e: Event) {
  e.preventDefault()
  errors.email = form.email ? '' : 'Email harus diisi'
  errors.password = form.password ? '' : 'Password harus diisi'

  if (!errors.email && !errors.password) {
    notification.value = ''
    router.visit('/')
  } else {
    notification.value = 'Periksa inputan Anda'
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row items-center justify-start bg-black px-6 lg:px-14 relative overflow-hidden">

    <!-- Background Kombinasi Kuning Hitam -->
    <div class="absolute inset-0 bg-gradient-to-r from-black via-black to-yellow-600 z-0"></div>
    <div class="absolute inset-0 bg-[url('../images/bg9.jpg')] bg-cover bg-center opacity-20 blur-md z-0"></div>

    <!-- Kotak Login -->
    <div class="z-10 w-full max-w-lg bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-2xl border border-yellow-400/50 rounded-xl shadow-xl p-6 lg:mr-12">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-3xl font-extrabold text-yellow-400 drop-shadow">Login</h1>
          <p class="mt-2 text-sm text-gray-300">
            Belum punya akun?
            <Link href="/register" class="text-yellow-500 font-semibold underline hover:text-yellow-500 transition">
              Register
            </Link>
          </p>
        </div>

        <div class="mt-6">
          <div v-if="notification" class="mt-2 bg-red-100/10 border border-red-400/40 text-sm text-red-300 rounded-lg p-4" role="alert">
            {{ notification }}
          </div>

          <form @submit="submitForm" novalidate>
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-medium mb-2 text-yellow-200">Email</label>
                <input id="email" type="email" v-model="form.email" required
                  class="py-3 px-4 block w-full bg-black/40 text-yellow-100 border border-yellow-400/40 rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none" />
                <p v-if="errors.email" class="text-xs text-red-300 mt-2">{{ errors.email }}</p>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium mb-2 text-yellow-200">Password</label>
                <input id="password" type="password" v-model="form.password" required
                  class="py-3 px-4 block w-full bg-black/40 text-yellow-100 border border-yellow-400/40 rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none" />
                <p v-if="errors.password" class="text-xs text-red-300 mt-2">{{ errors.password }}</p>
              </div>

              <div>
                <button type="submit"
                  class="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-yellow-500 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-black hover:brightness-110 transition shadow-md">
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Text Informasi Kanan -->
    <div class="z-10 hidden lg:flex flex-col justify-center max-w-md text-yellow-100 text-lg font-medium leading-relaxed space-y-4 lg:ml-60">
      <p class="text-3xl font-extrabold text-yellow-400 drop-shadow">⚡ Selamat Datang di Pemuda Hijrah Collection</p>
      <p>Koleksi pakaian stylish, modern, dan nyaman — Belanja tanpa ribet dari rumah!</p>
      <p class="italic text-yellow-300">"Buruan cek produknya, jangan sampai kehabisan!"</p>
    </div>
  </div>
</template>
