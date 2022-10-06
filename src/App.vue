<script setup lang="ts">
import { getLesson, type Lessons } from './helpers/lessons'
import { onMounted, ref } from 'vue'
import { getTime } from './helpers/date'
import json from '@/lessons.json'
import Header from '@/components/Header.vue'

const lessons = ref(json as Lessons)
const time = ref(getTime(lessons.value))
const lesson = ref(getLesson(lessons.value))

const update = (): void => {
  time.value = getTime(lessons.value)
  lesson.value = getLesson(lessons.value)
}

onMounted(() => {
  update()
  setInterval(() => {
    update()
  }, 1000)
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100 dark:bg-zinc-900">
    <Header :lesson="lesson" />
    <RouterView :lessons="lessons" :time="time" :lesson="lesson" />
  </div>
</template>
