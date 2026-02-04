<template>
    <app-project-list
        api-endpoint="medias"
        :filter-map="tagMap"
        filter-description="Filtré par type"
        empty-message="Il n'y a pas encore de média pour"
    />
</template>

<script setup lang="ts">
import AppProjectList from "~/components/AppProjectList.vue";

const tagMap = {
    "podcast": "Podcast",
    "video": "Vidéo",
}
</script>
