<template>
    <app-project-list
        api-endpoint="boite-a-outils"
        :filter-map="{}"
        filter-description=""
        empty-message="Il n'y a pas encore d'outil pour"
    />
</template>

<script setup lang="ts">
import AppProjectList from "~/components/AppProjectList.vue";
</script>
