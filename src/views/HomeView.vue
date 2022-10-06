<script lang="ts" setup>
import type {Lessons, Lesson} from '@/helpers/lessons'
import type {TimeResponse} from '@/helpers/date'
import Table from '@/components/Table.vue'

interface Props {
  lessons: Lessons
  time: TimeResponse
  lesson: Lesson
}

defineProps<Props>()
</script>

<template>
  <Table :lessons="lessons" :time="time" :lesson="lesson" />
</template>
