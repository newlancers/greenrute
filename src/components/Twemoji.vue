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
  <img class="h-[1em] w-auto inline relative -top-[0.1em]" :src="'https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/svg/' + code + '.svg'" alt="">
</template>
