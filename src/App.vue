<script lang="ts" setup>
import {getLesson, type Lesson, type Lessons} from './helpers/lessons'
import {onMounted, onUnmounted, ref, type Ref} from 'vue'
import {getTime, type TimeResponse} from './helpers/date'
import Header from '@/components/Header.vue'
import LoaderIcon from '@/components/icons/LoaderIcon.vue'
import {changeTheme} from '@/helpers/theme'
import {useThemeStore} from '@/stores/theme'

const lessons: Ref<Lessons> = ref({} as Lessons)
const time: Ref<TimeResponse> = ref({} as TimeResponse)
const lesson: Ref<Lesson> = ref({} as Lesson)

const themeStore = useThemeStore()

const update = (): void => {
  time.value = getTime(lessons.value)
  lesson.value = getLesson(lessons.value)
}

const themeListener = (): void => {
  changeTheme(true, themeStore)
}

onUnmounted(() => {
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', themeListener)
})

onMounted(() => {
  changeTheme(true, themeStore)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeListener)

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
  <div v-if="lessons?.days?.length > 0" class="min-h-screen flex flex-col bg-gray-100 dark:bg-zinc-900 pt-16">
    <Header :lesson="lesson"/>
    <RouterView :lesson="lesson" :lessons="lessons" :time="time"/>
  </div>
  <div v-else class="h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
    <LoaderIcon class="w-6 h-6 motion-safe:animate-loader text-zinc-700" />
  </div>
</template>
