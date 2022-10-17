<script lang="ts" setup>
import {useHomeworkStore} from '@/stores/homework'
import {CheckCircleIcon} from '@heroicons/vue/20/solid'
import {TrashIcon} from '@heroicons/vue/24/outline'
import {type Ref, ref} from 'vue'
import LoaderIcon from '@/components/icons/LoaderIcon.vue'

interface Props {
  dayIdx: number
  lessonIdx: number
}

const props = defineProps<Props>()

const loading: Ref<boolean[]> = ref([])
const status: Ref<boolean[]> = ref([])

const homework = useHomeworkStore()

if (typeof homework.homework[props.dayIdx]?.[props.lessonIdx] !== 'undefined' && (homework.homework[props.dayIdx]?.[props.lessonIdx] as any) !== null) {
  for (const task of homework.homework[props.dayIdx][props.lessonIdx]) {
    status.value[task.id] = task.done
  }
}

const deleteHomework = (taskId: number): void => {
  loading.value[taskId] = true
  homework.remove(props.dayIdx, props.lessonIdx, taskId)
    .then(() => {
      loading.value[taskId] = false
    })
}

const updateStatus = (taskId: number): void => {
  homework.changeStatus(props.dayIdx, props.lessonIdx, taskId, status.value[taskId])
}
</script>

<template>
  <fieldset v-if="homework.homework?.[dayIdx]?.[lessonIdx]?.length && homework.homework[dayIdx][lessonIdx].length > 0" class="space-y-5">
    <legend class="sr-only">Домашнє завдання</legend>
    <div v-for="task in homework.homework?.[dayIdx]?.[lessonIdx].sort((a, b) => a.done === b.done ? 0 : a.done ? 1 : -1)" :key="task.id" class="relative flex items-start justify-between">
      <div class="flex">
        <div class="flex h-5 items-center">
          <input
            :id="'task-' + task.id"
            v-model="status[task.id]"
            :aria-describedby="task.description ? 'task-description-' + task.id : undefined"
            :name="'task-' + task.id"
            class="h-4 w-4 cursor-pointer rounded border-gray-300 dark:border-zinc-600 text-green-600 dark:bg-zinc-900 dark:checked:bg-current dark:checked:border-transparent focus:ring-green-500 dark:ring-offset-zinc-900"
            type="checkbox"
            @change="updateStatus(task.id)"
          />
        </div>
        <div :class="homework.homework[dayIdx][lessonIdx].filter(i => i.id === task.id)[0].done ? 'line-through' : ''" class="ml-3 text-sm">
          <label :for="'task-' + task.id" class="font-medium cursor-pointer text-gray-700 dark:text-zinc-200">{{ task.task }}</label>
          <span v-if="task.description" :id="'task-description-' + task.id" class="text-gray-500 dark:text-zinc-400">{{ ' ' + task.description }}</span>
        </div>
      </div>
      <button :aria-disabled="loading[task.id]" :disabled="loading[task.id]" class="p-0.5 text-gray-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 focus-visible:ring-red-600 transition-colors" @click="deleteHomework(task.id)">
        <LoaderIcon v-if="loading[task.id]" class="w-4 h-4 text-gray-400 dark:text-zinc-500 motion-safe:animate-loader"/>
        <TrashIcon v-else class="w-4 h-4"/>
      </button>
    </div>
  </fieldset>
  <div v-else class="my-5 flex items-center justify-center gap-1 text-gray-400 dark:text-zinc-400">
    <CheckCircleIcon class="w-5 h-5"/>
    Завдань немає
  </div>
</template>
