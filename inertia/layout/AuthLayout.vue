<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <header>
      <nav class="flex items-center justify-between p-6 lg:px-8">
        <div class="flex lg:flex-1">
          <Link href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Plot my course</span>
            <!-- Logo SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-waypoints"
            >
              <circle cx="12" cy="4.5" r="2.5" />
              <path d="M10.2 6.3 6.3 10.2" />
              <circle cx="4.5" cy="12" r="2.5" />
              <path d="M7 12h10" />
              <circle cx="19.5" cy="12" r="2.5" />
              <path d="M13.8 17.7l-3.9-3.9" />
              <path d="M13.8 17.7l3.9-3.9" />
              <circle cx="12" cy="19.5" r="2.5" />
            </svg>
          </Link>
        </div>
        <div class="flex flex-1 justify-end gap-4">
          <Link href="/register" class="text-sm font-semibold leading-6 text-white hover:text-slate-300">
            Register
          </Link>
          <Link href="/login" class="text-sm font-semibold leading-6 text-white hover:text-slate-300">
            Login
          </Link>
        </div>
      </nav>
    </header>

    <main class="flex-grow flex items-center justify-center px-6">
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 scale-90 translate-y-5"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-500 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-90 translate-y-5"
        mode="out-in"
      >
        <div class="w-full max-w-md">
          <slot />
        </div>
      </Transition>
    </main>
  </div>
</template>
