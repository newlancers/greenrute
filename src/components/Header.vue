<script lang="ts" setup>
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import type {Lesson} from '@/helpers/lessons'
import ThemeButton from '@/components/ThemeButton.vue'

interface Props {
  lesson: Lesson
}

defineProps<Props>()
</script>

<template>
  <Disclosure v-slot="{ open }" as="nav" class="sticky top-0 z-10 bg-white shadow dark:bg-zinc-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <!-- md:hidden -->
          <div class="-ml-2 mr-2 flex items-center">
            <!-- Change theme button -->
            <ThemeButton/>
            <!-- Mobile menu button • inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-white -->
            <DisclosureButton class="hidden">
              <span class="sr-only">Відкрити меню</span>
              <Bars3Icon v-if="!open" aria-hidden="true" class="block h-6 w-6"/>
              <XMarkIcon v-else aria-hidden="true" class="block h-6 w-6"/>
            </DisclosureButton>
          </div>
          <div class="flex flex-shrink-0 items-center">
            <img alt="VueSchedule" class="block h-8 w-auto" src="../assets/logo.svg"/>
          </div>
          <!-- md:ml-6 md:flex md:space-x-8 -->
          <div class="hidden">
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <a class="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900" href="#">Dashboard</a>
            <a class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" href="#">Team</a>
            <a class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" href="#">Projects</a>
            <a class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" href="#">Calendar</a>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div v-if="lesson?.name" class="relative rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
              <span>{{ lesson.name}}</span>
            </div>
          </div>
          <!-- md:ml-4 md:flex md:flex-shrink-0 md:items-center -->
          <div class="hidden">
            <button class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="button">
              <span class="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" class="h-6 w-6"/>
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="sr-only">Open user menu</span>
                  <img alt="" class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                    <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" href="#">Your Profile</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" href="#">Settings</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" href="#">Sign out</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <!-- md:hidden -->
    <DisclosurePanel class="hidden">
      <div class="space-y-1 pt-2 pb-3">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <DisclosureButton as="a" class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6" href="#">Dashboard</DisclosureButton>
        <DisclosureButton as="a" class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6" href="#">Team</DisclosureButton>
        <DisclosureButton as="a" class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6" href="#">Projects</DisclosureButton>
        <DisclosureButton as="a" class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6" href="#">Calendar</DisclosureButton>
      </div>
      <div class="border-t border-gray-200 pt-4 pb-3">
        <div class="flex items-center px-4 sm:px-6">
          <div class="flex-shrink-0">
            <img alt="" class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">Tom Cook</div>
            <div class="text-sm font-medium text-gray-500">tom@example.com</div>
          </div>
          <button class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="button">
            <span class="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" class="h-6 w-6"/>
          </button>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton as="a" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6" href="#">Your Profile</DisclosureButton>
          <DisclosureButton as="a" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6" href="#">Settings</DisclosureButton>
          <DisclosureButton as="a" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6" href="#">Sign out</DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
