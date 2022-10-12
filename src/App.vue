<script lang="ts" setup>
import {getLesson, type Lesson, type Lessons} from './helpers/lessons'
import {onMounted, ref, type Ref} from 'vue'
import {getTime, type TimeResponse} from './helpers/date'
import Header from '@/components/Header.vue'

const loading: Ref<boolean> = ref(true)
const lessons: Ref<Lessons> = ref({} as Lessons)
const time: Ref<TimeResponse> = ref({} as TimeResponse)
const lesson: Ref<Lesson> = ref({} as Lesson)

const update = (): void => {
  time.value = getTime(lessons.value)
  lesson.value = getLesson(lessons.value)
}

onMounted(() => {
  fetch('https://api.greenrute.com/v1')
    .then(r => r.json())
    .then((r: Lessons): void => {
      lessons.value = r
      update()
      setInterval(() => {
        update()
      }, 1000)
    })
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100 dark:bg-zinc-900 pt-16">
    <Header :lesson="lesson"/>
    <RouterView :lesson="lesson" :lessons="lessons" :time="time"/>
  </div>
</template>
