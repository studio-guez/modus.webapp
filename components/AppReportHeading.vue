<template>
  <div 
    class="v-report-heading" 
    :class="`v-report-heading--${level}`"
    :id="headingId"
  >
    <component :is="level" class="v-report-heading__text">
      <a :href="`#${headingId}`" class="v-report-heading__anchor">#</a>
      <span v-html="text" />
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  level: 'h2' | 'h3'
  text: string
}>()

const headingId = computed(() => {
  const plainText = props.text?.replace(/<[^>]*>/g, '') || ''
  return plainText.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
})
</script>

<style lang="scss" scoped>
.v-report-heading {
  scroll-margin-top: calc(var(--app-nav__height) + 2rem);
}

.v-report-heading__text {
  position: relative;
  display: inline-block;
}

.v-report-heading__anchor {
  position: absolute;
  left: -1.5rem;
  color: var(--app-color-main);
  text-decoration: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  font-weight: normal;
}

.v-report-heading:hover .v-report-heading__anchor {
  opacity: 1;
}

.v-report-heading--h2 h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--app-color-main--dark);
}

.v-report-heading--h3 h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
</style>
