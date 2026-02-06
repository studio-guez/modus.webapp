<template>
    <section
        class="v-projects"
    >
      <app-page
        :header-cover="headerCover"
        :header-text="headerText"
        :without-body="true"
      />

      <div class="v-project__content app-show-background-on-nav">
        <div class="v-project__content__grid">
          <div class="v-project__section v-project__section--full" >
            <div style="display: flex; align-items: center; justify-content: center">

              <div class="v-project__filter"
                   @click="router.push({ query: {} })"
                   v-if="activeFilterLabel"
              >
                <div class="v-project__filter__text">
                  {{activeFilterLabel}}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                </svg>
              </div>
              <div class="v-project__filter--list"
                   style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center"
                   v-else
              >
                <template v-for="(value, key) of filterMap">
                  <div class="app-button app-button--small"
                          @click="router.push({ query: { q: key } })"
                  >{{value}}
                  </div>
                </template>
              </div>

            </div>
            <div class="app-font-small"
                 v-if="filter && activeFilterLabel"
                    style="display: flex; align-items: center; justify-content: center; margin-top: 1rem;">
              {{filterDescription}}&nbsp;<em>{{activeFilterLabel}}</em>
            </div>

          </div>

          <template v-if="itemsToShow">
            <template v-if="itemsToShow.length > 0">
              <div class="v-project__section"
                   v-for="item of itemsToShow"
                   :key="item.slug"
              >
                <app-item-card
                    v-bind="mapItemToCardProps(item, pageType, backendBaseUrl)"
                    @play-video="handlePlayVideo"
                    @play-podcast="handlePlayPodcast"
                    @pdf-download="handlePdfDownload"
                />
              </div>
            </template>
            <template v-else>
              <div class="v-project__section v-project__section--full">
                <div style="min-height: 50vh; display: flex; align-items: center; justify-content: center; width: 100%">
                  <h4 style="text-align: center">{{emptyMessage}}
                    <span class="app-button app-button--small"
                          @click="router.push({ query: {q: ''} })"
                    >{{activeFilterLabel}}</span>
                  </h4>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <template v-for="item of items" :key="item.slug">
              <div class="v-project__section">
                <app-item-card
                    v-bind="mapItemToCardProps(item, pageType, backendBaseUrl)"
                    @play-video="handlePlayVideo"
                    @play-podcast="handlePlayPodcast"
                    @pdf-download="handlePdfDownload"
                />
              </div>
            </template>
          </template>
        </div>
      </div>

      <app-page-footer/>
    </section>
</template>


<script setup lang="ts">
import {ComputedRef, Ref, UnwrapRef} from 'vue'
import AppPage from "~/components/AppPage.vue";
import {LocationQueryValue} from "vue-router";
import {IApiSingleProject} from "~/composable/adminApi/apiDefinitions";
import {ApiFetchProjects} from "~/composable/adminApi/apiFetch";
import AppItemCard from "~/components/AppItemCard.vue";
import { mapItemToCardProps } from '~/utils/mapItemToCardProps';

export type PageType = 'media' | 'report' | 'tool' | 'project'

const props = defineProps<{
    apiEndpoint: string
    filterMap: Record<string, string>
    filterDescription: string
    emptyMessage: string
    pageType?: PageType
}>()

const emit = defineEmits<{
    (e: 'play-video', mediaUrl: string): void
    (e: 'play-podcast', mediaUrl: string): void
    (e: 'pdf-download', pdfUrl: string): void
}>()

const runtimeConfig = useRuntimeConfig()
const backendBaseUrl = runtimeConfig.public.backendBaseUrl as string

const route = useRoute()
const router = useRouter()

const headerCover: Ref<UnwrapRef<undefined | string>> = ref(undefined)
const headerText: Ref<UnwrapRef<undefined | string>> = ref(undefined)

const items: Ref<UnwrapRef<undefined | IApiSingleProject[]>> = ref(undefined)

const itemsToShow: ComputedRef<UnwrapRef<null | IApiSingleProject[]>> = computed(() => {
    if (!filter.value) return null
    if (!items.value) return null

    return filteredItems(items.value)
})

function filteredItems(items: IApiSingleProject[]): IApiSingleProject[] {
    return Object.values(items).filter(item => {
        const tagsRaw = item.content.tags as string[] | string | undefined
        if (!tagsRaw) return false
        
        const tags: string[] = Array.isArray(tagsRaw) 
            ? tagsRaw 
            : (typeof tagsRaw === 'string' ? tagsRaw.split(',').map((t: string) => t.trim()) : [])
        
        return tags.includes(filter.value as string)
    })
}

function sortedByDate(items: {[key: string]: IApiSingleProject}): IApiSingleProject[] {
    const itemArray = Object.values(items)

    return itemArray.sort((a, b) => {
        const dateStartA = new Date(a.content.datestart).getTime()
        const dateStartB = new Date(b.content.datestart).getTime()

        if (dateStartA !== dateStartB) {
            return dateStartB - dateStartA
        }

        const dateEndA = a.content.dateend ? new Date(a.content.dateend).getTime() : 0
        const dateEndB = b.content.dateend ? new Date(b.content.dateend).getTime() : 0

        return dateEndB - dateEndA
    })
}

onMounted(async () => {
    const pageData = await ApiFetchProjects(props.apiEndpoint)

    headerCover.value = pageData.options.headerImage?.resize.tiny
    headerText.value = pageData.options.headerTitle
    items.value = sortedByDate(pageData.children)

    lazyLoadHeadImage(pageData.options.headerImage?.url || '')
})

function lazyLoadHeadImage(largeImageUrl: string) {
    const imageToLoad = new Image()
    imageToLoad.src = largeImageUrl
    imageToLoad.addEventListener('load', () => headerCover.value = largeImageUrl)
}

const filter: Ref<UnwrapRef<string | LocationQueryValue[] | null>> = ref(route.query.q || null)

const activeFilterLabel: ComputedRef<string | null> = computed(() => {
    if (filter.value === null) return null
    if (typeof filter.value !== 'string') return null
    if (filter.value in props.filterMap) return props.filterMap[filter.value]
    return null
})

watch(() => route.query.q, (newSearch: string | LocationQueryValue[] | undefined) => {
    filter.value = newSearch || null
})

function handlePlayVideo(mediaUrl: string) {
    emit('play-video', mediaUrl)
}

function handlePlayPodcast(mediaUrl: string) {
    emit('play-podcast', mediaUrl)
}

function handlePdfDownload(pdfUrl: string) {
    emit('pdf-download', pdfUrl)
}
</script>


<style lang="scss" scoped >
.v-project__filter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 5rem;
  flex-wrap: nowrap;
  border: solid 2px var(--app-color-main);
  box-sizing: border-box;
  padding: 1rem;
  user-select: none;
  cursor: pointer;

  .v-project__filter__img {
    display: block;
    height: 2rem;
    width: auto;
  }
}

.v-project__content {
  background: var(--app-color-grey);
  position: relative;
  z-index: 10;
  width: 100%;
}

.v-project__content__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  gap: 1rem;
  padding: 2rem var(--app-gutter);

  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
  }
}

.v-project__section {
  box-sizing: border-box;
  position: relative;
  width: 100%;

  &.v-project__section--full {
    max-width: none;
    grid-column: 1 / -1;
  }

  &.v-project__section--no-padding {
    padding-top: 0;
    padding-bottom: 0;
  }

  &.v-project__section--no-margin {
    padding-left: 0;
    padding-right: 0;
  }

  &.v-project__section--intro {
    box-sizing: content-box;
    position: relative;

    p:nth-child(1n + 1) {
      color: var(--app-color-main);
    }

    p:nth-child(2n + 1) {
      color: var(--app-color-main--dark);
    }
  }

  .v-project__section__graphic-items {
    position: absolute;

    @media (max-width: 900px) {
      display: none;
    }
  }

  .v-project__section__graphic-items--m {
    top: 0;
    left: 0;
    transform: translate(-100%, 0%);
    height: 16vw;
    max-height: 298px;
  }

  .v-project__section__graphic-items--o {
    bottom: 0;
    left: 0;
    transform: translate(-100%, 0%);
    height: 8vw;
    max-height: 148px;
  }

  .v-project__section__graphic-items--du {
    top: 0;
    right: 0;
    transform: translate(90%, -10%);
    height: 20vw;
    max-height: 372px;
  }

  .v-project__section__graphic-items--s {
    bottom: 0;
    right: 0;
    transform: translate(100%, 0%);
    height: 12vw;
    max-height: 224px;
  }
}
</style>
