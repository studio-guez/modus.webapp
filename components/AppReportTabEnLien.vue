<template>
  <section class="v-report-tab-enlien">
    <div v-if="tags.length > 0" class="v-report-tab-enlien__tags">
      <div v-for="tag in tags" :key="tag.slug" class="v-report-tab-enlien__tag">
        {{ tag.name }}
      </div>
    </div>
    <div v-if="relatedReports.length > 0" class="v-report-tab-enlien__related-list">
      <nuxt-link v-for="report in relatedReports" :key="report.slug" :href="`/rapport/${report.slug}`"
        class="v-report-tab-enlien__related-item">
        <span class="v-report-tab-enlien__related-title">{{ report.title }}</span> – <span class="v-report-tab-enlien__related-year">{{ formatYear(report.dateStart) }}</span>
      </nuxt-link>
    </div>
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
  padding: var(--app-report-tab-padding-y) var(--app-report-tab-padding-x);
  min-height: var(--app-report-tab-min-height);
  color: var(--app-color-black);
}

.v-report-tab-enlien__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.v-report-tab-enlien__tag {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  padding: .58333333333rem .83333333333rem;
  line-height: 1;
  font-size: .88888888888rem;
  border-radius: 2rem;
  color: var(--app-color-black);
  border: 2px solid var(--app-color-black);
  background-color: transparent;
}

.v-report-tab-enlien__related-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.v-report-tab-enlien__related-item {
  display: block;
  text-decoration: none;
}

.v-report-tab-enlien__related-title{
  color: var(--app-color-main);
}
</style>
