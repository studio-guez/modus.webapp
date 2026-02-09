<template>
  <section class="v-report-tab-enlien">
    <h2 class="v-report-tab-enlien__title">Tags</h2>
    <div v-if="tags.length > 0" class="v-report-tab-enlien__tags">
      <nuxt-link v-for="tag in tags" :key="tag.slug" :href="`/bibliotheque/?q=${encodeURIComponent(tag.slug)}`"
        class="v-report-tab-enlien__tag">
        {{ tag.name }}
      </nuxt-link>
    </div>
    <p v-else class="v-report-tab-enlien__empty">Aucun tag disponible.</p>

    <h2 class="v-report-tab-enlien__title v-report-tab-enlien__title--spaced">Rapports en lien</h2>
    <div v-if="relatedReports.length > 0" class="v-report-tab-enlien__related-list">
      <nuxt-link v-for="report in relatedReports" :key="report.slug" :href="`/rapport/${report.slug}`"
        class="v-report-tab-enlien__related-item">
        {{ report.title }} - {{ formatYear(report.dateStart) }}
      </nuxt-link>
    </div>
    <p v-else class="v-report-tab-enlien__empty">Aucun rapport en lien disponible.</p>
  </section>
</template>

<script setup lang="ts">
interface Tag {
  name: string
  slug: string
}

interface RelatedReport {
  slug: string
  title: string
  dateStart?: string
}

defineProps<{
  tags: Tag[]
  relatedReports: RelatedReport[]
}>()

function formatYear(dateStr?: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? '' : date.getFullYear().toString()
}
</script>

<style lang="scss" scoped>
.v-report-tab-enlien {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: var(--app-color-sage);
}

.v-report-tab-enlien__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--app-color-main--dark);
  margin-bottom: 1.5rem;

  &--spaced {
    margin-top: 2rem;
  }
}

.v-report-tab-enlien__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.v-report-tab-enlien__tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--app-color-yellow);
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--app-color-main);
    color: white;
  }
}

.v-report-tab-enlien__related-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.v-report-tab-enlien__related-item {
  display: block;
  padding: 0.75rem 1rem;
  background-color: var(--app-color-grey);
  border-radius: var(--app-radius-small);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--app-color-main);
    color: white;
  }
}

.v-report-tab-enlien__empty {
  color: #666;
  font-style: italic;
}
</style>
