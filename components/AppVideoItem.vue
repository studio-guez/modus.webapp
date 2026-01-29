<template>
    <app-item-card
        card-type="video"
        :img-src="imgSrc"
        :object-position="objectPosition"
        :date-label="dateLabel"
        :title="title"
        :subtitle="subtitle"
        :href="`/project/${slug}`"
        action-label="regarder"
        @click="handleClick"
    >
        <template #overlay>
            <div class="v-app-video-item__play-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                    <path d="M8 5v14l11-7z"/>
                </svg>
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
    slug?: string
}>()

function handleClick() {
    useRouter().push(`/project/${props.slug}`)
}
</script>


<style lang="scss" scoped>
.v-app-video-item__play-button {
    width: 4rem;
    height: 4rem;
    background: var(--app-color-yellow);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--app-color-main--dark);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
