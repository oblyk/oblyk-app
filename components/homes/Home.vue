<template>
  <div>
    <v-parallax
      id="home-parallax"
      src="/images/oblyk-home-baume-rousse-small.webp"
      srcset="/images/oblyk-home-baume-rousse-small.webp 800w, /images/oblyk-home-baume-rousse.webp 1640w, /images/oblyk-home-baume-rousse.webp 1980w"
      class="text-center home-parallax"
      height="550"
    >
      <h1 class="font-weight-medium oblyk-title">
        Oblyk
      </h1>
      <h2 class="oblyk-subtitle">
        Outdoor & Indoor Climbing Community
      </h2>
    </v-parallax>

    <v-container class="home-container">
      <lazy-hydrate when-visible>
        <home-box-crag-info class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-ascents-log class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-partner class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-help class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-guide-book class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-developer class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <last-article />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-figures />
      </lazy-hydrate>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
const HomeBoxCragInfo = () => import('@/components/homes/HomeBoxCragInfo')
const HomeBoxAscentsLog = () => import('@/components/homes/HomeBoxAscentsLog')
const HomeBoxDeveloper = () => import('@/components/homes/HomeBoxDeveloper')
const AppFooter = () => import('@/components/layouts/AppFooter')
const HomeBoxPartner = () => import('@/components/homes/HomeBoxPartner')
const HomeBoxHelp = () => import('@/components/homes/HomeBoxHelp')
const HomeBoxGuideBook = () => import('@/components/homes/HomeBoxGuideBook')
const HomeBoxFigures = () => import('@/components/homes/HomeBoxFigures')
const LastArticle = () => import('@/components/articles/LastArticle')

export default {
  name: 'Home',
  components: {
    LazyHydrate,
    HomeBoxDeveloper,
    LastArticle,
    HomeBoxFigures,
    HomeBoxGuideBook,
    HomeBoxHelp,
    HomeBoxPartner,
    HomeBoxAscentsLog,
    HomeBoxCragInfo,
    AppFooter
  }
}
</script>

<style lang="scss">
.oblyk-title {
  height: 168px;
  font-size: 7rem;
}
.oblyk-subtitle {
  height: 48px;
  font-size: 2em;
}
.home-container {
  max-width: 1200px;
  h3, h4 {
    height: 48px;
    font-size: 2em;
  }
}
.home-boxes {
  margin-top: 3rem;
  margin-bottom: 7rem;
}
.home-parallax {
  max-height: 100vh !important;
}
</style>
