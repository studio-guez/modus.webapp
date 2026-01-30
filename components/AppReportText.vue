<template>
  <div class="v-report-text child-remove-margin" v-html="processedText" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { addIdsToH2 } from '~/utils/addIdsToH2'

const props = defineProps<{
  text: string
}>()

const processedText = computed(() => {
  if (!props.text) return ''
  // Add IDs to h2 elements for anchor linking
  return addIdsToH2(props.text)
})
</script>

<style lang="scss" scoped>
.v-report-text {
  line-height: 1.7;
  
  :deep(h2) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--app-color-main--dark);
    scroll-margin-top: calc(var(--app-nav__height) + 2rem);
    
    a {
      color: var(--app-color-main);
      text-decoration: none;
      margin-right: 0.5rem;
      opacity: 0.5;
      transition: opacity 0.2s ease;
      
      &:hover {
        opacity: 1;
      }
    }
  }
  
  :deep(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  
  :deep(p) {
    margin-bottom: 1rem;
  }
  
  :deep(ul),
  :deep(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
  
  :deep(li) {
    margin-bottom: 0.5rem;
  }
  
  :deep(a) {
    color: var(--app-color-main);
    text-decoration: underline;
    
    &:hover {
      color: var(--app-color-main--dark);
    }
  }
  
  :deep(strong) {
    font-weight: 600;
  }
  
  :deep(em) {
    font-style: italic;
  }
  
  :deep(blockquote) {
    border-left: 4px solid var(--app-color-main);
    padding-left: 1rem;
    margin: 1rem 0;
    color: #555;
    font-style: italic;
  }
}
</style>
