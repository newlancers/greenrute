<script lang="ts" setup>
import {useThemeStore} from '@/stores/theme'
import {MoonIcon, SunIcon} from '@heroicons/vue/24/outline'
import {changeTheme} from '@/helpers/theme'
import {computed} from 'vue'

interface Props {
  mode?: 'small' | 'expanded'
}

withDefaults(defineProps<Props>(), {
  mode: 'small'
})

const store = useThemeStore()

const dark = computed(() => (
  store.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches
))
</script>

<template>
  <button @click="changeTheme(false, store)" class="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 dark:focus:ring-white">
    <span class="sr-only">Змінити тему</span>
    <SunIcon v-if="store.theme === 'dark' || dark" aria-hidden="true" class="block h-6 w-6"/>
    <MoonIcon v-else aria-hidden="true" class="block h-6 w-6"/>
  </button>
</template>
