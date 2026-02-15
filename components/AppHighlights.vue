<template>
  <!-- Outer wrapper: on pointer devices, its height creates the vertical scroll runway
       that drives horizontal movement while the section stays pinned via sticky -->
  <div
    ref="outerRef"
    class="v-app-highlights-outer"
    :style="outerStyle"
  >
    <section
      class="v-app-highlights"
      :class="{ 'v-app-highlights--sticky': isPointerDevice }"
    >
      <div class="v-app-highlights__header">
        <h2 v-if="title" class="v-app-highlights__title">{{ title }}</h2>
        <p v-if="subtitle" class="v-app-highlights__subtitle">{{ subtitle }}</p>
      </div>

      <div
        ref="trackRef"
        class="v-app-highlights__track"
        :class="{ 'v-app-highlights__track--pointer': isPointerDevice }"
      >
        <div class="v-app-highlights__item" v-for="(item, idx) in items" :key="idx">
          <app-item-card
            v-bind="mapItemToCardProps(item)"
            @play-video="handlePlayVideo"
            @play-podcast="handlePlayPodcast"
          />
        </div>
      </div>
    </section>
  </div>
</template>


<script setup lang="ts">
import AppItemCard from '~/components/AppItemCard.vue'
import { mapItemToCardProps } from '~/utils/mapItemToCardProps'
import type { IApiSingleProject } from '~/composable/adminApi/apiDefinitions'
import { useSpotifyUrl, useSpotifyTitle, usePodcastPlayerIsOpen, useYoutubeUrl, useYoutubeTitle } from '~/composable/main'

const props = defineProps<{
  title?: string
  subtitle?: string
  items: IApiSingleProject[]
}>()

const emit = defineEmits<{
  (e: 'play-video', mediaUrl: string, title: string): void
  (e: 'play-podcast', mediaUrl: string, title: string): void
}>()

const spotifyUrl = useSpotifyUrl()
const spotifyTitle = useSpotifyTitle()
const playerIsOpen = usePodcastPlayerIsOpen()
const youtubeUrl = useYoutubeUrl()
const youtubeTitle = useYoutubeTitle()

function handlePlayVideo(mediaUrl: string, title: string) {
  spotifyUrl.value = null
  spotifyTitle.value = null
  youtubeUrl.value = mediaUrl
  youtubeTitle.value = title
}

function handlePlayPodcast(mediaUrl: string, title: string) {
  if (spotifyUrl.value === mediaUrl) return
  youtubeUrl.value = null
  youtubeTitle.value = null
  const wasAlreadyOpen = !!spotifyUrl.value
  spotifyUrl.value = mediaUrl
  spotifyTitle.value = title
  if (!wasAlreadyOpen) {
    playerIsOpen.value = false
  }
}
const outerRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const isPointerDevice = ref(false)
const scrollableDistance = ref(0)

// How much vertical scroll is needed per pixel of horizontal travel.
// Higher = slower horizontal movement.  1 = 1:1, 1.6 = 60 % slower
const SCROLL_SPEED = 1.8

// Outer wrapper height = section height + scaled horizontal overflow distance
// This creates the vertical "runway" for scroll-jacking
const outerStyle = computed(() => {
  if (!isPointerDevice.value || scrollableDistance.value <= 0) return {}
  return {
    height: `calc(100vh + ${scrollableDistance.value * SCROLL_SPEED}px)`,
  }
})

function updateScrollableDistance() {
  const track = trackRef.value
  if (!track) return
  scrollableDistance.value = track.scrollWidth - track.clientWidth
}

function onScroll() {
  if (!isPointerDevice.value) return
  const outer = outerRef.value
  const track = trackRef.value
  if (!outer || !track) return

  const maxScroll = track.scrollWidth - track.clientWidth
  if (maxScroll <= 0) return

  // How far the outer wrapper has scrolled past the top of the viewport
  const rect = outer.getBoundingClientRect()
  const scrolled = -rect.top // 0 when top is at viewport top, increases as we scroll down

  // Scale down by SCROLL_SPEED so horizontal travel is slower
  const progress = Math.max(0, Math.min(scrolled / SCROLL_SPEED, maxScroll))
  track.scrollLeft = progress
}

onMounted(() => {
  const mql = window.matchMedia('(pointer: fine)')
  isPointerDevice.value = mql.matches

  const updatePointerType = (e: MediaQueryListEvent) => {
    isPointerDevice.value = e.matches
    nextTick(updateScrollableDistance)
  }
  mql.addEventListener('change', updatePointerType)

  // Measure the horizontal overflow to size the outer wrapper
  nextTick(updateScrollableDistance)

  // Listen to page scroll to drive horizontal position
  window.addEventListener('scroll', onScroll, { passive: true })

  // Recalculate on resize
  const ro = new ResizeObserver(() => {
    updateScrollableDistance()
    onScroll()
  })
  if (trackRef.value) ro.observe(trackRef.value)

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    mql.removeEventListener('change', updatePointerType)
    ro.disconnect()
  })
})
</script>


<style lang="scss" scoped>
.v-app-highlights-outer {
  position: relative;
}

.v-app-highlights {
  width: 100%;
  padding: 4.22222222222rem 0;
}

/* On pointer devices the section sticks to the top while
   the outer wrapper's extra height scrolls through */
.v-app-highlights--sticky {
  position: sticky;
  top: 0;
}

.v-app-highlights__header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 0 var(--app-base-gutter);
}

.v-app-highlights__title {
  margin: 0 0 0.25rem 0;
  color: var(--app-color-black);
  font-size: 3.55555555556rem;
  font-weight: 600;
  line-height: 1.14;

  @media (max-width: 1280px) {
    font-size: 2.5rem;
  }
  @media (max-width: 900px) {
    font-weight: 900;
    font-size: 1.45rem;
    line-height: 1.225;
    margin-bottom: 0.25em;
  }
}

.v-app-highlights__subtitle {
  color: var(--app-color-black);
  font-weight: 600;
  margin: 0;
  font-size: 1.33333333333rem;
  max-width: none;
}

/* Scrollable track */
.v-app-highlights__track {
  --padding-x: max(var(--app-gutter), calc((100vw - 1300px ) / 2 + var(--app-gutter)));
  display: flex;
  gap: 1.11111111111rem;
  padding: 0 var(--padding-x) 0 var(--padding-x);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  /* Pointer devices: scrollbar hidden, scroll driven by sticky mechanism */
  &.v-app-highlights__track--pointer {
    overflow-x: hidden;
    scroll-snap-type: none;
  }
}

.v-app-highlights__item {
  flex: 0 0 max(22rem, calc(33vw - 0.74074074074rem));
  display: flex;
  @media (max-width: 767px) {
    flex: 0 0 95%;
  }
}
</style>
