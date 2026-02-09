<template>
  <Transition name="drawer">
    <div class="v-app-nav-menu" v-if="showMenu().value">
      <!-- Top Menu -->
      <div class="v-app-nav-menu__section v-app-nav-menu__section--top" v-if="useMenus().value?.topMenu?.length">
        <template v-for="item of useMenus().value?.topMenu" :key="item.url">
          <a v-if="item.openInNewTab" class="v-app-nav-menu__item" :href="item.url" target="_blank" rel="noopener noreferrer">
            <img v-if="item.svgUrl" class="v-app-nav-menu__icon" :src="item.svgUrl" :alt="item.title">
            <span v-else>{{ item.title }}</span>
          </a>
          <nuxt-link v-else class="v-app-nav-menu__item" :href="item.url">
            <img v-if="item.svgUrl" class="v-app-nav-menu__icon" :src="item.svgUrl" :alt="item.title">
            <span v-else>{{ item.title }}</span>
          </nuxt-link>
        </template>
      </div>

      <!-- Main Menu (with 2 levels) -->
      <div class="v-app-nav-menu__section v-app-nav-menu__section--main">
        <template v-for="item of useMenus().value?.mainMenu" :key="item.url">
          <div class="v-app-nav-menu__group">
            <a v-if="item.openInNewTab" class="v-app-nav-menu__item" :href="item.url" target="_blank" rel="noopener noreferrer">
              <img v-if="item.svgUrl" class="v-app-nav-menu__icon" :src="item.svgUrl" :alt="item.title">
              <span v-else>{{ item.title }}</span>
            </a>
            <nuxt-link v-else class="v-app-nav-menu__item" :href="item.url">
              <img v-if="item.svgUrl" class="v-app-nav-menu__icon" :src="item.svgUrl" :alt="item.title">
              <span v-else>{{ item.title }}</span>
            </nuxt-link>
            <!-- Children (2nd level) -->
            <div v-if="item.children?.length" class="v-app-nav-menu__children">
              <template v-for="child of item.children" :key="child.url">
                <a v-if="child.openInNewTab" class="v-app-nav-menu__item v-app-nav-menu__item--child" :href="child.url" target="_blank" rel="noopener noreferrer">
                  <img v-if="child.svgUrl" class="v-app-nav-menu__icon" :src="child.svgUrl" :alt="child.title">
                  <span v-else>{{ child.title }}</span>
                </a>
                <nuxt-link v-else class="v-app-nav-menu__item v-app-nav-menu__item--child" :href="child.url">
                  <img v-if="child.svgUrl" class="v-app-nav-menu__icon" :src="child.svgUrl" :alt="child.title">
                  <span v-else>{{ child.title }}</span>
                </nuxt-link>
              </template>
            </div>
          </div>
        </template>
      </div>

      <!-- Bottom Menu -->
      <div class="v-app-nav-menu__section v-app-nav-menu__section--bottom" v-if="useMenus().value?.bottomMenu?.length">
        <template v-for="item of useMenus().value?.bottomMenu" :key="item.url">
          <a v-if="item.openInNewTab" class="v-app-nav-menu__item" :href="item.url" target="_blank" rel="noopener noreferrer">
            <img v-if="item.svgUrl" class="v-app-nav-menu__icon" :src="item.svgUrl" :alt="item.title">
            <span v-else>{{ item.title }}</span>
          </a>
          <nuxt-link v-else class="v-app-nav-menu__item" :href="item.url">
            <img v-if="item.svgUrl" class="v-app-nav-menu__icon" :src="item.svgUrl" :alt="item.title">
            <span v-else>{{ item.title }}</span>
          </nuxt-link>
        </template>
      </div>

      <!-- Footer Menu -->
      <div class="v-app-nav-menu__section v-app-nav-menu__section--footer">
        <template v-for="item of useMenus().value?.footerMenu" :key="item.url">
          <a v-if="item.openInNewTab" class="v-app-nav-menu__item" :href="item.url" target="_blank" rel="noopener noreferrer">
            <img v-if="item.svgUrl" class="v-app-nav-menu__icon" :src="item.svgUrl" :alt="item.title">
            <span v-else>{{ item.title }}</span>
          </a>
          <nuxt-link v-else class="v-app-nav-menu__item" :href="item.url">
            <img v-if="item.svgUrl" class="v-app-nav-menu__icon" :src="item.svgUrl" :alt="item.title">
            <span v-else>{{ item.title }}</span>
          </nuxt-link>
        </template>
        <!-- Social icons -->
        <div class="v-app-nav-menu__social">
          <a href="https://ch.linkedin.com/company/fondation-modus" target="_blank">
            <span class="v-app-nav-menu__icon-social">
              <SvgLinkedin />
            </span>
          </a>
          <a href="https://www.youtube.com/@modus-ge" target="_blank">
            <span class="v-app-nav-menu__icon-social">
              <SvgYoutube />
            </span>
          </a>
          <a href="https://www.instagram.com/fondation_modus/" target="_blank">
            <span class="v-app-nav-menu__icon-social">
              <SvgInstagram />
            </span>
          </a>
          <a href="https://open.spotify.com/show/1nWW7TtBUhy9z7uf1pncIE?si=f3b45773979b4b76" target="_blank">
            <span class="v-app-nav-menu__icon-social">
              <SvgSpotify />
            </span>
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { showMenu, useMenus } from "~/composable/main";
</script>

<style lang="scss" scoped>
.v-app-nav-menu {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 50%;
  background: var(--app-color-grey);
  box-sizing: border-box;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
  pointer-events: all;
  border-radius: 2rem 0 0 2rem;

  @media (max-width: 900px) {
    width: 100%;
    border-radius: 0;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &--top {
      padding: 0.72222222222rem 2rem;
    }

    &--main {
      flex: 1;
    }
  }

  &__group {
    display: flex;
    flex-direction: column;
  }

  &__children {
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    height: 2rem;
    width: auto;

    :deep(svg) {
      height: 100%;
      width: auto;
      fill: currentColor;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    text-decoration: none;
    box-sizing: border-box;
    border-radius: 5em;
    font-size: 2rem;
    line-height: 1em;
    font-weight: 700;

    &:hover {
      color: var(--app-color-main);
    }

    @media (max-width: 900px) {
      font-size: 1.5rem;
    }

    &--child {
      font-size: 1.5rem;
      font-weight: 400;
      padding: 0.5rem var(--app-gutter);

      @media (max-width: 900px) {
        font-size: 1.25rem;
      }
    }
  }

  &__social {
    display: flex;
    align-items: stretch;
    pointer-events: all;
    gap: 0;
    margin-right: 2rem;

    & a {
      display: flex;
      align-items: center;
      padding: 0 0.125rem;
      height: auto;
      background-color: transparent;
      border-radius: 0;
    }
  }

  &__icon-social {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 1.675rem;
    width: 1.675rem;
    background-color: var(--app-color-main--dark);
    border-radius: 200px;
  }
}

// Drawer transition
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s ease-in-out;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}
</style>
