<script lang="ts" setup>
import {ChevronRightIcon} from '@heroicons/vue/20/solid'
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import TransitionCollapse from '@/components/TransitionCollapse.vue'</script>

<template>
  <Disclosure v-slot="{ open }">
    <!--    <DisclosureButton class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"></DisclosureButton>-->
    <DisclosureButton :class="open ? 'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset' : 'rounded-b-xl hover:bg-gray-100 dark:hover:bg-zinc-800 dark:hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900'"
                      class="flex w-full justify-between items-center mt-8 text-base font-medium leading-6 text-gray-900 dark:text-zinc-50 bg-gray-50 dark:bg-zinc-800 transition-border rounded-t-xl p-2.5">
      <span>Створити домашнє завдання</span>
      <ChevronRightIcon :class="open ? 'rotate-90 transform' : ''" class="h-5 w-5 text-gray-500 dark:text-zinc-300 transition-transform"/>
    </DisclosureButton>
    <TransitionCollapse>
      <DisclosurePanel as="form" class="px-4 pt-4 pb-2 text-sm bg-gray-50 dark:bg-zinc-800 transition-border rounded-b-xl p-2" @submit.prevent>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-zinc-100" for="task">Завдання</label>
          <div class="mt-1">
            <input id="task" class="block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm dark:shadow dark:bg-zinc-900 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 sm:text-sm" name="task" placeholder="Наприклад: вивчити вірш..." type="text"/>
          </div>
        </div>
        <div class="mt-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-zinc-100" for="task-description">
            Опис
            <span class="ml-1 inline-flex items-center rounded-full bg-gray-100 dark:bg-zinc-700 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-zinc-300">Необов'язково</span>
          </label>
          <div class="mt-1">
            <input id="task-description" class="block w-full rounded-md border-gray-300 dark:border-zinc-700 shadow-sm dark:shadow dark:bg-zinc-900 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 sm:text-sm" name="task-description" placeholder="Наприклад: на с. 12" type="text"/>
          </div>
        </div>
        <div class="mt-3">
          <button class="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm dark:shadow hover:bg-green-700 dark:hover:bg-green-500 dark:hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 sm:text-sm" type="submit">
            Створити
          </button>
        </div>
      </DisclosurePanel>
    </TransitionCollapse>
  </Disclosure>
</template>
