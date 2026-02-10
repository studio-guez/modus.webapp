<template>
  <div class="v-report-text" v-html="text" />
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<style lang="scss" scoped>
*{
  box-sizing: border-box;
}

.v-report-text {
  line-height: 1.5;
  color: var(--app-color-black);
  padding: 0 var(--app-base-padding-x);
  font-size: 1.33333333333rem;
  font-weight: 500;
  
  :deep(p) {
    margin: 0 0 1rem 0;
    font-weight: 500;
  }
  
  :deep(strong) {
    font-weight: 600;
  }
  
  :deep(em) {
    font-style: italic;
  }
  
  :deep(u) {
    text-decoration: underline;
  }
  
  :deep(a) {
    color: var(--app-color-main);
    text-decoration: underline;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--app-color-main--dark);
    }
  }
  
  :deep(mark) {
    background-color: transparent;
    padding: 0;
    color: var(--app-color-main);
  }
  
  :deep(ul),
  :deep(ol) {
    margin: 0 0 1rem 0;
  }
  
  :deep(li) {
    margin: 0;
  }

  :deep(li p) {
    margin: 0;
  }
}
</style>
