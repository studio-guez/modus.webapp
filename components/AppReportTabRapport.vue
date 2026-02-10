<template>
  <section class="v-report-tab-rapport">
    <article class="v-report-tab-rapport__body">
      <template v-if="bodyContent.length > 0">
        <template v-for="(item, index) in bodyContent" :key="index">
          <!-- mdheading blocks -->
          <template v-if="item.content?.type === 'mdheading'">
            <app-report-heading :level="item.content.content.level" :text="item.content.content.text"
              class="v-report-tab-rapport__section v-report-tab-rapport__section--full" />
          </template>

          <!-- reportbody blocks -->
          <template v-else-if="item.content?.type === 'reportbody'">
            <app-report-text :text="item.content.content.text"
              class="v-report-tab-rapport__section v-report-tab-rapport__section--full" />
          </template>

          <!-- mdreportimage blocks -->
          <template v-else-if="item.content?.type === 'mdreportimage'">
            <app-report-image :image="item.image?.[0]" :size="item.content.content.size || 'large'"
              :alt="item.content.content.alt" :caption="item.content.content.caption"
              class="v-report-tab-rapport__section" :class="{
                'v-report-tab-rapport__section--full': item.content.content.size === 'full' || item.content.content.size === 'large'
              }" />
          </template>

          <!-- list blocks -->
          <template v-else-if="item.content?.type === 'list' || item.content?.type === 'listPoints'">
            <app-report-list :title="item.content.content.titleContent || item.content.content.titlecontent"
              :text="item.content.content.text" class="v-report-tab-rapport__section" />
          </template>
        </template>
      </template>
    </article>
  </section>
</template>

<script setup lang="ts">
import AppReportHeading from '~/components/AppReportHeading.vue'
import AppReportText from '~/components/AppReportText.vue'
import AppReportImage from '~/components/AppReportImage.vue'
import AppReportList from '~/components/AppReportList.vue'

defineProps<{
  bodyContent: any[]
}>()
</script>

<style lang="scss" scoped>
.v-report-tab-rapport__body {
  background: var(--app-color-white);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: var(--app-report-tab-padding-y) var(--app-report-tab-padding-x);
  min-height: var(--app-report-tab-min-height);
}

.v-report-tab-rapport__section {
  display: block;
}

.v-report-tab-rapport__section--full {
  width: 100%;
}
</style>
