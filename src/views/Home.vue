<script lang="ts" setup>
import {Lessons} from '@/helpers/lessons'
import {TimeResponse} from '@/helpers/date'
import Table from '@/components/Table.vue'

interface Props {
  lessons: Lessons
  time: TimeResponse
}

defineProps<Props>()
</script>

<template>
  <Table :lessons="lessons" :time="time" />
</template>
