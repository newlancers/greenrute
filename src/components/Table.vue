<script lang="ts" setup>
import type {Lesson, Lessons} from '@/helpers/lessons'
import TableItem from '@/components/TableItem.vue'
import type {TimeResponse} from '@/helpers/date'

interface Props {
  lessons: Lessons
  lesson: Lesson
  time: TimeResponse
}

const props = defineProps<Props>()
</script>

<template>
  <div class="pb-4 container mx-auto sm:px-6 lg:px-8">
    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <TableItem v-for="(day, dayIdx) in lessons.days" :key="day.name + dayIdx" :day="day" :current="time.d.index === dayIdx" :day-idx="dayIdx" :current-lesson="lesson" />
    </div>
  </div>
</template>
