<template>
    <app-project-list
        api-endpoint="projects"
        page-type="project"
        :filter-map="{}"
        filter-description=""
        empty-message="Il n'y a pas encore de projet pour"
    />
</template>

<script setup lang="ts">
import AppProjectList from "~/components/AppProjectList.vue";
</script>
