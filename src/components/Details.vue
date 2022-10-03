<script lang="ts" setup>
import {ref, type Ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import type {LessonName} from '@/helpers/lessons'
import Emoji from '@/components/Emoji.vue'
import CreateHomework from '@/components/CreateHomework.vue'
import HomeworkList from '@/components/HomeworkList.vue'
import LoaderIcon from '@/components/icons/LoaderIcon.vue'
import {CheckIcon} from '@heroicons/vue/24/outline'

interface Props {
  dayInx: number
  lessonIdx: number
  lessonName: LessonName
}

defineProps<Props>()

type Loading = 'true' | 'false' | 'done'

const open: Ref<boolean> = ref(false)
const loading: Ref<Loading> = ref('false')

const openModal = (): void => {
  open.value = true
}

const addHomework = (event: Event): void => {
  console.log(event.currentTarget)
  loading.value = 'true'
  setTimeout(() => {
    loading.value = 'done'
    setTimeout(() => {
      loading.value = 'false'
    }, 500)
  }, 1000)
}
</script>

<template>
  <slot :clickHandler="openModal"/>

  <TransitionRoot :show="open" as="template">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 dark:bg-zinc-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white dark:bg-zinc-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
              <div>
                <div>
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50">
                    <Emoji :lesson="lessonName"/>
                    {{ ' ' + lessonName }}
                  </DialogTitle>
                  <div class="mt-2">
                    <HomeworkList/>
                  </div>
                  <form v-if="true" @submit.prevent="addHomework">
                    <strong class="block mt-8 text-base font-medium leading-6 text-gray-900 dark:text-zinc-50">Створити домашнє завдання</strong>
                    <div class="mt-3">
                      <label class="block text-sm font-medium text-gray-700 dark:text-zinc-100" for="task">Завдання</label>
                      <div class="mt-1">
                        <input id="task" class="block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm dark:shadow dark:bg-zinc-900 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 sm:text-sm" name="task" placeholder="Наприклад: вивчити вірш..." type="text"/>
                      </div>
                    </div>
                    <div class="mt-2">
                      <label class="block text-sm font-medium text-gray-700 dark:text-zinc-100" for="task-description">
                        Опис
                        <span class="ml-1 inline-flex items-center rounded-full bg-gray-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-zinc-300">Необов'язково</span>
                      </label>
                      <div class="mt-1">
                        <input id="task-description" class="block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm dark:shadow dark:bg-zinc-900 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 sm:text-sm" name="task-description" placeholder="Наприклад: на с. 12" type="text"/>
                      </div>
                    </div>
                    <div class="mt-3">
                      <button :disabled="loading === 'true'" class="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm dark:shadow hover:bg-green-700 dark:hover:bg-green-500 dark:hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 sm:text-sm" type="submit">
                        <LoaderIcon v-if="loading === 'true'" class="w-6 h-6 sm:w-5 sm:h-5 motion-safe:animate-loader" />
                        <CheckIcon v-else-if="loading === 'done'" class="w-6 h-6 sm:w-5 sm:h-5" />
                        <span v-else>Створити</span>
                      </button>
                    </div>
                  </form>
                  <CreateHomework v-else/>
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
