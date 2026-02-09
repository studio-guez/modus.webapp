<template>
  <div class="v-report-page">

    <!-- Main Layout: Sidebar (1/5) + Tabs (4/5) -->
    <div class="v-report-page__main-layout">
      <!-- Left: Sidebar TOC (1/5) -->
      <app-report-sidebar v-if="bodyContentArray.length > 0" :body-content="bodyContentArray" class="v-report-page__sidebar" />

      <!-- Right: Tabs and Content (4/5) -->
      <div class="v-report-page__right">
        <!-- Tabs Navigation -->
        <div class="v-report-page__tabs">
          <button v-for="tab in tabs" :key="tab.key" class="v-report-page__tab" :class="[tab.class, { 'v-report-page__tab--active': activeTab === tab.key }]" @click="activeTab = tab.key">
            {{ tab.label }}
          </button>
        </div>

        <!-- Main Content Area -->
        <div class="v-report-page__content">
          <!-- Tab: Rapport -->
          <app-report-tab-rapport v-show="activeTab === 'rapport'" :body-content="bodyContentArray" />

          <!-- Tab: Bibliographie -->
          <app-report-tab-bibliographie v-show="activeTab === 'bibliographie'" :bibliography="bibliography" />

          <!-- Tab: Citations -->
          <app-report-tab-citations v-show="activeTab === 'citations'" :title="headerText || ''" :summary="summary"
            :date-start="dateStart" />

          <!-- Tab: En lien -->
          <app-report-tab-en-lien v-show="activeTab === 'enlien'" :tags="parsedTags" :related-reports="relatedReports" />
        </div>
        <!-- Download PDF Button -->
        <a :href="pdfDownloadUrl" class="v-report-page__download" target="_blank" rel="noopener">
          <button class="app-button app-button--small">Télécharger le PDF</button>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path
              d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Footer -->
    <app-share-link />

    <app-page-footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import { ApiFetchPage } from '~/composable/adminApi/apiFetch'
import { buildPdfUrl } from '~/utils/backendUrl'
import AppPageFooter from '~/components/AppPageFooter.vue'
import AppReportSidebar from '~/components/AppReportSidebar.vue'
import AppReportTabRapport from '~/components/AppReportTabRapport.vue'
import AppReportTabBibliographie from '~/components/AppReportTabBibliographie.vue'
import AppReportTabCitations from '~/components/AppReportTabCitations.vue'
import AppReportTabEnLien from '~/components/AppReportTabEnLien.vue'

interface BibliographyItem {
  id?: string
  text?: string
  url?: string
}

interface Tag {
  name: string
  slug: string
}

interface RelatedReport {
  slug: string
  title: string
  headerTitle?: string
  headerImage?: {
    mediaUrl?: string
    focus?: string
    resize?: {
      tiny?: string
      small?: string
      reg?: string
      large?: string
    }
  }
  tags?: string
  dateStart?: string
  preview?: string
}

const tabs = [
  { key: 'rapport', label: 'Rapport', class: 'v-report-page__tab--main' },
  { key: 'bibliographie', label: 'Bibliographie' },
  { key: 'citations', label: 'Citations' },
  { key: 'enlien', label: 'En lien' },
]

const activeTab = ref('rapport')

const headerCover: Ref<UnwrapRef<string | undefined>> = ref(undefined)
const headerFocus: Ref<UnwrapRef<string | undefined>> = ref(undefined)
const headerText: Ref<UnwrapRef<string | undefined>> = ref(undefined)
const bodyContent: Ref<UnwrapRef<any | undefined>> = ref(undefined)
const dateStart: Ref<UnwrapRef<string | undefined>> = ref(undefined)
const tags: Ref<UnwrapRef<Tag[]>> = ref([])
const summary: Ref<UnwrapRef<string | undefined>> = ref(undefined)
const bibliography: Ref<UnwrapRef<BibliographyItem[]>> = ref([])
const relatedReports: Ref<UnwrapRef<RelatedReport[]>> = ref([])
const currentSlug: Ref<UnwrapRef<string | undefined>> = ref(undefined)

// PDF download URL
const pdfDownloadUrl = computed(() => {
  if (!currentSlug.value) return '#'
  return buildPdfUrl(currentSlug.value)
})

// Convert bodyContent to array (handles both array and object formats from API)
const bodyContentArray = computed(() => {
  if (!bodyContent.value) return []
  return Array.isArray(bodyContent.value)
    ? bodyContent.value
    : Object.values(bodyContent.value)
})

const parsedTags = computed(() => {
  if (!tags.value || !Array.isArray(tags.value)) return []
  return tags.value
})

onMounted(async () => {
  const slug = useRoute()?.params?.slug

  if (typeof slug !== 'string') return

  currentSlug.value = slug

  const pageData = await ApiFetchPage(`bibliotheque/${slug}`)

  console.log(pageData)

  headerCover.value = pageData.options.headerImage?.mediaUrl
  headerFocus.value = pageData.options.headerImage?.focus
  headerText.value = pageData.options.headerTitle

  bodyContent.value = pageData.body
  dateStart.value = pageData.options.dateStart
  tags.value = (pageData.options as any).tags || []
  summary.value = (pageData as any).summary
  bibliography.value = (pageData as any).bibliography || []
  relatedReports.value = (pageData as any).relatedReports || []
})
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
}

.v-report-page {
  min-height: 100vh;
  background: var(--app-color-grey);
  padding: 2.22222222222rem var(--app-base-padding-x) 2.22222222222rem 2rem;
}

.v-report-page__main-layout {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 2.33333333333rem;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.v-report-page__right {
  min-width: 0; // Prevent grid blowout
}

.v-report-page__tabs {
  display: flex;
  flex-wrap: wrap;
}

.v-report-page__tab {
  max-width: none;
  width: 13.2222222222rem;
  height: 3.77777777778rem;
  border: none;
  background: var(--app-color-sage-dark);
  font-size: 1.11111111111rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 1.66666666667rem 1.66666666667rem 0 0;
  transition: all 0.2s ease;
  color: var(--app-color-black);
  position: relative;
  margin: 0;

  &:not(.v-report-page__tab--main):hover{
    background: var(--app-color-sage);
  }

  &--active {
    background: var(--app-color-sage);
  }

  &--main {
    background: var(--app-color-white);
  }
}

.v-report-page__content {
  padding: 0;
  border-radius: 0 1.66666666667rem 1.66666666667rem 1.66666666667rem;
  overflow: hidden;
}

.v-report-page__download {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  svg {
    display: block;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateY(4px);
  }
}
</style>
