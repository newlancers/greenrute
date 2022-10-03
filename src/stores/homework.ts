import { ref } from 'vue'
import type { Ref } from 'vue'
import {defineStore} from 'pinia'

export interface Homework {

}

export const useHomeworkStore = defineStore('homework', () => {
  const homework: Ref<Homework[][]> = ref(JSON.parse(localStorage.getItem('homework') as string) as Homework[][])

  return { homework }
})
