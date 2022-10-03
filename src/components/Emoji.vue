<script lang="ts" setup>
import type {LessonName} from '@/helpers/lessons'

interface Props {
  lesson: LessonName
}

defineProps<Props>()
</script>

<template>
  <span v-if="lesson === 'Хімія'">🧪️</span>
  <span v-else-if="lesson === 'Християнська етика'">📖️</span>
  <span v-else-if="lesson === 'Правознавство' || lesson === 'Громадянська освіта'">💼️</span>
  <span v-else-if="lesson === 'Мистецтво'">🎨️</span>
  <span v-else-if="lesson === 'Медицина'">💉️</span>
  <span v-else-if="lesson === 'Географія'">🌍️</span>
  <span v-else-if="lesson === 'Інформатика'">🖥️</span>
  <span v-else-if="lesson === 'Українська література'">📚️</span>
  <span v-else-if="lesson === 'Алгебра' || lesson === 'Математика'">🧮️</span>
  <span v-else-if="lesson === 'Англійська мова'">🇬🇧️</span>
  <span v-else-if="lesson === 'Українська мова'">🇺🇦️</span>
  <span v-else-if="lesson === 'Історія України'">🏛️</span>
  <span v-else-if="lesson === 'Всесвітня історія' || lesson === 'Історія'">🏰️</span>
  <span v-else-if="lesson === 'Фізкультура'">⚽️</span>
  <span v-else-if="lesson === 'Геометрія'">📐️</span>
  <span v-else-if="lesson === 'Трудове навчання'">🔨️</span>
  <span v-else-if="lesson === 'Німецька мова'">🇩🇪️</span>
  <span v-else-if="lesson === 'Фізика'">🔭️</span>
  <span v-else-if="lesson === 'Зарубіжна література'">📙️</span>
  <span v-else-if="lesson === 'Біологія'">🔬️</span>
  <span v-else-if="lesson === 'Захист Вітчизни'">🛡</span>
</template>
