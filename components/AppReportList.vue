<template>
  <div class="v-report-list">
    <div 
      v-if="title" 
      class="v-report-list__title"
      v-html="title"
    />
    <ul class="v-report-list__items">
      <li 
        v-for="(item, index) in items" 
        :key="index"
        class="v-report-list__item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  text?: string | string[]
}>()

const items = computed<string[]>(() => {
  if (!props.text) return []
  
  // Handle both string and array formats
  if (Array.isArray(props.text)) {
    return props.text
  }
  
  // If string, try to parse as YAML-like list or split by newlines
  return props.text
    .split('\n')
    .map((item: string) => item.replace(/^-\s*/, '').trim())
    .filter((item: string) => item.length > 0)
})
</script>

<style lang="scss" scoped>
.v-report-list {
  background-color: var(--app-color-yellow);
  border-radius: var(--app-radius-small);
  padding: 1.5rem;
}

.v-report-list__title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--app-color-main--dark);
  
  :deep(p) {
    margin: 0;
  }
}

.v-report-list__items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.v-report-list__item {
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.5;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 8px;
    height: 8px;
    background-color: var(--app-color-main);
    border-radius: 50%;
  }
}
</style>
