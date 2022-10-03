<template>
  <fieldset class="space-y-5">
    <legend class="sr-only">Домашнє завдання</legend>
    <div v-for="homework in 1" :key="Math.random()" class="relative flex items-start">
      <div class="flex h-5 items-center">
        <input id="comments" aria-describedby="comments-description" class="h-4 w-4 cursor-pointer rounded border-gray-300 dark:border-zinc-600 text-green-600 dark:bg-zinc-900 dark:checked:bg-current dark:checked:border-transparent focus:ring-green-500 dark:ring-offset-zinc-900" name="comments" type="checkbox"/>
      </div>
      <div class="ml-3 text-sm">
        <label class="font-medium cursor-pointer text-gray-700 dark:text-zinc-200" for="comments">New comments</label>
        <span id="comments-description" class="text-gray-500 dark:text-zinc-400"><span class="sr-only">New comments</span>&nbsp;so you always know what's happening.</span>
      </div>
    </div>
  </fieldset>
</template>
