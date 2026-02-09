<template>
  <section class="v-report-tab-bibliographie">
    <h2 class="v-report-tab-bibliographie__title">Bibliographie</h2>
    <div v-if="bibliography && bibliography.length > 0" class="v-report-tab-bibliographie__list">
      <div v-for="(item, index) in bibliography" :key="item.id || index" class="v-report-tab-bibliographie__item">
        <span class="v-report-tab-bibliographie__number">[{{ item.index }}]</span>
        <div class="v-report-tab-bibliographie__content">
          <p class="v-report-tab-bibliographie__text">{{ item.text }}</p>
          <a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer"
            class="v-report-tab-bibliographie__url">
            {{ item.url }}
          </a>
        </div>
      </div>
    </div>
    <p v-else class="v-report-tab-bibliographie__empty">Aucune référence bibliographique disponible.</p>
  </section>
</template>

<script setup lang="ts">
interface BibliographyItem {
  id?: string
  index?: number
  text?: string
  url?: string
}

defineProps<{
  bibliography: BibliographyItem[]
}>()
</script>

<style lang="scss" scoped>
.v-report-tab-bibliographie{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: var(--app-color-sage);
}
.v-report-tab-bibliographie__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--app-color-main--dark);
  margin-bottom: 1.5rem;
}

.v-report-tab-bibliographie__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.v-report-tab-bibliographie__item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--app-color-grey);
  border-radius: var(--app-radius-small);
}

.v-report-tab-bibliographie__number {
  font-weight: 700;
  color: var(--app-color-main);
  flex-shrink: 0;
}

.v-report-tab-bibliographie__content {
  flex: 1;
}

.v-report-tab-bibliographie__text {
  margin: 0 0 0.5rem;
  line-height: 1.6;
}

.v-report-tab-bibliographie__url {
  display: inline-block;
  font-size: 0.875rem;
  color: var(--app-color-main);
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
}

.v-report-tab-bibliographie__empty {
  color: #666;
  font-style: italic;
}
</style>
