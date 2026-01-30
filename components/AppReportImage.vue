<template>
  <figure 
    class="v-report-image" 
    :class="`v-report-image--${size}`"
  >
    <img 
      class="v-report-image__img"
      :src="imageSrc"
      :alt="alt || 'Image du rapport'"
      loading="lazy"
    />
    <figcaption 
      v-if="caption" 
      class="v-report-image__caption"
      v-html="caption"
    />
  </figure>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ReportImageData {
  resize?: {
    tiny?: string
    small?: string
    reg?: string
    large?: string
    xxl?: string
  }
  mediaUrl?: string
  alt?: string
  caption?: string
}

const props = defineProps<{
  image?: ReportImageData
  size?: 'full' | 'large' | 'small'
  alt?: string
  caption?: string
}>()

const imageSrc = computed(() => {
  if (!props.image) return ''
  
  // Choose appropriate resize based on size prop
  if (props.image.resize) {
    if (props.size === 'full' || props.size === 'large') {
      return props.image.resize.large || props.image.resize.xxl || props.image.mediaUrl
    } else if (props.size === 'small') {
      return props.image.resize.reg || props.image.resize.small || props.image.mediaUrl
    }
    return props.image.resize.large || props.image.mediaUrl
  }
  
  return props.image.mediaUrl || ''
})
</script>

<style lang="scss" scoped>
.v-report-image {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.v-report-image__img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--app-radius-small);
  object-fit: cover;
}

.v-report-image--full {
  grid-column: 1 / -1;
  
  .v-report-image__img {
    max-height: 600px;
  }
}

.v-report-image--large {
  grid-column: 1 / -1;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  
  .v-report-image__img {
    max-height: 500px;
  }
}

.v-report-image--small {
  max-width: 450px;
  
  .v-report-image__img {
    max-height: 350px;
  }
}

.v-report-image__caption {
  font-size: 0.875rem;
  color: #666;
  font-style: italic;
  text-align: center;
  padding: 0 1rem;
}
</style>
