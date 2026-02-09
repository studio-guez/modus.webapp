<template>
    <header class="v-app-header-list">
        <h1 class="v-app-header-list__title"
            v-if="text"
            v-html="formattedText"
        >
        </h1>
        <img
            class="v-app-header-list__featured-image"
            alt="image graphique de ville pour habiller le header du site"
            :src="bgImage ? bgImage : '/header--default.jpg'"
            :style="{
                objectPosition: props.bg_focus,
            }"
        />
    </header>
</template>

<script lang="ts" setup>
import { markModus } from '~/utils/markModus'

const props = defineProps<{
    bgImage?: string,
    bg_focus?: string,
    text?: string,
}>()

const formattedText = computed(() => {
    if (!props.text) return ''
    return markModus(props.text)
})
</script>

<style lang="scss" scoped >
.v-app-header-list {
    background: white;
    width: 100%;
    padding: 6rem 8rem 6rem 8rem;
    position: relative;
    min-height: 23rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}
.v-app-header-list__featured-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
}
.v-app-header-list__title {
    z-index: 1;
    color: var(--app-color-white);
    font-size: var(--app-header-title-size);
    text-align: center;
    text-wrap: balance;
    margin: 0;
    text-shadow: 0 4px 64.4px rgba(0, 0, 0, 0.30);

    &:deep(mark) {
        background: transparent;
        color: var(--app-color-main);
        padding: 0;
    }
}
</style>
