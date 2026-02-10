<template>
  <article class="v-report-tab-rapport">
    <h1 class="v-report-tab-rapport__title">{{ title }}</h1>
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
      </template>
    </template>
  </article>
</template>

<script setup lang="ts">
import AppReportHeading from '~/components/AppReportHeading.vue'
import AppReportText from '~/components/AppReportText.vue'
import AppReportImage from '~/components/AppReportImage.vue'

defineProps<{
  title: string
  bodyContent: any[]
}>()
</script>

<style lang="scss" scoped>
*{
  box-sizing: border-box;
}

.v-report-tab-rapport {
  background: var(--app-color-white);
  padding: var(--app-report-tab-padding-y) 0;
  min-height: var(--app-report-tab-min-height);
}

.v-report-tab-rapport__title {
  font-size: 3.55555555556rem;
  font-weight: 600;
  color: var(--app-color-main);
  margin: 0 0 1rem 0;
  padding: 0 var(--app-base-padding-x);
  text-wrap: balance;
  line-height: 1.14;
}

.v-report-tab-rapport__section {
  display: block;
}

.v-report-tab-rapport__section--full {
  width: 100%;
}
</style>
