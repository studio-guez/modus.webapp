<template>
    <app-item-card
        card-type="report"
        :img-src="imgSrc"
        :object-position="objectPosition"
        :date-label="dateLabel"
        :title="title"
        :subtitle="subtitle"
        :preview="preview"
        :href="`/report/${slug}`"
        action-label="consulter"
        @click="handleClick"
    >
        <template #overlay>
            <div class="v-app-report-item__pdf-icon">
                <span class="v-app-report-item__pdf-icon__text">PDF</span>
            </div>
        </template>
        <template #bottom-left>
            <div class="v-app-report-item__tags" v-if="tags && tags.length > 0">
                <span class="v-app-report-item__tag" v-for="tag in displayTags" :key="tag">
                    {{ tag }}
                </span>
            </div>
        </template>
    </app-item-card>
</template>


<script setup lang="ts">
import AppItemCard from "~/components/AppItemCard.vue";

const props = defineProps<{
    imgSrc?: string
    objectPosition?: string
    dateLabel?: string
    title?: string
    subtitle?: string
    preview?: string
    slug?: string
    tags?: string[]
}>()

const displayTags = computed(() => {
    if (!props.tags) return []
    return props.tags.slice(0, 3)
})

function handleClick() {
    useRouter().push(`/report/${props.slug}`)
}
</script>


<style lang="scss" scoped>
.v-app-report-item__pdf-icon {
    background: white;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.v-app-report-item__pdf-icon__text {
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--app-color-main--dark);
}

.v-app-report-item__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.v-app-report-item__tag {
    background: var(--app-color-main);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
}
</style>
