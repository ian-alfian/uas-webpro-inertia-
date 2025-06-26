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
    router.visit('/') // redirect contoh
  } else {
    notification.value = 'Periksa inputan Anda'
  }
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col lg:flex-row items-center justify-start bg-black px-6 lg:px-14 relative overflow-hidden"
  >
    <!-- Background image + blur -->
    <div
      class="absolute inset-0 bg-cover bg-center blur-md scale-105 z-0"
      style="background-image: url('/images/bg5.jpeg')"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/60 to-cyan-950/70 z-0"></div>

    <!-- Login box -->
    <div
      class="z-10 w-full max-w-lg bg-gradient-to-br from-cyan-700/10 via-black/20 to-cyan-900/10 backdrop-blur-3xl border border-cyan-400/30 rounded-xl shadow-xl p-6 lg:mr-12"
    >
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-3xl font-bold text-cyan-300">Login</h1>
          <p class="mt-2 text-sm text-cyan-100">
            Kamu belum punya akun bung? klik
            <Link
              href="/register"
              class="text-cyan-400 font-semibold underline hover:text-cyan-300 transition"
              >Register</Link
            >
          </p>
        </div>

        <div class="mt-6">
          <div
            v-if="notification"
            class="mt-2 bg-red-100/10 border border-red-400/40 text-sm text-red-300 rounded-lg p-4"
            role="alert"
          >
            {{ notification }}
          </div>

          <form @submit="submitForm" novalidate>
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-medium mb-2 text-cyan-200"
                  >Email</label
                >
                <input
                  id="email"
                  type="email"
                  v-model="form.email"
                  required
                  class="py-3 px-4 block w-full bg-cyan-100/10 text-cyan-100 border border-cyan-400/40 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none"
                />
                <p v-if="errors.email" class="text-xs text-red-300 mt-2">{{ errors.email }}</p>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium mb-2 text-cyan-200"
                  >Password</label
                >
                <input
                  id="password"
                  type="password"
                  v-model="form.password"
                  required
                  class="py-3 px-4 block w-full bg-cyan-100/10 text-cyan-100 border border-cyan-400/40 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none"
                />
                <p v-if="errors.password" class="text-xs text-red-300 mt-2">{{ errors.password }}</p>
              </div>

              <div>
                <button
                  type="submit"
                  class="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-cyan-500 bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 text-white hover:brightness-110 transition shadow-md"
                >
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Text sebelah kanan -->
    <div
      class="z-10 hidden lg:flex flex-col justify-center max-w-md text-cyan-100 text-lg font-medium leading-relaxed space-y-4 lg:ml-60"
    >
      <p class="text-3xl font-bold text-cyan-300">✨ Selamat Datang di Komunitas Pecinta One Piece</p>
      <p>
        Di sini, kamu bisa berbagi teori, saling menginspirasi, dan menyalurkan pendapat dengan penuh
        semangat.
      </p>
      <p>"Mending ngobrol bareng kami daripada cuma scroll doang."</p>
    </div>
  </div>
</template>
