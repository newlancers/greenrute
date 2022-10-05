<script lang="ts" setup>
import {useHomeworkStore} from '@/stores/homework'
import {CheckCircleIcon} from '@heroicons/vue/20/solid'

interface Props {
  dayIdx: number
  lessonIdx: number
}

defineProps<Props>()

const homework = useHomeworkStore()
</script>

<template>
  <fieldset v-if="homework.homework?.[dayIdx]?.[lessonIdx]?.length && homework.homework[dayIdx][lessonIdx].length > 0" class="space-y-5">
    <legend class="sr-only">Домашнє завдання</legend>
    <div v-for="work in homework.homework?.[dayIdx]?.[lessonIdx]" :key="work.id" class="relative flex items-start">
      <div class="flex h-5 items-center">
        <input :id="'task-' + work.id" :name="'task-' + work.id" :aria-describedby="work.description ? 'task-description-' + work.id : undefined" class="h-4 w-4 cursor-pointer rounded border-gray-300 dark:border-zinc-600 text-green-600 dark:bg-zinc-900 dark:checked:bg-current dark:checked:border-transparent focus:ring-green-500 dark:ring-offset-zinc-900" type="checkbox"/>
      </div>
      <div class="ml-3 text-sm">
        <label class="font-medium cursor-pointer text-gray-700 dark:text-zinc-200" :for="'task-' + work.id">{{ work.task }}</label>
        <span v-if="work.description" :id="'task-description-' + work.id" class="text-gray-500 dark:text-zinc-400"><span class="sr-only">{{ work.task + ' ' }}</span>{{ work.description }}</span>
      </div>
    </div>
  </fieldset>
  <div v-else class="my-5 flex items-center justify-center gap-1 text-gray-400 dark:text-zinc-400">
    <CheckCircleIcon class="h-5 w-5" />
    Завдань немає
  </div>
</template>
