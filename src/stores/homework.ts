import type {Ref} from 'vue'
import {ref} from 'vue'
import {defineStore} from 'pinia'

export interface Homework {
  id: number
  task: string
  description: string | null
  done: boolean
}

export const useHomeworkStore = defineStore('homework', () => {
  const homework: Ref<Homework[][][]> = ref(JSON.parse(localStorage.getItem('homework') as string) as Homework[][][] || [])

  const add = (dayIdx: number, lessonIdx: number, task: string, description?: string | undefined): Promise<number> => {
    if (typeof homework.value[dayIdx] === 'undefined') {
      homework.value[dayIdx] = []
    }
    if (typeof homework.value[dayIdx][lessonIdx] === 'undefined') {
      homework.value[dayIdx][lessonIdx] = []
    }
    const id = homework.value[dayIdx][lessonIdx].length + Math.floor(Math.random() * 100)

    homework.value[dayIdx][lessonIdx].push({
      id,
      task,
      description: description ?? null,
      done: false,
    })

    localStorage.setItem('homework', JSON.stringify(homework.value))

    return new Promise<number>(resolve => {
      setTimeout(() => {
        resolve(id)
      }, 200)
    })
  }

  const changeStatus = (dayIdx: number, lessonIdx: number, taskId: number, isDone: boolean): void => {
    homework.value[dayIdx][lessonIdx].filter(i => i.id === taskId)[0].done = isDone

    localStorage.setItem('homework', JSON.stringify(homework.value))
  }

  // TODO: додати модальне вікно для підтвердження видалення
  const remove = (dayIdx: number, lessonIdx: number, taskId: number): Promise<null> => {
    setTimeout(() => {
      // TODO: придумати, як краще реалізувати видалення завдань
      // @ts-ignore
      homework.value[dayIdx][lessonIdx].filter(i => i.id === taskId)[0] = null

      localStorage.setItem('homework', JSON.stringify(homework.value))
    }, 200)

    return new Promise<null>(resolve => {
      setTimeout(() => {
        resolve(null)
      }, 200)
    })
  }

  return {homework, add, remove, changeStatus}
})
