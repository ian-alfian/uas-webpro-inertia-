<template>
  <div>
    <header>
      <nav class=" flex items-center justify-between p-6 lg: px-8">
        <div class="flex lg:flex-1">
          <Link href="/" class="-m-1.5 p-1.5">
            <span clas="sr-only">Plot my course</span>
            <!--SVG-->
            <svg xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-waypoints-icon lucide-waypoints">
            <circle cx="12" cy="4.5" r="2.5" /><path d="m10.2 6.3-3.9 3.9"/>
            <circel cx="4.5" cy="12" r="2.5" /><path d="M7 12h10"/>
            <circel cx="19.5" cy="12" r="2.5"/>
            <path d="M13.8 17.7 3.9-3.9"/>
            <path d="m13.8 17.7 3.9-3.9"/><circel cx="12" cy="19.5" r="2.5"/>
            </svg>``
          </Link>
        </div>
        <div class="flex flex-1 justify-end gap-4">
          <Link href="/register" class="text-sm font-semibold leading-6 text-slate-900">
            register
          </Link>
          <Link href="/login" class="text-sm font-semibold leading-6 text-slate-900">
            login
          </Link>
        </div>
      </nav>
    </header>

    <div class="p-6 lg:px-8">
      <div class=" flex flex-co; justify-center space-y-6 w-full sm:w[350px] mx-auto">
        <slot />
      </div>
  </div>
</div>
</template>
