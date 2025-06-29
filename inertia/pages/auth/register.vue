<template>
  <div class="min-h-screen flex flex-col lg:flex-row items-center justify-between bg-black px-6 lg:px-14 relative overflow-hidden">

    <!-- Background Kombinasi Kuning Hitam -->
    <div class="absolute inset-0 bg-gradient-to-r from-black via-black to-yellow-600 z-0"></div>
    <div class="absolute inset-0 bg-[url('/images/bg9.jpg')] bg-cover bg-center opacity-20 blur-md z-0"></div>

    <!-- Text di Sebelah Kiri -->
    <div class="z-10 hidden lg:flex flex-col justify-center max-w-md text-yellow-100 text-lg font-medium leading-relaxed space-y-4 lg:mr-12">
      <p class="text-3xl font-extrabold text-yellow-400 drop-shadow">⚡ Selamat Bergabung di Pemuda Hijrah Collection</p>
      <p>Kami menyediakan koleksi pakaian keren, stylish, dan kekinian tanpa ribet antri di toko!</p>
      <p class="italic text-yellow-300">"Gabung sekarang, jadi bagian dari komunitas keren ini!"</p>
    </div>

    <!-- Register box di Sebelah Kanan -->
    <div class="z-10 w-full max-w-lg bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-2xl border border-yellow-400/50 rounded-xl shadow-xl p-6">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-3xl font-extrabold text-yellow-400 drop-shadow">Register</h1>
          <p class="mt-2 text-sm text-gray-300">
            Sudah punya akun?
            <Link href="/login" class="text-yellow-500 font-semibold underline hover:text-yellow-500 transition">
              Log in
            </Link>
          </p>
        </div>

        <div class="mt-6">
          <form @submit.prevent="submit">
            <div class="grid gap-y-4">
              <div>
                <label for="name" class="block text-sm font-medium mb-2 text-yellow-200">Name</label>
                <input v-model="form.name" type="text" id="name" name="name"
                  class="py-3 px-4 block w-full bg-black/40 text-yellow-100 border border-yellow-400/40 rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none" />
                <p v-if="errors.name" class="text-xs text-red-300 mt-2">{{ errors.name }}</p>
              </div>


              <div>
                <label for="email" class="block text-sm font-medium mb-2 text-yellow-200">Email</label>
                <input v-model="form.email" type="email" id="email" name="email"
                  class="py-3 px-4 block w-full bg-black/40 text-yellow-100 border border-yellow-400/40 rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none" />
                <p v-if="errors.email" class="text-xs text-red-300 mt-2">{{ errors.email }}</p>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium mb-2 text-yellow-200">Password</label>
                <input v-model="form.password" type="password" id="password" name="password"
                  class="py-3 px-4 block w-full bg-black/40 text-yellow-100 border border-yellow-400/40 rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none" />
                <p v-if="errors.password" class="text-xs text-red-300 mt-2">{{ errors.password }}</p>
              </div>

              <div>
                <label for="password_confirmation" class="block text-sm font-medium mb-2 text-yellow-200">Confirm Password</label>
                <input v-model="form.password_confirmation" type="password" id="password_confirmation" name="password_confirmation"
                  class="py-3 px-4 block w-full bg-black/40 text-yellow-100 border border-yellow-400/40 rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none" />
              </div>

              <div>
                <button type="submit"
                  class="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-yellow-500 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-black hover:brightness-110 transition shadow-md">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
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
