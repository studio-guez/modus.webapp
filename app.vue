<template>
  <Transition name="drawer">
    <div class="v-app__menu"
          v-if="showMenu().value"
    >
    <!-- Top Menu -->
    <div class="v-app__menu__section v-app__menu__section--top" v-if="useMenus().value?.topMenu?.length">
      <template v-for="item of useMenus().value?.topMenu" :key="item.url">
        <a v-if="item.openInNewTab" class="v-app__menu__item" :href="item.url" target="_blank" rel="noopener noreferrer">
          <img v-if="item.svgUrl" class="v-app__menu__icon" :src="item.svgUrl" :alt="item.title">
          <span v-else>{{ item.title }}</span>
        </a>
        <nuxt-link v-else class="v-app__menu__item" :href="item.url">
          <img v-if="item.svgUrl" class="v-app__menu__icon" :src="item.svgUrl" :alt="item.title">
          <span v-else>{{ item.title }}</span>
        </nuxt-link>
      </template>
    </div>

    <!-- Main Menu (with 2 levels) -->
    <div class="v-app__menu__section v-app__menu__section--main">
      <template v-for="item of useMenus().value?.mainMenu" :key="item.url">
        <div class="v-app__menu__group">
          <a v-if="item.openInNewTab" class="v-app__menu__item" :href="item.url" target="_blank" rel="noopener noreferrer">
            <img v-if="item.svgUrl" class="v-app__menu__icon" :src="item.svgUrl" :alt="item.title">
            <span v-else>{{ item.title }}</span>
          </a>
          <nuxt-link v-else class="v-app__menu__item" :href="item.url">
            <img v-if="item.svgUrl" class="v-app__menu__icon" :src="item.svgUrl" :alt="item.title">
            <span v-else>{{ item.title }}</span>
          </nuxt-link>
          <!-- Children (2nd level) -->
          <div v-if="item.children?.length" class="v-app__menu__children">
            <template v-for="child of item.children" :key="child.url">
              <a v-if="child.openInNewTab" class="v-app__menu__item v-app__menu__item--child" :href="child.url" target="_blank" rel="noopener noreferrer">
                <img v-if="child.svgUrl" class="v-app__menu__icon" :src="child.svgUrl" :alt="child.title">
                <span v-else>{{ child.title }}</span>
              </a>
              <nuxt-link v-else class="v-app__menu__item v-app__menu__item--child" :href="child.url">
                <img v-if="child.svgUrl" class="v-app__menu__icon" :src="child.svgUrl" :alt="child.title">
                <span v-else>{{ child.title }}</span>
              </nuxt-link>
            </template>
          </div>
        </div>
      </template>
    </div>

    <!-- Bottom Menu -->
    <div class="v-app__menu__section v-app__menu__section--bottom" v-if="useMenus().value?.bottomMenu?.length">
      <template v-for="item of useMenus().value?.bottomMenu" :key="item.url">
        <a v-if="item.openInNewTab" class="v-app__menu__item" :href="item.url" target="_blank" rel="noopener noreferrer">
          <img v-if="item.svgUrl" class="v-app__menu__icon" :src="item.svgUrl" :alt="item.title">
          <span v-else>{{ item.title }}</span>
        </a>
        <nuxt-link v-else class="v-app__menu__item" :href="item.url">
          <img v-if="item.svgUrl" class="v-app__menu__icon" :src="item.svgUrl" :alt="item.title">
          <span v-else>{{ item.title }}</span>
        </nuxt-link>
      </template>
    </div>

    <!-- Footer Menu -->
    <div class="v-app__menu__section v-app__menu__section--footer">
      <template v-for="item of useMenus().value?.footerMenu" :key="item.url">
        <a v-if="item.openInNewTab" class="v-app__menu__item" :href="item.url" target="_blank" rel="noopener noreferrer">
          <img v-if="item.svgUrl" class="v-app__menu__icon" :src="item.svgUrl" :alt="item.title">
          <span v-else>{{ item.title }}</span>
        </a>
        <nuxt-link v-else class="v-app__menu__item" :href="item.url">
          <img v-if="item.svgUrl" class="v-app__menu__icon" :src="item.svgUrl" :alt="item.title">
          <span v-else>{{ item.title }}</span>
        </nuxt-link>
      </template>
      <!-- Social icons -->
      <div class="app__icon">
        <a href="https://ch.linkedin.com/company/fondation-modus" target="_blank">
            <SvgLinkedin />
        </a>
        <a href="https://www.youtube.com/@modus-ge" target="_blank">
            <SvgYoutube />
        </a>
        <a href="https://www.instagram.com/fondation_modus/" target="_blank">
            <SvgInstagram />
        </a>
        <a href="https://open.spotify.com/show/1nWW7TtBUhy9z7uf1pncIE?si=f3b45773979b4b76" target="_blank">
            <SvgSpotify />
        </a>
      </div>
    </div>
  </div>
  </Transition>

  <Transition name="fade">
    <div class="v-app__cache"
          v-if="showMenu().value"
          @click="showMenu().value = false"
    />
  </Transition>

  <app-nav/>

  <div class="v-app__content" >
      <nuxt-page/>
  </div>

  <div class="v-app__cookie" v-if="!cookieIsValidate().value && showCookieBanner().value">
      <app-cookie/>
  </div>

  <app-podcast-player/>
  <app-youtube-player/>
</template>





<script lang="ts" setup>

import {
    bodyScrollInfo,
    cookieIsValidate,
    showCookieBanner,
    showMenu,
    useMenus,
    useStateNavBarreMsgMessage
} from "~/composable/main";
import AppCookie from "~/components/AppCookie.vue";
import {ApiFetchMenus} from "~/composable/adminApi/apiFetch";
import {getCookieBannerValue, setCookieBannerValue} from "~/utils/cookieBannerLocalStorage";
import {matomo, updateMatomoWithNavigation} from "~/utils/matomo";

if (import.meta.client) {
    matomo()
    useRouter().afterEach((to, from) => {
        updateMatomoWithNavigation(from.fullPath)
    })
}

onMounted(async () => {
    window.addEventListener('scroll', () => {
        bodyScrollInfo().value = {top: window.scrollY }
    })

    useMenus().value = await ApiFetchMenus()

    if(useRouter().currentRoute.value.path === '/declic-mobilite') useRouter().push('/forms/declic-mobilite')
})

useRouter().beforeEach((to, from, next) => {
    showMenu().value = false
    useStateNavBarreMsgMessage().value = null
    next()
})

watch(cookieIsValidate, (value, oldValue, onCleanup) => {
    setCookieBannerValue(value.value)
})

onBeforeMount(() => {
    if( getCookieBannerValue() === true ) cookieIsValidate().value = true
})

</script>





<style lang="scss" scoped >
.v-app__cache {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  background-color: rgba(0, 0, 0, .5);
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.v-app__menu {
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
  padding: var(--app-gutter);
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;

  @media (max-width: 900px) {
    padding: var(--app-nav__height) 0 0 0;
    width: 100%;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
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

  .v-app__menu__item {
    display: block;
    text-decoration: none;
    padding: var(--app-gutter);
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
}

.v-app__cookie {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100;
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

// Fade transition for backdrop
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>

<style lang="scss">
.page-enter-active, .page-leave-active {
    position: relative;
    transition: all .5s ease-in-out;
}

.page-enter-from {
    transform: translate3d(5vw, 0, 0);
    opacity: 0;
}

.page-enter-to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
}

.page-leave-from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
}

.page-leave-to {
    transform: translate3d(0, -1vh, 0);
    opacity: 0;
}
</style>
