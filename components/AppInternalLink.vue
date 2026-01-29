<template>
    <section
        class="v-app-internal-link"
        :class="{
            'v-app-internal-link--circle': styleDesign === 'circle',
            'v-app-internal-link--full': isFull,
        }"
    >
        <div class="v-app-internal-link__img"
        >
            <img alt="image du project"
                 :src="src"
                 class="v-app-internal-link__img__img"
            />
        </div>

        <div class="v-app-internal-link__content">
            <div>
                <h4 class="v-app-internal-link__content__title"
                >{{ title }}</h4>
                <div class="v-app-internal-link__content__desc child-remove-margin"
                     v-if="description"
                     v-html="description"
                />

            </div>
            <div class="v-app-internal-link__content__button">
                <nuxt-link class="app-button app-button--small" :href="href">En savoir plus +</nuxt-link>
            </div>
        </div>

    </section>
</template>





<script setup lang="ts">
const props = defineProps<{
    src: string
    href: string
    title: string
    description?: string
    styleDesign?: "circle" | 'default',
    isFull?: boolean
}>()
</script>





<style lang="scss" scoped >
.v-app-internal-link {
    display: flex;
    flex-direction: column;
    background: var(--app-color-green-light);
    border-radius: var(--app-radius-small);
    box-sizing: border-box;
    height: 100%;
    flex-wrap: nowrap;
    align-items: flex-start;
    overflow: hidden;

    &.v-app-internal-link--circle {
        border-top-left-radius:     16rem;
        border-top-right-radius:    16rem;

        &.v-app-internal-link--full {
            border-top-left-radius:     15rem;
            border-bottom-left-radius:  15rem;
            border-top-right-radius:    1rem;

            @media (max-width: 900px) {
                border-radius: var(--app-radius-small);
            }
        }

    }

    &.v-app-internal-link--full {
        flex-direction: row;

        @media (max-width: 900px) {
            flex-direction: column;
        }
    }
}

.v-app-internal-link__content {
    box-sizing: border-box;
    padding: 0 1rem 1rem;
    width: 100%;
    height: 100%;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    gap: 1rem;

    .v-app-internal-link--full & {
      justify-content: center;
    }
}

.v-app-internal-link__img__img {
  display: block;
  background: var(--app-color-main);
  width: 100%;
  object-fit: cover;
  border-radius: var(--app-radius-small) var(--app-radius-small) var(--app-radius-large) var(--app-radius-large);
  flex-shrink: 0;
  aspect-ratio: 5/3;

  .v-app-internal-link--circle & {
        border-bottom-left-radius: var(--app-radius-small);
        border-bottom-right-radius: var(--app-radius-small);
  }

  .v-app-internal-link--full & {
    aspect-ratio: 1/1;
  }

  @media (max-width: 900px) {
    aspect-ratio: 1/1;
  }
}

.v-app-internal-link__content__title {
  margin-top: 1em;
  margin-bottom: .25em;
    color: var(--app-color-main--dark);
}

.v-app-internal-link__content__button {
  display: flex;
  justify-content: flex-end;
}

.v-app-internal-link__content__desc {
    font-weight: 600;
}
</style>
<style lang="scss">
.v-app-internal-link__content__desc {
    > * {
        color: var(--app-color-main) !important;
    }
}
</style>
