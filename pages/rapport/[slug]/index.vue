<template>
  <section class="v-report-page">
    <!-- Header -->
    <div class="v-report-page__header">
      <app-header v-if="headerCover" header-size="small" :text="headerText" :bg-image="headerCover"
        :bg_focus="headerFocus" />
      <div v-else class="v-report-page__header-loading" />
    </div>

    <!-- Breadcrumb -->
    <div class="v-report-page__path">
      <div class="v-report-page__path-content app-font-small">
        <nuxt-link href="/">Home</nuxt-link> /
        <nuxt-link href="/bibliotheque/">Bibliothèque</nuxt-link>
        <span class="v-report-page__path-title">/ {{ headerText?.split(' ').slice(0, 8).join(' ') }}…</span>
      </div>
    </div>

    <!-- Main Layout: Sidebar (1/5) + Tabs (4/5) -->
    <div class="v-report-page__main-layout">
      <!-- Left: Sidebar TOC (1/5) -->
      <aside class="v-report-page__sidebar-wrapper">
        <app-report-sidebar v-if="bodyContentArray.length > 0" :body-content="bodyContentArray"
          class="v-report-page__sidebar" />
      </aside>

      <!-- Right: Tabs and Content (4/5) -->
      <div class="v-report-page__right">
        <!-- Tabs Navigation -->
        <div class="v-report-page__tabs">
          <button v-for="tab in tabs" :key="tab.key" class="v-report-page__tab"
            :class="{ 'v-report-page__tab--active': activeTab === tab.key }" @click="activeTab = tab.key">
            {{ tab.label }}
          </button>
        </div>

        <!-- Main Content Area -->
        <div class="v-report-page__content">
          <!-- Tab: Rapport -->
          <div v-show="activeTab === 'rapport'" class="v-report-page__main">
            <!-- Body Content -->
            <article class="v-report-page__body">
              <template v-if="bodyContentArray.length > 0">
                <template v-for="(item, index) in bodyContentArray" :key="index">
                  <!-- mdheading blocks -->
                  <template v-if="item.content?.type === 'mdheading'">
                    <app-report-heading :level="item.content.content.level" :text="item.content.content.text"
                      class="v-report-page__section v-report-page__section--full" />
                  </template>

                  <!-- reportbody blocks -->
                  <template v-else-if="item.content?.type === 'reportbody'">
                    <app-report-text :text="item.content.content.text"
                      class="v-report-page__section v-report-page__section--full" />
                  </template>

                  <!-- mdreportimage blocks -->
                  <template v-else-if="item.content?.type === 'mdreportimage'">
                    <app-report-image :image="item.image?.[0]" :size="item.content.content.size || 'large'"
                      :alt="item.content.content.alt" :caption="item.content.content.caption"
                      class="v-report-page__section" :class="{
                        'v-report-page__section--full': item.content.content.size === 'full' || item.content.content.size === 'large'
                      }" />
                  </template>

                  <!-- list blocks -->
                  <template v-else-if="item.content?.type === 'list' || item.content?.type === 'listPoints'">
                    <app-report-list :title="item.content.content.titleContent || item.content.content.titlecontent"
                      :text="item.content.content.text" class="v-report-page__section" />
                  </template>
                </template>
              </template>
            </article>
          </div>

          <!-- Tab: Bibliographie -->
          <div v-show="activeTab === 'bibliographie'" class="v-report-page__bibliography">
            <h2 class="v-report-page__section-title">Bibliographie</h2>
            <div v-if="bibliography && bibliography.length > 0" class="v-report-page__bibliography-list">
              <div v-for="(item, index) in bibliography" :key="item.id || index"
                class="v-report-page__bibliography-item">
                <span class="v-report-page__bibliography-number">[{{ item.index }}]</span>
                <div class="v-report-page__bibliography-content">
                  <p class="v-report-page__bibliography-text">{{ item.text }}</p>
                  <a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer"
                    class="v-report-page__bibliography-url">
                    {{ item.url }}
                  </a>
                </div>
              </div>
            </div>
            <p v-else class="v-report-page__empty">Aucune référence bibliographique disponible.</p>
          </div>

          <!-- Tab: Citations -->
          <div v-show="activeTab === 'citations'" class="v-report-page__citations">
            <app-citation-generator :title="headerText || ''" :summary="summary" :date-start="dateStart" />
          </div>

          <!-- Tab: En lien -->
          <div v-show="activeTab === 'enlien'" class="v-report-page__related">
            <h2 class="v-report-page__section-title">Tags</h2>
            <div v-if="parsedTags.length > 0" class="v-report-page__tags">
              <nuxt-link v-for="tag in parsedTags" :key="tag.slug"
                :href="`/bibliotheque/?q=${encodeURIComponent(tag.slug)}`" class="v-report-page__tag">
                {{ tag.name }}
              </nuxt-link>
            </div>
            <p v-else class="v-report-page__empty">Aucun tag disponible.</p>

            <h2 class="v-report-page__section-title" style="margin-top: 2rem">Rapports en lien</h2>
            <div v-if="relatedReports.length > 0" class="v-report-page__related-list">
              <nuxt-link v-for="report in relatedReports" :key="report.slug" :href="`/rapport/${report.slug}`"
                class="v-report-page__related-item">
                {{ report.title }} - {{ formatYear(report.dateStart) }}
              </nuxt-link>
            </div>
            <p v-else class="v-report-page__empty">Aucun rapport en lien disponible.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="v-report-page__footer">
      <div class="v-report-page__footer-actions">
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

        <!-- Share Button -->
        <div class="v-report-page__share" @click="shareClicked">
          <button class="app-button app-button--small">{{ textButton }}</button>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-send"
            viewBox="0 0 16 16">
            <path
              d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </div>
      </div>
    </div>

    <app-page-footer />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import { ApiFetchPage } from '~/composable/adminApi/apiFetch'
import { copyCurrentUrlToClipboard } from '~/utils/copyCurrentUrlToClipboard'
import AppHeader from '~/components/AppHeader.vue'
import AppPageFooter from '~/components/AppPageFooter.vue'
import AppReportSidebar from '~/components/AppReportSidebar.vue'
import AppCitationGenerator from '~/components/AppCitationGenerator.vue'
import AppReportHeading from '~/components/AppReportHeading.vue'
import AppReportText from '~/components/AppReportText.vue'
import AppReportImage from '~/components/AppReportImage.vue'
import AppReportList from '~/components/AppReportList.vue'

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
  { key: 'rapport', label: 'Rapport' },
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

// Backend base URL for PDF download
const backendBaseUrl = import.meta.env.DEV
  ? 'http://localhost:8080'
  : 'https://modus-admin.sdrvl.ch'

// PDF download URL
const pdfDownloadUrl = computed(() => {
  if (!currentSlug.value) return '#'
  return `${backendBaseUrl}/rapport/${currentSlug.value}/pdf`
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

function formatYear(dateStr?: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? '' : date.getFullYear().toString()
}

onMounted(async () => {
  const slug = useRoute()?.params?.slug

  if (typeof slug !== 'string') return

  currentSlug.value = slug

  const pageData = await ApiFetchPage(`bibliotheque/${slug}`)

  console.log(pageData)

  headerCover.value = pageData.options.headerImage?.mediaUrl
  headerFocus.value = pageData.options.headerImage?.focus
  headerText.value = pageData?.title?.value

  bodyContent.value = pageData.body
  dateStart.value = pageData.options.dateStart
  tags.value = (pageData.options as any).tags || []
  summary.value = (pageData as any).summary
  bibliography.value = (pageData as any).bibliography || []
  relatedReports.value = (pageData as any).relatedReports || []
})

const textButton = ref('Copier le lien de cette page')

function shareClicked() {
  copyCurrentUrlToClipboard()
  textButton.value = 'Lien copié'
}
</script>

<style lang="scss" scoped>
.v-report-page {
  min-height: 100vh;
}

.v-report-page__header-loading {
  height: 300px;
  background-color: var(--app-color-grey);
}

.v-report-page__path {
  background-color: var(--app-color-grey);
  padding: 1rem var(--app-gutter);
  position: sticky;
  top: var(--app-nav__height);
  z-index: 10;
}

.v-report-page__path-content {
  max-width: 1300px;
  margin: 0 auto;

  a {
    color: var(--app-color-main);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.v-report-page__path-title {
  color: #666;
}

.v-report-page__main-layout {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 2rem;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 var(--app-gutter);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.v-report-page__right {
  min-width: 0; // Prevent grid blowout
}

.v-report-page__sidebar-wrapper {
  position: sticky;
  top: calc(var(--app-nav__height) + 60px);
  height: fit-content;
  max-height: calc(100vh - var(--app-nav__height) - 80px);
  overflow-y: auto;

  @media (max-width: 1024px) {
    position: static;
    order: -1;
    max-height: none;
  }
}

.v-report-page__tabs {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 0;
  flex-wrap: wrap;
  border-bottom: 2px solid var(--app-color-grey);
}

.v-report-page__tab {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: var(--app-radius-small) var(--app-radius-small) 0 0;
  transition: all 0.2s ease;
  color: #666;
  position: relative;

  &:hover {
    background-color: var(--app-color-grey);
    color: var(--app-color-main--dark);
  }

  &--active {
    color: var(--app-color-main--dark);
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 3px;
      background-color: var(--app-color-main);
    }
  }
}

.v-report-page__content {
  padding: 2rem 0;
}

.v-report-page__body {
  order: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.v-report-page__section {
  display: block; // Base section styles
}

.v-report-page__section--full {
  width: 100%;
}

.v-report-page__section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--app-color-main--dark);
  margin-bottom: 1.5rem;
}

// Bibliographie styles
.v-report-page__bibliography-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.v-report-page__bibliography-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--app-color-grey);
  border-radius: var(--app-radius-small);
}

.v-report-page__bibliography-number {
  font-weight: 700;
  color: var(--app-color-main);
  flex-shrink: 0;
}

.v-report-page__bibliography-content {
  flex: 1;
}

.v-report-page__bibliography-text {
  margin: 0 0 0.5rem;
  line-height: 1.6;
}

.v-report-page__bibliography-url {
  display: inline-block;
  font-size: 0.875rem;
  color: var(--app-color-main);
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
}

// Tags styles
.v-report-page__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.v-report-page__tag {
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

// Related reports grid
.v-report-page__related-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.v-report-page__related-item {
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

.v-report-page__empty {
  color: #666;
  font-style: italic;
}

// Footer
.v-report-page__footer {
  display: flex;
  background-color: var(--app-color-grey);
  justify-content: center;
  padding: 2rem;
}

.v-report-page__footer-actions {
  display: flex;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
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

.v-report-page__share {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  svg {
    display: block;
  }

  &:hover svg {
    animation: takeoff 4s ease-in-out forwards;
  }
}

@keyframes takeoff {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }

  25% {
    opacity: 0;
  }

  50% {
    transform: translate(300px, -200px) rotate(30deg);
  }

  100% {
    transform: translate(600px, -600px) rotate(90deg);
    opacity: 0;
  }
}
</style>
