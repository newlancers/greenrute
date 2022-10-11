<script setup lang="ts">
import twemoji from 'twemoji'
import {ref} from 'vue'

interface Props {
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '\u2764'
})

const code = ref(twemoji.convert.toCodePoint(props.icon))
</script>

<template>
  <img class="h-[1em] w-auto inline align-text-bottom" :src="'https://twemoji.maxcdn.com/v/latest/svg/' + code + '.svg'" alt="">
</template>
