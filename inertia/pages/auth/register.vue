<template>
  <div class="min-h-screen flex flex-col lg:flex-row items-center justify-start bg-black px-6 lg:px-14 relative overflow-hidden">
    <!-- Background image + blur -->
    <div class="absolute inset-0 bg-cover bg-center blur-md scale-105 z-0" style="background-image: url('/images/bg5.jpeg');"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/60 to-cyan-950/70 z-0"></div>

    <!-- Register box -->
    <div class="z-10 w-full max-w-lg bg-gradient-to-br from-cyan-700/10 via-black/20 to-cyan-900/10 backdrop-blur-3xl border border-cyan-400/30 rounded-xl shadow-xl p-6 lg:mr-12">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-3xl font-bold text-cyan-300">Register</h1>
          <p class="mt-2 text-sm text-cyan-100">
            Kamu sudah punya akun? klik
            <Link href="/login" class="text-cyan-400 font-semibold underline hover:text-cyan-300 transition">
              Log in
            </Link>
          </p>
        </div>

        <div class="mt-6">
          <form @submit.prevent="submit">
            <div class="grid gap-y-4">
              <div>
                <label for="name" class="block text-sm font-medium mb-2 text-cyan-200">Name</label>
                <input v-model="form.name" type="text" id="name" name="name"
                  class="py-3 px-4 block w-full bg-cyan-100/10 text-cyan-100 border border-cyan-400/40 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none" />
                <p v-if="errors.name" class="text-xs text-red-300 mt-2">{{ errors.name }}</p>
              </div>

              <div>
                <label for="username" class="block text-sm font-medium mb-2 text-cyan-200">Username</label>
                <input v-model="form.username" type="text" id="username" name="username"
                  class="py-3 px-4 block w-full bg-cyan-100/10 text-cyan-100 border border-cyan-400/40 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none" />
                <p v-if="errors.username" class="text-xs text-red-300 mt-2">{{ errors.username }}</p>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium mb-2 text-cyan-200">Email</label>
                <input v-model="form.email" type="email" id="email" name="email"
                  class="py-3 px-4 block w-full bg-cyan-100/10 text-cyan-100 border border-cyan-400/40 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none" />
                <p v-if="errors.email" class="text-xs text-red-300 mt-2">{{ errors.email }}</p>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium mb-2 text-cyan-200">Password</label>
                <input v-model="form.password" type="password" id="password" name="password"
                  class="py-3 px-4 block w-full bg-cyan-100/10 text-cyan-100 border border-cyan-400/40 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none" />
                <p v-if="errors.password" class="text-xs text-red-300 mt-2">{{ errors.password }}</p>
              </div>

              <div>
                <label for="password_confirmation" class="block text-sm font-medium mb-2 text-cyan-200">Confirm Password</label>
                <input v-model="form.password_confirmation" type="password" id="password_confirmation" name="password_confirmation"
                  class="py-3 px-4 block w-full bg-cyan-100/10 text-cyan-100 border border-cyan-400/40 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none" />
              </div>

              <div>
                <button type="submit"
                  class="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-cyan-500 bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 text-white hover:brightness-110 transition shadow-md">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Side text -->
    <div class="z-10 hidden lg:flex flex-col justify-center max-w-md text-cyan-100 text-lg font-medium leading-relaxed space-y-4 lg:ml-60">
      <p class="text-3xl font-bold text-cyan-300">✨ Selamat Datang di Komunitas Pecinta One Piece</p>
      <p>Di sini, kamu bisa berbagi teori, saling menginspirasi, dan menyalurkan pendapat dengan penuh semangat.</p>
      <p>"Mending ngobrol bareng kami daripada cuma scroll doang."</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'

const form = useForm({
  name: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const submit = () => {
  form.post('/register')
}

const errors = form.errors
</script>
