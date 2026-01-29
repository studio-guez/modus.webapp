<template>
    <section class="v-app-item-card"
             :class="[
                 cardTypeClass,
                 { 'v-app-item-card--modus': projectType === 'modus' }
             ]"
             @click="$emit('click')"
    >
        <div class="v-app-item-card__header">
            <img class="v-app-item-card__header__img"
                 alt="cover"
                 :src="imgSrc"
                 :style="{ objectPosition: objectPosition }"
            />
            <div class="v-app-item-card__header__date" v-if="dateLabel">
                {{ dateLabel }}
            </div>
            <div class="v-app-item-card__header__overlay" v-if="$slots.overlay">
                <slot name="overlay" />
            </div>
        </div>

        <div class="v-app-item-card__body child-remove-margin">
            <h4 class="v-app-item-card__title">{{ title }}</h4>
            <div class="v-app-item-card__subtitle child-remove-margin"
                 v-if="subtitle"
                 v-html="subtitle"
            />
            <div class="v-app-item-card__preview"
                 v-if="preview"
                 v-html="preview"
            />
            <slot name="body" />
        </div>

        <div class="v-app-item-card__bottom">
            <div class="v-app-item-card__bottom__left">
                <slot name="bottom-left">
                    <div class="v-app-item-card__category-box"
                         v-if="categoryLabel"
                         @click.stop="$emit('category-click')"
                    >
                        <img class="v-app-item-card__category-box__icon"
                             v-if="categoryIcon"
                             alt="category icon"
                             :src="categoryIcon"
                        />
                        <span class="v-app-item-card__category-box__label">{{ categoryLabel }}</span>
                    </div>
                </slot>
            </div>
            <div class="v-app-item-card__bottom__right">
                <slot name="bottom-right">
                    <div class="v-app-item-card__status"
                         v-if="status"
                         :style="{ backgroundColor: statusColor, borderColor: statusColor }"
                    >{{ status }}</div>
                    <nuxt-link class="app-button app-button--small"
                               :href="href"
                    >{{ actionLabel }}</nuxt-link>
                </slot>
            </div>
        </div>
    </section>
</template>


<script setup lang="ts">
defineEmits<{
    (e: 'click'): void
    (e: 'category-click'): void
}>()

const props = withDefaults(defineProps<{
    cardType?: 'default' | 'video' | 'podcast' | 'report' | 'tool'
    projectType?: string
    imgSrc?: string
    objectPosition?: string
    dateLabel?: string
    title?: string
    subtitle?: string
    preview?: string
    categoryIcon?: string
    categoryLabel?: string
    status?: string
    statusColor?: string
    href?: string
    actionLabel?: string
}>(), {
    cardType: 'default',
    actionLabel: 'Découvrir',
})

const cardTypeClass = computed(() => `v-app-item-card--${props.cardType}`)
</script>


<style lang="scss" scoped>
.v-app-item-card {
    background: var(--app-color-green-light);
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 2rem;
    border-radius: 2rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    position: relative;
    overflow: hidden;
    height: 100%;
    cursor: pointer;

    @media (max-width: 900px) {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
    }
}

// Card type modifiers
.v-app-item-card--modus {
    background: var(--app-color-main--dark);

    .v-app-item-card__title,
    .v-app-item-card__subtitle,
    .v-app-item-card__preview {
        color: white;
    }
}

.v-app-item-card--video,
.v-app-item-card--podcast {
    background: var(--app-color-yellow);
}

.v-app-item-card--report,
.v-app-item-card--tool {
    background: var(--app-color-grey);
}

// Header
.v-app-item-card__header {
    box-sizing: border-box;
    top: 0;
    left: 0;
    position: relative;
    width: 100%;
}

.v-app-item-card__header__img {
    display: block;
    width: 100%;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    background-color: #D3DABF;
    object-fit: cover;
    aspect-ratio: 7/5;
}

.v-app-item-card__header__date {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: var(--app-color-main);
    border-radius: 1rem;
    color: white;
    padding: .25rem 1rem;
    font-size: .75rem;
}

.v-app-item-card__header__overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
}

// Body
.v-app-item-card__body {
    box-sizing: border-box;
    padding: 2rem var(--app-gutter);
    width: 100%;

    @media (max-width: 700px) {
        padding-bottom: var(--app-gutter);
    }
}

.v-app-item-card__title {
    margin: 0 0 0.5rem 0;
    color: var(--app-color-main--dark);
}

.v-app-item-card__subtitle {
    color: var(--app-color-main);
    font-weight: 600;
}

.v-app-item-card__preview {
    color: var(--app-color-main--dark);
    font-size: 0.9rem;
    margin-top: 0.5rem;
    line-height: 1.4;
}

// Bottom
.v-app-item-card__bottom {
    padding-left: var(--app-gutter);
    padding-right: var(--app-gutter);
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: auto;

    @media (max-width: 700px) {
        flex-direction: column;
        align-items: flex-end;
        gap: var(--app-gutter);
    }
}

.v-app-item-card__bottom__left,
.v-app-item-card__bottom__right {
    display: flex;
    gap: .5rem;
    flex-direction: column;
    align-items: flex-end;

    @media (max-width: 700px) {
        flex-direction: row;
        align-items: flex-start;
    }
}

.v-app-item-card__bottom__left {
    align-items: flex-start;
}

.v-app-item-card__category-box {
    display: flex;
    gap: var(--app-gutter);
    box-sizing: border-box;
    align-items: center;
    border: solid 2px var(--app-color-main);
    border-radius: var(--app-radius-reg);
    padding: .5rem 1rem;
    user-select: none;
    cursor: pointer;
}

.v-app-item-card__category-box__icon {
    display: block;
    height: 2rem;
}

.v-app-item-card__category-box__label {
    margin: 0;
    font-size: .75rem;
    color: var(--app-color-main);
}

.v-app-item-card__status {
    font-weight: 600;
    font-size: .75rem;
    border: solid 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    border-radius: 2rem;
    padding: .015rem .5rem .025rem;
    min-width: 3rem;
    text-align: center;
    color: white;
}
</style>
