<script lang="ts" setup>
import {useThemeStore} from '@/stores/theme'
import {DevicePhoneMobileIcon, MoonIcon, SunIcon} from '@heroicons/vue/24/outline'
import {onMounted, onUnmounted} from 'vue'

interface Props {
  mode?: 'small' | 'expanded'
}

withDefaults(defineProps<Props>(), {
  mode: 'small'
})

const store = useThemeStore()

const themeListener = (): void => {
  changeTheme(true)
}

onMounted(() => {
  changeTheme(true)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeListener)
})

onUnmounted(() => {
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', themeListener)
})

const changeTheme = (onlyDom: boolean = false): void => {
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  if (onlyDom) return

  if (store.theme === 'system') {
    if (document.documentElement.classList.contains('dark')) {
      store.$patch({theme: 'light'})
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      store.$patch({theme: 'dark'})
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  } else if (store.theme === 'light') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      store.$patch({theme: 'system'})
      localStorage.removeItem('theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      store.$patch({theme: 'dark'})
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  } else if (store.theme === 'dark') {
    store.$patch({theme: 'system'})
    localStorage.removeItem('theme');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
</script>

<template>
  <button @click="changeTheme()" class="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 dark:focus:ring-white">
    <span class="sr-only">Змінити тему</span>
    <SunIcon v-if="store.theme === 'light'" aria-hidden="true" class="block h-6 w-6"/>
    <MoonIcon v-else-if="store.theme === 'dark'" aria-hidden="true" class="block h-6 w-6"/>
    <DevicePhoneMobileIcon v-else aria-hidden="true" class="block h-6 w-6"/>
  </button>
</template>
