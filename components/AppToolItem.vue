<template>
    <app-item-card
        card-type="tool"
        :img-src="imgSrc"
        :object-position="objectPosition"
        :title="title"
        :subtitle="subtitle"
        :preview="preview"
        :href="href"
        :action-label="actionLabel"
        @click="handleClick"
    >
        <template #overlay v-if="toolIcon">
            <div class="v-app-tool-item__icon">
                <img :src="toolIcon" :alt="title" />
            </div>
        </template>
    </app-item-card>
</template>


<script setup lang="ts">
import AppItemCard from "~/components/AppItemCard.vue";

const props = withDefaults(defineProps<{
    imgSrc?: string
    objectPosition?: string
    title?: string
    subtitle?: string
    preview?: string
    href?: string
    actionLabel?: string
    toolIcon?: string
}>(), {
    actionLabel: 'Accéder'
})

function handleClick() {
    if (props.href) {
        if (props.href.startsWith('http')) {
            window.open(props.href, '_blank')
        } else {
            useRouter().push(props.href)
        }
    }
}
</script>


<style lang="scss" scoped>
.v-app-tool-item__icon {
    width: 4rem;
    height: 4rem;
    background: white;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    img {
        max-width: 2.5rem;
        max-height: 2.5rem;
    }
}
</style>
