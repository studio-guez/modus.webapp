<template>
    <section class="v-app-project-theme"
    >

        <div class="v-app-project-theme__header"
        >
            <img class="v-app-project-theme__header__img"
                 alt="project cover"
                 :src="imgSrc"
            />
            <div class="v-app-project-theme__header__bottom__theme-icon">
                <img class="v-app-project-theme__header__bottom__theme-icon__item"
                     alt="project icon"
                     :src="`/project_type_icons/${iconUrl}`"
                />
            </div>
            <div class="v-app-project-theme__header__bottom">
                <h4 class="v-app-project-theme__header__type"
                >{{ projectType }}</h4>
            </div>
        </div>

        <div class="v-app-project-theme__body child-remove-margin"
        >
            <div class="v-app-project-theme__body__header child-remove-margin">
                <img class="v-app-project-theme__theme-icon"
                     alt="project icon"
                     :src="`/project_type_icons/${iconUrl}`"
                />
                <h4 class="v-app-project-theme__title">{{title}}</h4>
            </div>
            <div class="v-app-project-theme__content child-remove-margin"
                 v-html="content"
            />
        </div>
        <div class="v-app-project-theme__bottom">
            <nuxt-link class="app-button app-button--small"
                       :href="`projects?q=${projectType}`"
            >Découvrir les projets</nuxt-link>
        </div>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    projectType?: string
    title?: string
    content?: string
}>()

const imageUrlMap: Record<string, string> = {
    'library':   'img_bibliotheque.svg',
    'imaginary':   'img_imaginaires.svg',
    'laboratory': 'img_laboratoire.svg',
    'planting':  'img_plantation.svg',
    'platform':  'img_plateforme.svg',
}

const imgSrcMap: Record<string, string> = {
    'library': '240603_Modus-bibliothque.jpg',
    'imaginary':  '240603_Modus-fabriquedesimaginaires.jpg',
    'laboratory':  '240603_Modus-laboratoire.jpg',
    'planting':   '240603_Modus-plantation.jpg',
    'platform':   '240603_Modus-plateforme.jpg',
}

const iconUrl   = computed(() => props.projectType ? imageUrlMap[props.projectType] : '' )
const imgSrc    = computed(() => props.projectType ? `/images_dispositifs/${imgSrcMap[props.projectType]}` : '' )

</script>





<style lang="scss" scoped >
.v-app-project-theme {
    background: white;
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 2rem;
    border-radius: 2rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    position: relative;
    overflow: hidden;
    min-height: 100%;

    @media (max-width: 900px) {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
    }
}

.v-app-project-theme__title {
    margin-top: 0;
    color: var(--app-color-main);
}

.v-app-project-theme__content {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.15em;
}

.v-app-project-theme__header {
    box-sizing: border-box;
    width: 50%;
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;

    @media (max-width: 900px) {
        position: relative;
        height: auto;
        width: 100%;
    }
}

.v-app-project-theme__header__bottom__theme-icon {
    display: none;

    @media (max-width: 900px) {
        background: var(--app-color-green-light);
        border-radius: 100%;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -100%);
        padding: 1rem;
        width: 4rem;
        height: 4rem;
    }
}

.v-app-project-theme__header__bottom__theme-icon__item {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: contain;
}

.v-app-project-theme__header__img {
    display: block;
    width: 100%;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    background-color: #D3DABF;
    height: 100%;
    object-fit: cover;

    @media (max-width: 900px) {
        aspect-ratio: 1/1;
    }
}

.v-app-project-theme__header__bottom {
    display: flex;
    position: absolute;
    top: var(--app-gutter);
    left: var(--app-gutter);
    gap: var(--app-gutter);
    box-sizing: border-box;
    padding: var(--app-gutter);
    align-items: center;
    background: var(--app-color-green-light);
    border-radius: 5rem;

    @media (max-width: 900px) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, var(--app-gutter));
    }
}

.v-app-project-theme__header__type {
    margin: 0;
    color: var(--app-color-main);

    @media (max-width: 900px) {
        text-align: center;
    }
}

.v-app-project-theme__theme-icon {
    display: block;
    height: 4rem;

    @media (max-width: 900px) {
        display: none;
    }
}

.v-app-project-theme__body {
    box-sizing: border-box;
    padding: 3rem var(--app-gutter);
    width: 100%;
    padding-left: calc(50% + var(--app-gutter));

    @media (max-width: 900px) {
        padding-left: var(--app-gutter);
    }
}

.v-app-project-theme__body__header {
    display: flex;
    gap: var(--app-gutter);
    align-items: flex-start;
    padding-bottom: 1rem;
}

.v-app-project-theme__bottom {
    padding-left: var(--app-gutter);
    padding-right: var(--app-gutter);
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  align-items: flex-end;
}
</style>
