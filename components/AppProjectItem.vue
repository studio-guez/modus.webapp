<template>
    <app-item-card
        :card-type="'default'"
        :project-type="projectType"
        :img-src="img_src"
        :object-position="object_position"
        :date-label="formatDateRange(date_start, date_end)"
        :title="title"
        :subtitle="content"
        :preview="preview"
        :status="status"
        :status-color="statusColor"
        :href="cardHref"
        :action-label="isExternalLink ? 'Ouvrir ↗' : 'Découvrir'"
        :is-external-link="isExternalLink"
        @click="handleClick"
    />
</template>


<script setup lang="ts">
import {ComputedRef} from 'vue'
import {formatDateRange} from "~/utils/formatDateRange";
import AppItemCard from "~/components/AppItemCard.vue";

const props = defineProps<{
    title?: string
    content?: string
    preview?: string
    img_src?: string
    object_position?: string
    slug?: string
    date_start: string,
    is_project_with_duration?: "true" | "false",
    date_end?: string,
    isReport?: boolean,
    projectType?: string,
    isExternalLink?: boolean,
    externalUrl?: string,
}>()

const status: ComputedRef<null | 'En cours' | 'Terminé'> = computed(() => {
    if (props.is_project_with_duration === 'false') return null
    if (props.date_end === undefined) return 'En cours'
    return new Date(props.date_end).getTime() < new Date().getTime() ? 'Terminé' : 'En cours'
})

const statusColor: ComputedRef<string> = computed(() => {
    return status.value === 'En cours' ? 'var(--app-color-orange)' : 'var(--app-color-main--dark)'
})

const cardHref = computed(() => {
    if (props.isExternalLink && props.externalUrl) {
        return props.externalUrl
    }
    return props.isReport ? `/rapport/${props.slug}` : `/project/${props.slug}`
})

function handleClick() {
    if (props.isExternalLink && props.externalUrl) {
        window.open(props.externalUrl, '_blank')
        return
    }
    const basePath = props.isReport ? '/rapport' : '/project'
    useRouter().push(`${basePath}/${props.slug}`)
}
</script>
