import { ref } from 'vue'
import type { Ref } from 'vue'
import {defineStore} from 'pinia'

export type Theme = 'dark' | 'light' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme: Ref<Theme> = ref(localStorage.getItem('theme') as Theme || 'system')

  return { theme }
})
