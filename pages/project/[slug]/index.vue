<template>
    <section
        class="v-project-slug"
    >
        <app-page
            :header-cover="headerCover"
            :header_focus="headerFocus"
            :title-content="bodyTitle"
            :body-content="bodyContent"
            :path="true"
            :header-size="'small'"
            :header-text="headerText"
            :date_start="dateStart"
            :is_project_with_duration="isProjectWithDuration"
            :date_end="dateEnd"
            :power_subpages="powerSubpages"
        />
        <div class="v-project-slug__footer">
          <div style="display: flex; justify-content: center; flex-direction: column; align-items: center; gap: .5rem; cursor: pointer"
               @click="shareClicked"
          >
            <button class="app-button app-button--small">{{textButton}}</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
            </svg>
          </div>
        </div>
        <app-page-footer/>
    </section>
</template>





<script setup lang="ts">
import {defineProps, Ref, UnwrapRef} from 'vue'
import AppPage from "~/components/AppPage.vue";
import {IApiBody, IApiPage__subpage} from "~/composable/adminApi/apiDefinitions";
import {ApiFetchPage} from "~/composable/adminApi/apiFetch";
import {copyCurrentUrlToClipboard} from "~/utils/copyCurrentUrlToClipboard";

const headerCover: Ref<UnwrapRef<undefined | string>> = ref(undefined)
const headerFocus: Ref<UnwrapRef<undefined | string>> = ref(undefined)
const headerText: Ref<UnwrapRef<undefined | string>> = ref(undefined)

const bodyTitle: Ref<UnwrapRef<undefined | string>> = ref(undefined)
const bodyContent: Ref<UnwrapRef<undefined | IApiBody>> = ref(undefined)

const dateStart: Ref<UnwrapRef<undefined | string>>              = ref(undefined)
const isProjectWithDuration: Ref<UnwrapRef<undefined | string>>  = ref(undefined)
const dateEnd: Ref<UnwrapRef<undefined | string>>                = ref(undefined)

const powerSubpages: Ref<UnwrapRef<undefined | IApiPage__subpage[]>>            = ref(undefined)

onMounted(async () => {
    const slug = useRoute()?.params?.slug

    if(typeof slug !== 'string') return

    const pageData = await ApiFetchPage(`projects/${slug}`)

    console.log(pageData)

    headerCover.value = pageData.options.headerImage?.mediaUrl
    headerFocus.value = pageData.options.headerImage?.focus
    headerText.value = pageData.options.headerTitle

    bodyTitle.value = pageData.options.preview
    bodyContent.value = pageData.body

    dateStart.value = pageData.options.dateStart
    isProjectWithDuration.value = pageData.options.isProjectWithDuration
    dateEnd.value = pageData.options.dateEnd

    powerSubpages.value = pageData.options.subpages
})

const textButton = ref('Copier le lien de cette page')

function shareClicked() {
    copyCurrentUrlToClipboard()
    textButton.value = 'Lien copié'
}


</script>





<style lang="scss" scoped >
.v-project-slug__footer {
  display: flex;
  background-color: var(--app-color-grey);
  position: relative;
  justify-content: center;
}

.v-project-slug__footer {
  svg {
    display: block;
    position: relative;
  }
  &:hover {
    svg {
      animation: takeoff 4s ease-in-out forwards;
    }
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
