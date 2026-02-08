<template>
    <section
        class="v-app"
        :class="{
            'is-intersected': isIntersected,
        }"
    >
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
                  <svg id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                      <g id="Calque_1-2" data-name="Calque 1">
                          <path d="M52,52h-10.684375762939453v-18.197883605957031c0-4.989360809326172-1.895832061767578-7.777584075927734-5.844921112060547-7.777584075927734-4.296092987060547,0-6.540626525878906,2.901576995849609-6.540626525878906,7.777584075927734v18.197883605957031h-10.296743392944336V17.333333969116211h10.296743392944336v4.669595718383789s3.095966339111328-5.728713989257812,10.452476501464844-5.728713989257812c7.353122711181641,0,12.617446899414062,4.490255355834961,12.617446899414062,13.776996612548828v21.948787689208984ZM6.349348068237305,12.794013977050781c-3.507290840148926,0-6.349348068237305-2.864356994628906-6.349348068237305-6.397006988525391S2.842057228088379,0,6.349348068237305,0c3.507291793823242,0,6.34765625,2.864356994628906,6.34765625,6.397006988525391s-2.840364456176758,6.397006988525391-6.34765625,6.397006988525391ZM1.032551765441895,52h10.736849784851074V17.333333969116211H1.032551765441895v34.666666030883789Z" style="fill: white; fill-rule: evenodd;"/>
                      </g>
                  </svg>
              </a>
              <a href="https://www.youtube.com/@modus-ge" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/fondation_modus/" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                </svg>
              </a>
                <a href="https://open.spotify.com/show/1nWW7TtBUhy9z7uf1pncIE?si=f3b45773979b4b76" target="_blank">
                    <svg id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496">
                        <g id="Calque_1-2" data-name="Calque 1">
                            <g>
                                <path d="M248,0C111.099998474121094,0,0,111.099998474121094,0,248c0,136.899993896484375,111.099998474121094,248,248,248,136.899993896484375,0,248-111.100006103515625,248-248S384.899993896484375,0,248,0Z" style="fill: #1ed760; opacity: 0;"/>
                                <path d="M445.813049343621969,216.952193245861054c-6.529271149520355,0-10.547251741123546-1.632317787380089-16.197569279436721-4.896934202806733-89.400595044826332-53.364110084097774-249.241784745723635-66.171492672412569-352.705369339154458-37.292091921019164-4.520252114720279,1.255626119625958-10.170569653037091,3.264635574760177-16.197578859106216,3.264635574760177-16.574260947194489,0-29.256082839481678-12.932952864011895-29.256082839481678-29.632784086902575,0-17.076522890643901,10.547261320789403-26.744840179896528,21.847896397423028-30.009456595322263,44.198045158626883-12.932952864012805,93.669706608150591-19.085513186445496,147.536078635697777-19.085513186445496,91.660706732683138,0,187.716104884056222,19.085513186445496,257.905597307405515,60.018932349979877,9.793868405613466,5.650317538315903,16.19756927943854,13.435195648129593,16.19756927943854,28.377157967276617,0,17.07652289064481-13.811887315883723,29.256092419147535-29.130541302785787,29.256092419147535v-.000038318667976ZM406.888639635224536,312.630880570146473c-6.529271149523993,0-10.923962568213028-2.887924747670695-15.444185943932098-5.273645029896215-78.476632476609666-46.458166426155003-195.500982993869911-65.166987944845459-299.592399806448157-36.915400253265034-6.027009206070943,1.632298628046556-9.291635201165263,3.264635574760177-14.941952739481167,3.264635574760177-13.435195648129593,0-24.359148636673126-10.923962568211209-24.359148636673126-24.35913905700545,0-13.43517648879606,6.529251990185912-22.350148761206583,19.462204854198717-25.991456844387358,34.906409957463438-9.793887564948818,70.566184091103423-17.07652289064481,122.800238331270521-17.07652289064481,81.49012749998019,0,160.217900527985876,20.215588189708797,222.245823173766439,57.130969283639388,10.17057923270113,6.02699004673741,14.188559824304321,13.811887315883723,14.188559824304321,24.735849884094932-.1255702756971,13.560746764491341-10.672822016820646,24.484709332704369-24.35913905700545,24.484709332704369ZM373.112304681024398,394.999961681331115c-5.273645029898034,0-8.538242285991146-1.632298628042918-13.435214807464945-4.520261694384317-78.351062200916203-47.211549761665083-169.509526149482554-49.220559216799302-259.537915094786513-30.762839930834161-4.8969437824735,1.255626119627777-11.300635076631806,3.264635574761996-14.941952739480257,3.264635574761996-12.179569528502725,0-19.838896521953757-9.66833644858707-19.838896521953757-19.838877362621133,0-12.932933704678362,7.659317413784265-19.085532345779939,17.076513310977134-21.094503482245273,102.835790692953196-22.726840428960713,207.931673914432395-20.717830973826494,297.583409510647471,32.897419661663662,7.659326993452851,4.896934202804914,12.179588687837168,9.291625621495768,12.179588687837168,20.717830973824675s-8.914953113075171,19.336634578503435-19.085532345776301,19.336634578503435v-.000038318668885Z"/>
                            </g>
                        </g>
                    </svg>
                </a>
            </div>
          </div>
        </div>

        <div class="v-app__cache"
             v-if="showMenu().value"
             @click="showMenu().value = false"
        />


        <div class="v-app__nav" >
            <app-nav/>
        </div>

        <div class="v-app__content" >
            <nuxt-page/>
        </div>

        <div class="v-app__cookie" v-if="!cookieIsValidate().value && showCookieBanner().value">
            <app-cookie/>
        </div>

        <app-podcast-player/>
        <app-youtube-player/>
    </section>
</template>





<script lang="ts" setup>

import {
    bodyScrollInfo,
    cookieIsValidate,
    showCookieBanner,
    showMenu,
    siteInfo,
    useIsIntersected,
    useMenus,
    useStateNavBarreMsgMessage
} from "~/composable/main";
import AppCookie from "~/components/AppCookie.vue";
import {ApiFetchMenus, ApiFetchPagesInfo} from "~/composable/adminApi/apiFetch";
import {getCookieBannerValue, setCookieBannerValue} from "~/utils/cookieBannerLocalStorage";
import {matomo, updateMatomoWithNavigation} from "~/utils/matomo";

const isIntersected = useIsIntersected()

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

    // Fetch site info and menus in parallel
    const [siteInfoData, menusData] = await Promise.all([
        ApiFetchPagesInfo(),
        ApiFetchMenus()
    ])
    siteInfo().value = siteInfoData
    useMenus().value = menusData

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


.v-app__nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  pointer-events: none;
}

.v-app__cookie {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100;
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
