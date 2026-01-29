<template>
    <app-item-card
        card-type="podcast"
        :img-src="imgSrc"
        :object-position="objectPosition"
        :date-label="dateLabel"
        :title="title"
        :subtitle="subtitle"
        :href="`/project/${slug}`"
        action-label="écouter"
        @click="handleClick"
    >
        <template #overlay>
            <div class="v-app-podcast-item__mic-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6s6-2.69 6-6h2c0 4.08-3.06 7.44-7 7.93V20h4v2H8v-2h4v-4.07z"/>
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
.v-app-podcast-item__mic-button {
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
