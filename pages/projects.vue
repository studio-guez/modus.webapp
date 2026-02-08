<template>
    <app-project-list
        api-endpoint="projects"
        page-type="project"
        :filter-groups="filterGroups"
        empty-message="Aucun projet ne correspond à votre recherche."
    />
</template>

<script setup lang="ts">
import AppProjectList, { FilterGroup, FilterOption } from "~/components/AppProjectList.vue";
import { IApiSingleProject } from "~/composable/adminApi/apiDefinitions";

const typeFilterOptions: FilterOption[] = [
    { key: 'project-modus', label: 'Modus', bgColor: 'var(--app-color-main--dark)', textColor: 'var(--app-color-white)', borderColor: 'var(--app-color-main--dark)' },
    { key: 'project-supported', label: 'Soutenu', bgColor: 'var(--app-color-main)', textColor: 'var(--app-color-white)', borderColor: 'var(--app-color-main)' },
]

const statusFilterOptions: FilterOption[] = [
    { key: 'en-cours', label: 'En cours', bgColor: 'transparent', textColor: 'var(--app-color-black)', borderColor: 'var(--app-color-black)' },
    { key: 'termine', label: 'Terminé', bgColor: 'transparent', textColor: 'var(--app-color-black)', borderColor: 'var(--app-color-black)' },
]

const filterGroups: FilterGroup[] = [
    {
        id: 'type',
        type: 'single',
        queryParam: 'typeFilter',
        options: typeFilterOptions,
        filterFn: (item: IApiSingleProject, selectedKeys: string[]) => {
            const content = item.content as Record<string, unknown>
            const projectType = content.projecttype as string | undefined
            const itemType = projectType === 'modus' ? 'project-modus' : 'project-supported'
            return selectedKeys.includes(itemType)
        }
    },
    {
        id: 'status',
        type: 'single',
        queryParam: 'status',
        options: statusFilterOptions,
        filterFn: (item: IApiSingleProject, selectedKeys: string[]) => {
            const content = item.content as Record<string, unknown>
            const isProjectWithDuration = content.isprojectwithduration === 'true'
            const dateEnd = content.dateend as string | undefined
            const isOngoing = isProjectWithDuration && dateEnd && new Date(dateEnd) > new Date()
            const computedStatus = isOngoing ? 'en-cours' : 'termine'
            return selectedKeys.includes(computedStatus)
        }
    }
]
</script>
