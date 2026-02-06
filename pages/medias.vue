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
import { useSpotifyUrl, useSpotifyTitle, usePodcastPlayerIsOpen } from '~/composable/main'

const spotifyUrl = useSpotifyUrl()
const spotifyTitle = useSpotifyTitle()
const playerIsOpen = usePodcastPlayerIsOpen()

const tagMap = {
    "podcast": "Podcast",
    "video": "Vidéo",
}

function handlePlayVideo(mediaUrl: string) {
    // TODO: Implement global video player
    console.log('Play video:', mediaUrl)
}

function handlePlayPodcast(mediaUrl: string, title: string) {
    // If same podcast, do nothing
    if (spotifyUrl.value === mediaUrl) {
        return
    }
    // Only start collapsed if player wasn't already open
    const wasAlreadyOpen = !!spotifyUrl.value
    spotifyUrl.value = mediaUrl
    spotifyTitle.value = title
    if (!wasAlreadyOpen) {
        playerIsOpen.value = false
    }
}
</script>
