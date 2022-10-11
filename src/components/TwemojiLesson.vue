<script setup lang="ts">
import type {LessonName} from '@/helpers/lessons'
import Twemoji from '@/components/Twemoji.vue'

interface Props {
  lesson: LessonName
}

defineProps<Props>()
</script>

<template>
  <Twemoji v-if="lesson === 'Хімія'" icon="🧪" />
  <Twemoji v-else-if="lesson === 'Християнська етика'" icon="📖" />
  <Twemoji v-else-if="lesson === 'Правознавство' || lesson === 'Громадянська освіта'" icon="💼" />
  <Twemoji v-else-if="lesson === 'Мистецтво'" icon="🎨" />
  <Twemoji v-else-if="lesson === 'Медицина'" icon="💉" />
  <Twemoji v-else-if="lesson === 'Географія'" icon="🌍" />
  <Twemoji v-else-if="lesson === 'Інформатика'" icon="🖥" />
  <Twemoji v-else-if="lesson === 'Українська література'" icon="📚" />
  <Twemoji v-else-if="lesson === 'Алгебра' || lesson === 'Математика'" icon="🧮" />
  <Twemoji v-else-if="lesson === 'Англійська мова'" icon="🇬🇧" />
  <Twemoji v-else-if="lesson === 'Українська мова'" icon="🇺🇦" />
  <Twemoji v-else-if="lesson === 'Історія України'" icon="🏛" />
  <Twemoji v-else-if="lesson === 'Всесвітня історія' || lesson === 'Історія'" icon="🏰" />
  <Twemoji v-else-if="lesson === 'Фізкультура'" icon="⚽" />
  <Twemoji v-else-if="lesson === 'Геометрія'" icon="📐" />
  <Twemoji v-else-if="lesson === 'Трудове навчання'" icon="🔨" />
  <Twemoji v-else-if="lesson === 'Німецька мова'" icon="🇩🇪" />
  <Twemoji v-else-if="lesson === 'Фізика'" icon="🔭" />
  <Twemoji v-else-if="lesson === 'Зарубіжна література'" icon="📙" />
  <Twemoji v-else-if="lesson === 'Біологія'" icon="🔬" />
  <Twemoji v-else-if="lesson === 'Захист Вітчизни'" icon="🛡" />
</template>
