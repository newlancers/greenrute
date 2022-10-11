<script lang="ts" setup>
import type {Day, Lesson} from '@/helpers/lessons'
import Details from '@/components/Details.vue'
import {useHomeworkStore} from '@/stores/homework'
import TwemojiLesson from '@/components/TwemojiLesson.vue'

interface Props {
  day: Day
  dayIdx: number
  current: boolean
  currentLesson: Lesson
}

const props = defineProps<Props>()

const homework = useHomeworkStore()

interface HomeworkPreview {
  text: string
  done: boolean
}

const getHomeworkPreview = (lessonIdx: number): HomeworkPreview => {
  const lesson = homework.homework[props.dayIdx]?.[lessonIdx]?.[0]

  return lesson ? {
    text: '(' + lesson.task + (lesson.description ? ' ' + lesson.description : '') + ')',
    done: lesson.done,
  } : {
    text: '',
    done: false,
  }
}
</script>

<template>
  <div :class="day.lessons.length - 1 ? 'bg-white dark:bg-zinc-800' : 'bg-gray-50 dark:bg-zinc-900 dark:bg-opacity-50'" class="overflow-hidden shadow ring-1 ring-black dark:ring-zinc-600 ring-opacity-5 dark:ring-opacity-80 md:rounded-lg">
    <table class="max-w-full divide-y divide-gray-300 dark:divide-zinc-700 table-fixed">
      <thead class="bg-gray-50 dark:bg-zinc-800">
      <tr>
        <th class="py-2.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-2.5" scope="col">{{ day.name }}</th>
        <th class="relative py-2.5 pl-3 pr-4 sm:pr-2.5" scope="col">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
      </thead>
      <tbody class="bg-white dark:bg-zinc-800">
      <tr v-for="(lesson, lessonIdx) in day.lessons" :key="lesson.length + lessonIdx" :class="lessonIdx % 2 === 0 ? undefined : 'bg-gray-50 dark:bg-zinc-900 dark:bg-opacity-50'">
        <td :class="current && lesson === currentLesson.name ? 'font-bold' : ''" class="truncate max-w-0 w-full py-1.5 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-zinc-100 sm:pl-2.5">
          <!-- TODO: доробити бейдж -->
          <!-- <span class="relative" :class="current && lesson === currentLesson.name ? '' : ''">
            <span class="block absolute rounded-full bg-green-600 -inset-y-[0.03rem] aspect-square left-[50%] -translate-x-[50%]"></span>
            <span class="relative">{{ (lessonIdx + 1) + '.' }}</span>
          </span>
          {{ ' ' }} -->
          {{ (lessonIdx + 1) + '.' }}
          <TwemojiLesson :lesson="lesson" />
          {{ ' ' + lesson }}
          <span :class="getHomeworkPreview(lessonIdx).done ? 'line-through' : ''">{{ ' ' + getHomeworkPreview(lessonIdx).text }}</span>
        </td>
        <td class="relative whitespace-nowrap py-1.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-2.5">
          <Details v-slot="{ clickHandler }" :day-idx="dayIdx" :lesson-idx="lessonIdx" :lesson-name="lesson">
            <button class="text-green-600 hover:text-green-900 dark:hover:text-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 focus-visible:ring-green-600" @click="clickHandler">Деталі</button>
          </Details>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
