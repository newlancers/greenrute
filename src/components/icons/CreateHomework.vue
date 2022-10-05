<script lang="ts" setup>
import CreateHomeworkCollapse from '@/components/CreateHomeworkCollapse.vue'
import CreateHomeworkForm from '@/components/CreateHomeworkForm.vue'
import {ref, Ref} from 'vue'
import {useHomeworkStore} from '@/stores/homework'

interface Props {
  dayIdx: number
  lessonIdx: number
}

const props = defineProps<Props>()

type Loading = 'true' | 'false' | 'done'

const loading: Ref<Loading> = ref('false')

const homework = useHomeworkStore()

const addHomework = (task: string, description: string | undefined): void => {
  loading.value = 'true'
  homework.add(props.dayIdx, props.lessonIdx, task, description)
    .then(() => {
      loading.value = 'done'
      setTimeout(() => {
        loading.value = 'false'
      }, 500)
    })
}
</script>

<template>
  <!-- TODO: опція в налаштуваннях -->
  <CreateHomeworkForm v-if="true" :loading="loading" :submit-handler="addHomework"/>
  <CreateHomeworkCollapse v-else/>
</template>
