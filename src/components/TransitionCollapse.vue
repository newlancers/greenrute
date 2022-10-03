<script lang="ts" setup>
const beforeEnter = (el: HTMLElement): void => {
  requestAnimationFrame(() => {
    if (!el.style.height) {
      el.style.height = '0px'
    }

    el.style.display = ''
  })
}

const enter = (el: HTMLElement): void => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.height = el.scrollHeight + 'px'
    })
  })
}

const afterEnter = (el: HTMLElement): void => {
  el.style.height = ''
}

const beforeLeave = (el: HTMLElement): void => {
  requestAnimationFrame(() => {
    if (!el.style.height) {
      el.style.height = el.offsetHeight + 'px'
    }
  })
}

const leave = (el: HTMLElement): void => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.height = '0px'
    })
  })
}

const afterLeave = (el: HTMLElement): void => {
  el.style.height = ''
}
</script>

<template>
  <transition
    enter-active-class="overflow-hidden transition-height"
    leave-active-class="overflow-hidden transition-height"
    @enter="enter"
    @leave="leave"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>
