<template>
    <app-item-card
        :card-type="'default'"
        :is-modus="isModusProject"
        :img-src="img_src"
        :object-position="object_position"
        :date-label="formatDateRange(date_start, date_end)"
        :title="title"
        :subtitle="content"
        :preview="preview"
        :status="status"
        :status-color="statusColor"
        :href="isReport ? `/report/${slug}` : `/project/${slug}`"
        action-label="Découvrir"
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
    isModusProject?: boolean,
}>()

const status: ComputedRef<null | 'En cours' | 'Terminé'> = computed(() => {
    if (props.is_project_with_duration === 'false') return null
    if (props.date_end === undefined) return 'En cours'
    return new Date(props.date_end).getTime() < new Date().getTime() ? 'Terminé' : 'En cours'
})

const statusColor: ComputedRef<string> = computed(() => {
    return status.value === 'En cours' ? 'var(--app-color-orange)' : 'var(--app-color-main--dark)'
})

function handleClick() {
    const basePath = props.isReport ? '/report' : '/project'
    useRouter().push(`${basePath}/${props.slug}`)
}
</script>
