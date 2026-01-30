<template>
  <div class="v-citation-generator">
    <div class="v-citation-generator__summary" v-if="summary">
      <h3 class="v-citation-generator__section-title">Résumé</h3>
      <p class="v-citation-generator__summary-text">{{ summary }}</p>
    </div>
    
    <div class="v-citation-generator__meta" v-if="year">
      <h3 class="v-citation-generator__section-title">Année de publication</h3>
      <p class="v-citation-generator__year">{{ year }}</p>
    </div>
    
    <div class="v-citation-generator__citations">
      <h3 class="v-citation-generator__section-title">Citer ce rapport</h3>
      <p class="v-citation-generator__instructions">
        Cliquez sur un style de citation pour le copier dans votre presse-papiers.
      </p>
      
      <div class="v-citation-generator__styles">
        <div 
          v-for="style in citationStyles" 
          :key="style.key"
          class="v-citation-generator__style"
        >
          <div class="v-citation-generator__style-header">
            <span class="v-citation-generator__style-name">{{ style.label }}</span>
            <button 
              class="v-citation-generator__copy-btn app-button app-button--small"
              @click="copyToClipboard(style.key, style.citation)"
            >
              {{ copiedStyle === style.key ? 'Copié !' : 'Copier' }}
            </button>
          </div>
          <div class="v-citation-generator__style-text">
            {{ style.citation }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatCitationDate, type CitationStyle } from '~/utils/formatCitationDate'

const props = defineProps<{
  title: string
  summary?: string
  dateStart?: string
  url?: string
}>()

const copiedStyle = ref<string | null>(null)

const year = computed(() => {
  if (!props.dateStart) return null
  const date = new Date(props.dateStart)
  return isNaN(date.getTime()) ? null : date.getFullYear()
})

const currentUrl = computed(() => {
  if (props.url) return props.url
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return ''
})

const accessDate = computed(() => {
  const now = new Date()
  return now.toISOString()
})

interface CitationStyleItem {
  key: string
  label: string
  citation: string
}

const citationStyles = computed<CitationStyleItem[]>(() => {
  const title = props.title || 'Untitled Report'
  const dateStr = props.dateStart || new Date().toISOString()
  const url = currentUrl.value
  const accessed = accessDate.value
  
  return [
    {
      key: 'apa',
      label: 'APA Style',
      citation: `Modus. (${formatCitationDate(dateStr, 'apa')}). ${title}. ${url}`
    },
    {
      key: 'mla',
      label: 'MLA Style',
      citation: `Modus. "${title}." Modus, ${formatCitationDate(dateStr, 'mla')}, ${url}.`
    },
    {
      key: 'mhra',
      label: 'MHRA Style',
      citation: `Modus, '${title}', ${formatCitationDate(dateStr, 'mhra')} <${url}> [accessed ${formatCitationDate(accessed, 'mhra')}]`
    },
    {
      key: 'chicago',
      label: 'Chicago Style',
      citation: `Modus. "${title}." Modus. ${formatCitationDate(dateStr, 'chicago')}. ${url}.`
    },
    {
      key: 'cbe',
      label: 'CBE/CSE Style',
      citation: `Modus. ${title} [Internet]. ${formatCitationDate(dateStr, 'cbe')} [cited ${formatCitationDate(accessed, 'cbe')}]. Available from: ${url}`
    },
    {
      key: 'bluebook',
      label: 'Bluebook Style',
      citation: `Modus, ${title}, Modus (${formatCitationDate(dateStr, 'bluebook')}), ${url}.`
    },
    {
      key: 'bibtex',
      label: 'BibTeX',
      citation: generateBibtex(title, dateStr, url)
    }
  ]
})

function generateBibtex(title: string, dateStr: string, url: string): string {
  const year = formatCitationDate(dateStr, 'bibtex')
  const key = title.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '').substring(0, 20)
  return `@misc{modus_${key}_${year},
  author = {Modus},
  title = {${title}},
  year = {${year}},
  url = {${url}},
  note = {Accessed: ${formatCitationDate(accessDate.value, 'chicago')}}
}`
}

async function copyToClipboard(styleKey: string, text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedStyle.value = styleKey
    setTimeout(() => {
      copiedStyle.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style lang="scss" scoped>
.v-citation-generator {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.v-citation-generator__section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--app-color-main--dark);
}

.v-citation-generator__summary-text {
  line-height: 1.6;
  color: #333;
}

.v-citation-generator__year {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--app-color-main);
}

.v-citation-generator__instructions {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
}

.v-citation-generator__styles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.v-citation-generator__style {
  background-color: var(--app-color-grey);
  border-radius: var(--app-radius-small);
  padding: 1rem;
}

.v-citation-generator__style-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.v-citation-generator__style-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--app-color-main--dark);
}

.v-citation-generator__copy-btn {
  flex-shrink: 0;
}

.v-citation-generator__style-text {
  font-family: monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #333;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>
