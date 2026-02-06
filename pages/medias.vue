<template>
    <app-project-list
        api-endpoint="medias"
        page-type="media"
        :filter-map="tagMap"
        filter-description="Filtré par type"
        empty-message="Il n'y a pas encore de média pour"
        @play-video="handlePlayVideo"
        @play-podcast="handlePlayPodcast"
    />
</template>

<script setup lang="ts">
import AppProjectList from "~/components/AppProjectList.vue";

const tagMap = {
    "podcast": "Podcast",
    "video": "Vidéo",
}

function handlePlayVideo(mediaUrl: string) {
    // TODO: Implement global video player
    console.log('Play video:', mediaUrl)
}

function handlePlayPodcast(mediaUrl: string) {
    // TODO: Implement global podcast player
    console.log('Play podcast:', mediaUrl)
}
</script>
