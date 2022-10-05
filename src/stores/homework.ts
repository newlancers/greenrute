import type {Ref} from 'vue'
import {ref} from 'vue'
import {defineStore} from 'pinia'

export interface Homework {
  id: number
  task: string
  description: string | null
}

export const useHomeworkStore = defineStore('homework', () => {
  const homework: Ref<Homework[][][]> = ref(JSON.parse(localStorage.getItem('homework') as string) as Homework[][][] || [])

  const add = (dayIdx: number, lessonIdx: number, task: string, description?: string | undefined): void => {
    if (typeof homework.value[dayIdx] === 'undefined') {
      homework.value[dayIdx] = []
    }

    if (typeof homework.value[dayIdx][lessonIdx] === 'undefined') {
      homework.value[dayIdx][lessonIdx] = []
    }

    homework.value[dayIdx][lessonIdx].push({
      id: homework.value[dayIdx][lessonIdx].length + Math.floor(Math.random() * 100),
      task,
      description: description ?? null
    })

    localStorage.setItem('homework', JSON.stringify(homework))
  }

  return {homework, add}
})
