import type {_ExtractActionsFromSetupStore, _ExtractGettersFromSetupStore, _ExtractStateFromSetupStore, Store} from 'pinia'
import type {Ref} from 'vue'
import type {Theme} from '@/stores/theme'

export const changeTheme = (onlyDom: boolean = false, store: Store<"theme", _ExtractStateFromSetupStore<{theme: Ref<Theme>}>, _ExtractGettersFromSetupStore<{theme: Ref<Theme>}>, _ExtractActionsFromSetupStore<{theme: Ref<Theme>}>>): void => {
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
