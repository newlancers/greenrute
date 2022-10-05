<script lang="ts" setup>
import {ref, type Ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import type {LessonName} from '@/helpers/lessons'
import Emoji from '@/components/Emoji.vue'
import HomeworkList from '@/components/HomeworkList.vue'
import CreateHomework from '@/components/icons/CreateHomework.vue'

interface Props {
  dayIdx: number
  lessonIdx: number
  lessonName: LessonName
}

defineProps<Props>()

const open: Ref<boolean> = ref(false)

const openModal = (): void => {
  open.value = true
}
</script>

<template>
  <slot :clickHandler="openModal"/>

  <TransitionRoot :show="open" as="template">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 dark:bg-zinc-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity backdrop-blur"/>
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white dark:bg-zinc-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full max-w-md sm:p-6">
              <div>
                <div>
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50">
                    <Emoji :lesson="lessonName"/>
                    {{ ' ' + lessonName }}
                  </DialogTitle>
                  <div class="mt-2">
                    <HomeworkList :day-idx="dayIdx" :lesson-idx="lessonIdx" />
                  </div>

                  <CreateHomework :day-idx="dayIdx" :lesson-idx="lessonIdx" />
                  <!-- <div class="mt-2"><p class="text-sm text-gray-500 dark:text-zinc-300">Тут буде випадкова підказка :)</p></div> -->
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  class="inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-base font-medium text-gray-700 dark:text-zinc-50 shadow-sm dark:shadow hover:bg-gray-50 dark:hover:bg-zinc-800 dark:hover:bg-opacity-25 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 sm:text-sm"
                  type="button"
                  @click="open = false">Закрити
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
