<script setup lang="ts">
import LoaderIcon from '@/components/icons/LoaderIcon.vue'
import {CheckIcon} from '@heroicons/vue/24/outline'
import {reactive} from 'vue'

type Loading = 'true' | 'false' | 'done'

interface Props {
  submitHandler: (task: string, description: string | undefined) => void
  loading: Loading
}

const props = defineProps<Props>()

interface Homework {
  task: string
  description: string | undefined
}

const homework: Homework = reactive({
  task: '',
  description: undefined,
})

const addHomework = (): void => {
  if (homework.task.length < 3) {
    return
  }
  props.submitHandler(homework.task, homework.description ? homework.description : undefined)
  homework.task = ''
  homework.description = undefined
}
</script>

<template>
  <form v-if="true" @submit.prevent="addHomework">
    <strong class="block mt-8 text-base font-medium leading-6 text-gray-900 dark:text-zinc-50">Створити домашнє завдання</strong>
    <div class="mt-3">
      <label class="block text-sm font-medium text-gray-700 dark:text-zinc-100" for="task">Завдання</label>
      <div class="mt-1">
        <input id="task" v-model="homework.task" class="block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm dark:shadow dark:bg-zinc-900 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 sm:text-sm" name="task" placeholder="Вивчити вірш... (мін. 3 сим.)" type="text"/>
      </div>
    </div>
    <div class="mt-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-zinc-100" for="task-description">
        Опис
        <span class="ml-1 inline-flex items-center rounded-full bg-gray-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-zinc-300">Необов'язково</span>
      </label>
      <div class="mt-1">
        <input id="task-description" v-model="homework.description" class="block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm dark:shadow dark:bg-zinc-900 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 sm:text-sm" name="task-description" placeholder="на с. 12" type="text"/>
      </div>
    </div>
    <div class="mt-3">
      <button :disabled="loading === 'true'" class="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm dark:shadow hover:bg-green-700 dark:hover:bg-green-500 dark:hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 sm:text-sm" type="submit">
        <LoaderIcon v-if="loading === 'true'" class="w-6 h-6 sm:w-5 sm:h-5 motion-safe:animate-loader" />
        <CheckIcon v-else-if="loading === 'done'" class="w-6 h-6 sm:w-5 sm:h-5" />
        <span v-else>Створити</span>
      </button>
    </div>
  </form>
</template>
