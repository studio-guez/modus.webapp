<template>
  <header
          class="v-app-header-home"
  >
    <div
            class="v-app-header-home__container"
    >
      <div
              class="v-app-header-home__container__graphic-box"
      >
        <img
                class="v-app-header-home__graphic-box__module_1"
                alt="image graphique de ville pour habiller le header du site"
                :src="bgImage"
        />
      </div>
      <div
              class="v-app-header-home__container__graphic-box"
      >
        <img
                class="v-app-header-home__graphic-box__module_1"
                alt="image graphique de ville pour habiller le header du site"
                :src="bgImage"
        />
      </div>
    </div>

    <h1
            class="v-app-header-home__signature"
            v-html="formattedText"
    />

    <!-- Actualités banners -->
    <div v-if="visibleActualites.length > 0" class="v-app-header-home__actualites">
      <div
        v-for="(actualite, index) in visibleActualites"
        :key="index"
        class="v-app-header-home__actualite"
      >
        <div class="v-app-header-home__actualite__scroll-container">
          <component
            :is="actualite.link ? 'a' : 'div'"
            :href="actualite.link || undefined"
            :target="actualite.link ? '_blank' : undefined"
            class="v-app-header-home__actualite__scroll"
          >
            <span 
              v-for="n in getRepeatCount(index)" 
              :key="n" 
              class="v-app-header-home__actualite__item"
            >
              <span class="v-app-header-home__actualite__text">{{ actualite.title }}</span>
              <svg-actualites class="v-app-header-home__actualite__logo" />
            </span>
          </component>
        </div>
        <button
          type="button"
          class="v-app-header-home__actualite__close"
          @click="dismissActualite(index)"
          aria-label="Fermer"
        >
          <svg-close />
        </button>
      </div>
    </div>
  </header>
</template>





<script lang="ts" setup>
import { markModus } from '~/utils/markModus'

export interface IActualite {
  title: string
  link?: string
}

const props = defineProps<{
    bgImage: string,
    text?: string,
    actualites?: IActualite[]
}>()

const formattedText = computed(() => {
    if (!props.text) return ''
    return markModus(props.text)
})

const dismissedIndices = ref<number[]>([])

const visibleActualites = computed(() => {
  if (!props.actualites) return []
  return props.actualites.filter((_, index) => !dismissedIndices.value.includes(index))
})

// Repeat counts for infinite scroll - updates on resize, one per actualité
const windowWidth = ref(0)

const repeatCounts = computed(() => {
  if (!props.actualites) return []
  return props.actualites.map((actualite) => {
    // Estimate width based on text length (roughly 20px per character + 150px for logo/padding)
    const estimatedItemWidth = actualite.title.length * 20 + 150
    const neededWidth = windowWidth.value * 2
    return Math.max(4, Math.ceil(neededWidth / estimatedItemWidth) + 2)
  })
})

function getRepeatCount(index: number): number {
  const actualIndex = props.actualites?.findIndex((act, i) => 
    !dismissedIndices.value.includes(i) && 
    visibleActualites.value.indexOf(act) === index
  )
  return repeatCounts.value[actualIndex ?? 0] ?? 4
}

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

function dismissActualite(index: number) {
  const actualIndex = props.actualites?.findIndex((act, i) => 
    !dismissedIndices.value.includes(i) && 
    visibleActualites.value.indexOf(act) === index
  )
  if (actualIndex !== undefined && actualIndex !== -1) {
    dismissedIndices.value = [...dismissedIndices.value, actualIndex]
  }
}
</script>





<style lang="scss" scoped >
.v-app-header-home {
  box-sizing: border-box;
  background: white;
  width: 100%;
  padding: 6rem var(--app-base-padding-x) 0 var(--app-base-padding-x);
  height: var(--app-header-height);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;


  @media (max-width: 900px) {
    height: calc( var(--app-header-height) );
  }
}

.v-app-header-home__container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.v-app-header-home__signature {
  z-index: 1;
  color: var(--app-color-white);
  font-size: var(--app-header-title-size);
  text-align: center;
  text-wrap: balance;
  margin: 0;
  text-shadow: 0 4px 64.4px rgba(0, 0, 0, 0.30);
  max-width: 68.3333333333rem;

  &:deep(mark) {
      background: transparent;
      color: var(--app-color-main);
      padding: 0;
  }
}

.v-app-header-home__container__graphic-box {
  position: absolute;
  top: 0;
  left: 0;
  height: var(--app-header-height);
  width: auto;
  animation: scroll 200s linear infinite;

}

.v-app-header-home__graphic-box__module_1 {
  position: relative;
  top: 0;
  height: var(--app-header-height);

  .v-app-header-home__container__graphic-box + .v-app-header-home__container__graphic-box & {
    transform: translate3d(100%, 0, 0);
  }
}

@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

// Actualités styles
.v-app-header-home__actualites {
  position: absolute;
  bottom: 1.77777777778rem;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  color: var(--app-color-black)
}

.v-app-header-home__actualite {
  display: flex;
  align-items: center;
  background-color: var(--app-color-teal);
  height: 3.5rem;
  overflow: hidden;
  position: relative;

  & + & {
    background-color: var(--app-color-sage);
    & .v-app-header-home__actualite__close {
      background-color: var(--app-color-sage);
    }
  }
}

.v-app-header-home__actualite__scroll-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 100%;
}

.v-app-header-home__actualite__scroll {
  display: flex;
  align-items: center;
  height: 100%;
  animation: scrollActualite 20s linear infinite;
  width: max-content;
  text-decoration: none;
  color: inherit;

  &:hover {
    animation-play-state: paused;
  }
}

.v-app-header-home__actualite__item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-left: 1.5rem;
  white-space: nowrap;
  &:last-child {
    padding-right: 1.5rem;
  }
  svg {
    flex-shrink: 0;
    height: 2.5rem;
    width: auto;
  }
}

.v-app-header-home__actualite__text {
  font-size: 2rem;
  font-weight: 700;;
}

.v-app-header-home__actualite__logo {
  height: 1.75rem;
  width: auto;
  flex-shrink: 0;
}

.v-app-header-home__actualite__close {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  background-color: var(--app-color-teal);
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s ease;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}

@keyframes scrollActualite {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
